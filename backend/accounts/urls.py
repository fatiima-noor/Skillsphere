from django.urls import path
from .views import RegisterView, LoginView, ProfileView, ChangePasswordView, MentorApplicationView, MentorApprovalListView, MentorApprovalUpdateView, MentorApplyView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

    path('mentor/apply/', MentorApplyView.as_view(), name='mentor-apply'),  # Apply as mentor
    path('mentor/profile/', MentorApplicationView.as_view(), name='mentor-profile-update'),  # Update mentor profile details if needed

    path('mentor/applications/', MentorApprovalListView.as_view(), name='mentor-applications'),
    path('mentor/applications/<int:pk>/approve/', MentorApprovalUpdateView.as_view(), name='mentor-approve'),
]
