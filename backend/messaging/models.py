from django.db import models
from django.contrib.auth import get_user_model
from custom_sessions.models import Session  # Correct import

User = get_user_model()

class Message(models.Model):
    session = models.ForeignKey(Session, related_name='messages', on_delete=models.CASCADE)  # Use Session here!
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"Msg by {self.sender} @ {self.timestamp}"
