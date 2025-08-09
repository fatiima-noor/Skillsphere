from rest_framework import serializers
from .models import Session, Feedback

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # show username for feedback author

    class Meta:
        model = Feedback
        fields = ['id', 'session', 'user', 'rating', 'comment', 'created_at']