from django.shortcuts import render

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .serializers import (
    RegisterSerializer, UserSerializer, LoginSerializer,
    UserProfileSerializer, ChangePasswordSerializer,
    MentorApplicationSerializer, MentorApprovalSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid Credentials'}, status=400)


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data, context={'request': request})

        serializer.is_valid(raise_exception=True)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)


class MentorApplicationView(generics.UpdateAPIView):
    serializer_class = MentorApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class MentorApprovalListView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer  # Full user info for admin

    def get_queryset(self):
        # Only mentors with pending status
        return User.objects.filter(role='mentor', mentor_status='pending')


class MentorApprovalUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = MentorApprovalSerializer
    queryset = User.objects.filter(role='mentor')

    # Approve or reject mentor by PATCHing mentor_status to 'approved' or 'rejected'

class MentorApplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user.role = 'mentor'
        user.mentor_status = 'pending'
        user.skills = request.data.get('skills', '')
        user.portfolio_url = request.data.get('portfolio_url', '')
        user.bio = request.data.get('bio', user.bio)
        user.save()
        return Response({'detail': 'Mentor application submitted'}, status=status.HTTP_200_OK)