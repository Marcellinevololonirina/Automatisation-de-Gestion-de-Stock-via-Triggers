from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Produit(models.Model):
    numero = models.AutoField(primary_key=True)
    design = models.CharField(max_length=100)
    stock = models.IntegerField(default=0)

class Fournisseur(models.Model):
    numero = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)

class Approvisionnement(models.Model):
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    qteentree = models.IntegerField()

class AuditApprovisionnement(models.Model):
    ACTIONS = [
        ('INSERT', 'Ajout'),
        ('UPDATE', 'Modification'),
        ('DELETE', 'Suppression'),
    ]
    action = models.CharField(max_length=10, choices=ACTIONS)
    date = models.DateTimeField(auto_now_add=True)
    fournisseur_nom = models.CharField(max_length=100)
    produit_design = models.CharField(max_length=100)
    qteentree_ancien = models.IntegerField(null=True, blank=True)
    qteentree_nouv = models.IntegerField(null=True, blank=True)
    utilisateur = models.CharField(max_length=100)



class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('USER', 'Utilisateur'),
        ('ADMIN', 'AdminAudit'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')
    