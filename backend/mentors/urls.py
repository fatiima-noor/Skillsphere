from django.urls import path
from .views import (
    BookingCreateView,
    MentorBookingListView,
    BookingUpdateView,
    LearnerBookingHistoryView,
    MentorAvailabilityListCreateView,
    SearchMentorsByAvailability,  # Corrected import (capital S...)
)

urlpatterns = [
    path('create/', BookingCreateView.as_view(), name='booking-create'),
    path('mentor/list/', MentorBookingListView.as_view(), name='mentor-booking-list'),
    path('update/<int:pk>/', BookingUpdateView.as_view(), name='booking-update'),
    path('learner/history/', LearnerBookingHistoryView.as_view(), name='learner-booking-history'),
    path('availability/', MentorAvailabilityListCreateView.as_view(), name='mentor-availability'),
    path('availability/search/', SearchMentorsByAvailability.as_view(), name='mentor-availability-search'),  # Use .as_view() for class-based view
]
