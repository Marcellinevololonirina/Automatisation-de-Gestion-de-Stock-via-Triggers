from django.shortcuts import render
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .permissions import IsAdminAudit, IsUser

# Create your views here.
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, BasePermission
from .models import Produit, Fournisseur, Approvisionnement, AuditApprovisionnement
from .serializers import (
    ProduitSerializer, FournisseurSerializer,
    ApprovisionnementSerializer, AuditApprovisionnementSerializer
)

User = get_user_model()

class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer
    permission_classes = [IsAuthenticated]  # accessible aux utilisateurs connectés

class FournisseurViewSet(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer
    permission_classes = [IsAuthenticated]  # accessible aux utilisateurs connectés

class ApprovisionnementViewSet(viewsets.ModelViewSet):
    queryset = Approvisionnement.objects.all()
    serializer_class = ApprovisionnementSerializer
    permission_classes = [IsAuthenticated]  # accessible aux utilisateurs connectés

    def perform_create(self, serializer):
        instance = serializer.save()
        instance._user = self.request.user.username

    def perform_update(self, serializer):
        instance = serializer.save()
        instance._user = self.request.user.username

class AuditApprovisionnementViewSet(viewsets.ModelViewSet):
    queryset = AuditApprovisionnement.objects.all()
    serializer_class = AuditApprovisionnementSerializer
    permission_classes = [IsAdminAudit]  # réservé aux admins


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role  # ajouter le rôle dans la réponse
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer