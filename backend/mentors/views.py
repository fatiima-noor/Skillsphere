from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from bookings.models import BookingRequest
from custom_sessions.models import Session, Feedback
from .models import MentorAvailability
from .serializers import BookingSerializer, SessionSerializer, FeedbackSerializer, MentorAvailabilitySerializer
from django.db import transaction
from datetime import datetime
from django.utils import timezone
from django.contrib.auth import get_user_model

Mentor = get_user_model()

class MentorAvailabilityListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MentorAvailabilitySerializer

    def get_queryset(self):
        # Only return availabilities of the requesting mentor
        return MentorAvailability.objects.filter(mentor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(mentor=self.request.user)

class SearchMentorsByAvailability(APIView):
    permission_classes = [permissions.AllowAny]  # Public endpoint

    def get(self, request):
        date = request.query_params.get('date')
        start_time = request.query_params.get('start_time')
        end_time = request.query_params.get('end_time')

        if not date or not start_time or not end_time:
            return Response(
                {"error": "Please provide date, start_time, and end_time query parameters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        availabilities = MentorAvailability.objects.filter(
            date=date,
            start_time__gte=start_time,
            end_time__lte=end_time
        )

        mentors = set(av.mentor for av in availabilities)
        mentor_data = [
            {"id": mentor.id, "name": mentor.get_full_name() or mentor.username}
            for mentor in mentors
        ]

        return Response({"mentors": mentor_data}, status=status.HTTP_200_OK)

class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(learner=self.request.user)

class MentorBookingListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        bookings = BookingRequest.objects.filter(mentor_availability__mentor=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

class BookingUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            booking = BookingRequest.objects.get(pk=pk, mentor_availability__mentor=request.user)
        except BookingRequest.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

        if booking.status != 'pending':
            return Response({'error': 'Booking already processed'}, status=status.HTTP_400_BAD_REQUEST)

        status_update = request.data.get('status')
        if status_update not in ['approved', 'rejected']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            booking.status = status_update
            booking.save()

            if status_update == 'approved':
                scheduled_time = timezone.make_aware(
                    datetime.combine(booking.mentor_availability.date, booking.mentor_availability.start_time)
                )
                session = Session.objects.create(
                    booking=booking,  # Make sure FK in Session model is named 'booking'
                    learner=booking.learner,
                    mentor=booking.mentor_availability.mentor,
                    scheduled_time=scheduled_time,
                    duration_minutes=30,
                    status='confirmed'
                )
                session_serializer = SessionSerializer(session)
                return Response({
                    'booking': BookingSerializer(booking).data,
                    'session': session_serializer.data
                })

            return Response(BookingSerializer(booking).data)

class LearnerBookingHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        bookings = BookingRequest.objects.filter(learner=request.user)
        sessions = Session.objects.filter(learner=request.user)
        feedbacks = Feedback.objects.filter(user=request.user)

        booking_serializer = BookingSerializer(bookings, many=True)
        session_serializer = SessionSerializer(sessions, many=True)
        feedback_serializer = FeedbackSerializer(feedbacks, many=True)

        return Response({
            'bookings': booking_serializer.data,
            'sessions': session_serializer.data,
            'feedbacks': feedback_serializer.data
        }, status=status.HTTP_200_OK)
