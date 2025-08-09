from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, SkillSphere!")

urlpatterns = [
    path('', home),  # homepage at root '/'
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),  # include accounts URLs here under /api/
]
