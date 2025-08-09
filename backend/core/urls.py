from django.contrib import admin
from django.urls import path
from django.http import HttpResponse  # import this to create a simple response

def home(request):
    return HttpResponse("Hello, SkillSphere!")

urlpatterns = [
    path('', home),  # root URL
    path('admin/', admin.site.urls),
]
