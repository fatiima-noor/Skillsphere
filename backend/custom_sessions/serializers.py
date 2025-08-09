from rest_framework import serializers
from .models import Session, Feedback, SessionResource  # <- include SessionResource here

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Feedback
        fields = ['id', 'session', 'user', 'rating', 'comment', 'created_at']

class SessionResourceSerializer(serializers.ModelSerializer):
    uploaded_by_username = serializers.ReadOnlyField(source='uploaded_by.username')

    class Meta:
        model = SessionResource
        fields = ['id', 'session', 'uploaded_by', 'uploaded_by_username', 'file', 'description', 'uploaded_at']
        read_only_fields = ['uploaded_by', 'uploaded_at']
