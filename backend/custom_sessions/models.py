from django.db import models
from django.conf import settings

class Session(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    learner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='learner_sessions',
        on_delete=models.CASCADE
    )
    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='mentor_sessions',
        on_delete=models.CASCADE
    )
    scheduled_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=30)  # default 30 mins
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Session {self.id} | Learner: {self.learner.username} - Mentor: {self.mentor.username} @ {self.scheduled_time}"
