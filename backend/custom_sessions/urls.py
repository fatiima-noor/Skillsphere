from django.urls import path
from .views import SessionListCreateView, SessionDetailView,  FeedbackListCreateView

urlpatterns = [
    path('', SessionListCreateView.as_view(), name='session-list-create'),
    path('<int:pk>/', SessionDetailView.as_view(), name='session-detail'),
    path('feedback/', FeedbackListCreateView.as_view(), name='feedback-list-create'),

]
