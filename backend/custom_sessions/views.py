from rest_framework import generics, permissions
from .models import Session, Feedback, SessionResource
from .serializers import SessionSerializer, FeedbackSerializer, SessionResourceSerializer
from rest_framework.permissions import IsAuthenticated

class SessionListCreateView(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

class SessionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SessionResourceListCreateView(generics.ListCreateAPIView):
    serializer_class = SessionResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        session_id = self.kwargs['session_id']  # get session_id from URL
        return SessionResource.objects.filter(session_id=session_id)

    def perform_create(self, serializer):
        session_id = self.kwargs['session_id']  # get session_id from URL
        session = Session.objects.get(pk=session_id)
        serializer.save(session=session, uploaded_by=self.request.user)
