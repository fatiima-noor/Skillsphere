from rest_framework import serializers
from .models import BookingRequest
from custom_sessions.models import Session, Feedback
from datetime import datetime, time
from django.utils import timezone

class BookingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRequest
        fields = ['id', 'learner', 'mentor', 'requested_date', 'requested_time', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

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
