from django.urls import path
from .views import platform_stats

urlpatterns = [
    path('admin/stats/', platform_stats, name='platform-stats'),
]
