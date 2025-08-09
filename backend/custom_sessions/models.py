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
        related_name='custom_learner_sessions',
        on_delete=models.CASCADE
    )
    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='custom_mentor_sessions',
        on_delete=models.CASCADE
    )
    booking_request = models.OneToOneField(
        'bookings.BookingRequest',  # Updated to correct app name
        on_delete=models.CASCADE,
        related_name='custom_session',
        null=True,
    )
    scheduled_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=30)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Session {self.id} | Learner: {self.learner.username} - Mentor: {self.mentor.username} @ {self.scheduled_time}"

class Feedback(models.Model):
    session = models.ForeignKey('custom_sessions.Session', on_delete=models.CASCADE, related_name='feedbacks')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.user.username} for session {self.session.id}"