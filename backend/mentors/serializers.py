from rest_framework import serializers
from bookings.models import BookingRequest
from custom_sessions.models import Session, Feedback
from mentors.models import MentorAvailability
from .models import MentorAvailability


class BookingSerializer(serializers.ModelSerializer):
    mentor_availability = serializers.PrimaryKeyRelatedField(queryset=MentorAvailability.objects.all())
    date = serializers.DateField(source='mentor_availability.date', read_only=True)
    start_time = serializers.TimeField(source='mentor_availability.start_time', read_only=True)
    end_time = serializers.TimeField(source='mentor_availability.end_time', read_only=True)

    class Meta:
        model = BookingRequest
        fields = ['id', 'learner', 'mentor_availability', 'date', 'start_time', 'end_time', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'created_at', 'updated_at', 'date', 'start_time', 'end_time']

    def validate(self, data):
        mentor_availability = data.get('mentor_availability')
        if mentor_availability and BookingRequest.objects.filter(mentor_availability=mentor_availability).exists():
            raise serializers.ValidationError("This time slot is already booked.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        booking = BookingRequest.objects.create(
            learner=user,
            mentor_availability=validated_data['mentor_availability'],
            status='pending'
        )
        return booking


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['id', 'booking_request', 'learner', 'mentor', 'scheduled_time', 'duration_minutes', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'session', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class MentorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorAvailability
        fields = ['id', 'mentor', 'date', 'start_time', 'end_time']
        read_only_fields = ['mentor']