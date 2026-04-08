from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Produit, Fournisseur, Approvisionnement, AuditApprovisionnement

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'

class ApprovisionnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approvisionnement
        fields = '__all__'

class AuditApprovisionnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditApprovisionnement
        fields = '__all__'


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data.get('role', 'USER')
        )
        return user
