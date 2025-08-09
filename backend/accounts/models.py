from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('learner', 'Learner'),
        ('mentor', 'Mentor'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='learner')
    bio = models.TextField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
