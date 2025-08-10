from django.db import models
from django.conf import settings

class MentorAvailability(models.Model):
    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='availabilities'
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.mentor.username} - {self.date} {self.start_time}-{self.end_time}"
