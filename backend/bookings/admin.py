from django.contrib import admin
from .models import BookingRequest  # rename here too

@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'learner', 'mentor_availability', 'status', 'created_at', 'updated_at']
