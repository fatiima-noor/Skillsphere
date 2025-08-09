from django.urls import path
from .views import MessageListCreateView

urlpatterns = [
    path('sessions/<int:session_id>/messages/', MessageListCreateView.as_view(), name='session-messages'),
]
