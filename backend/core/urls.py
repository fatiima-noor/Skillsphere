from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


def home(request):
    return HttpResponse("Hello, SkillSphere!")

urlpatterns = [
    path('', home),  # homepage at root '/'
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/custom_sessions/', include('custom_sessions.urls')),
    path('api/', include('bookings.urls')),
    path('api/mentors/', include('mentors.urls')),
    path('api/messaging/', include('messaging.urls')),

    # Add your admin stats app URLs here:
    path('api/', include('admin_stats.urls')),  # assuming your app is named admin_stats

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
