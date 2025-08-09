from django.urls import path
from .views import BookingRequestCreateView, MentorBookingListView, BookingRequestUpdateView, LearnerBookingHistoryView

urlpatterns = [
    path('bookings/create/', BookingRequestCreateView.as_view(), name='booking-create'),
    path('bookings/mentor/', MentorBookingListView.as_view(), name='mentor-bookings'),
    path('bookings/<int:pk>/update/', BookingRequestUpdateView.as_view(), name='booking-update'),
    path('bookings/history/', LearnerBookingHistoryView.as_view(), name='learner-history'),
]