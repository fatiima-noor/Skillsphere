from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = Message
        fields = ['id', 'session', 'sender', 'sender_username', 'content', 'timestamp']
        read_only_fields = ['sender', 'timestamp']
