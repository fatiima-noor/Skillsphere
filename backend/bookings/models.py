from django.db import models
from django.conf import settings
from mentors.models import MentorAvailability

class BookingRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    
    learner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    mentor_availability = models.ForeignKey(MentorAvailability, on_delete=models.CASCADE, related_name='bookings')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('mentor_availability',)

    @property
    def date(self):
        return self.mentor_availability.date

    @property
    def start_time(self):
        return self.mentor_availability.start_time

    @property
    def end_time(self):
        return self.mentor_availability.end_time

    def __str__(self):
        return f"Booking({self.learner}, {self.mentor_availability.mentor}, {self.date} {self.start_time})"