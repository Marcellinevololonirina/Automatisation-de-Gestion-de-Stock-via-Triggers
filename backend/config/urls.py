from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from stock.views import (
    ProduitViewSet, 
    FournisseurViewSet,
    ApprovisionnementViewSet, 
    AuditApprovisionnementViewSet, 
    UserRegisterView, 
    CustomTokenObtainPairView
)

router = routers.DefaultRouter()
router.register(r'produits', ProduitViewSet)
router.register(r'fournisseurs', FournisseurViewSet)
router.register(r'approvisionnements', ApprovisionnementViewSet)
router.register(r'audits', AuditApprovisionnementViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', UserRegisterView.as_view(), name='register'),

    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
