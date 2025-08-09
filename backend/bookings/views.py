from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import BookingRequest
from custom_sessions.models import Session, Feedback  # Added Feedback import
from .serializers import BookingRequestSerializer, SessionSerializer, FeedbackSerializer
from django.db import transaction
from datetime import datetime
from django.utils import timezone

class BookingRequestCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookingRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(learner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MentorBookingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = BookingRequest.objects.filter(mentor=request.user)
        serializer = BookingRequestSerializer(bookings, many=True)
        return Response(serializer.data)

class BookingRequestUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            booking = BookingRequest.objects.get(pk=pk, mentor=request.user)
        except BookingRequest.DoesNotExist:
            return Response({'error': 'Booking request not found'}, status=status.HTTP_404_NOT_FOUND)

        if booking.status != 'pending':
            return Response({'error': 'Booking request already processed'}, status=status.HTTP_400_BAD_REQUEST)

        status_update = request.data.get('status')
        if status_update not in ['approved', 'rejected']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            booking.status = status_update
            booking.save()
            
            if status_update == 'approved':
                scheduled_time = timezone.make_aware(
                    datetime.combine(booking.requested_date, booking.requested_time)
                )
                session = Session.objects.create(
                    booking_request=booking,
                    learner=booking.learner,
                    mentor=booking.mentor,
                    scheduled_time=scheduled_time,
                    duration_minutes=30,
                    status='confirmed'
                )
                session_serializer = SessionSerializer(session)
                return Response({
                    'booking': BookingRequestSerializer(booking).data,
                    'session': session_serializer.data
                })
            
            return Response(BookingRequestSerializer(booking).data)

class LearnerBookingHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch bookings, sessions, and feedbacks for the authenticated learner
        bookings = BookingRequest.objects.filter(learner=request.user)
        sessions = Session.objects.filter(learner=request.user)
        feedbacks = Feedback.objects.filter(user=request.user)

        # Serialize data, ensuring empty querysets return empty lists
        booking_serializer = BookingRequestSerializer(bookings, many=True)
        session_serializer = SessionSerializer(sessions, many=True)
        feedback_serializer = FeedbackSerializer(feedbacks, many=True)

        # Return response with empty lists if no data exists
        return Response({
            'bookings': booking_serializer.data or [],
            'sessions': session_serializer.data or [],
            'feedbacks': feedback_serializer.data or []
        }, status=status.HTTP_200_OK)