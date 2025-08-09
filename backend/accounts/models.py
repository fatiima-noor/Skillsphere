from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('learner', 'Learner'),
        ('mentor', 'Mentor'),
        ('admin', 'Admin'),
    )

    MENTOR_STATUS_CHOICES = (
        ('none', 'None'),
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='learner')
    mentor_status = models.CharField(
        max_length=10,
        choices=MENTOR_STATUS_CHOICES,
        default='none',
        blank=True,
        null=True,
    )
    bio = models.TextField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    portfolio_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.username
