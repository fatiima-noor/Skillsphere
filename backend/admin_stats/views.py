from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from bookings.models import BookingRequest
from custom_sessions.models import Session

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAdminUser])
def platform_stats(request):
    total_users = User.objects.count()
    total_bookings = BookingRequest.objects.count()
    total_sessions = Session.objects.count()

    data = {
        'total_users': total_users,
        'total_bookings': total_bookings,
        'total_sessions': total_sessions,
    }
    return Response(data)
