from backend import views
from django.urls import path, include
from django.contrib import admin
from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'user', views.UserView, 'user')
router.register(r'meeting', views.MeetingView, 'meeting')
router.register(r'meetingrequest', views.MeetingRequestView, 'meetingrequest')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('backend.urls'))
]