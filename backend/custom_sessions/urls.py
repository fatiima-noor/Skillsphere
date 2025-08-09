from django.urls import path
from .views import (
    SessionListCreateView,
    SessionDetailView,
    FeedbackListCreateView,
    SessionResourceListCreateView,
)

urlpatterns = [
    path('', SessionListCreateView.as_view(), name='session-list-create'),
    path('<int:pk>/', SessionDetailView.as_view(), name='session-detail'),
    path('feedback/', FeedbackListCreateView.as_view(), name='feedback-list-create'),
    path('<int:session_id>/resources/', SessionResourceListCreateView.as_view(), name='session-resource-list-create'),
]
