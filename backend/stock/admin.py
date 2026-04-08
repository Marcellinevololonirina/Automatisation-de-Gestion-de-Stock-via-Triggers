from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import CustomUser, Produit, Fournisseur, Approvisionnement, AuditApprovisionnement

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'role', 'is_staff')
    list_filter = ('role',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('role', 'is_staff', 'is_superuser', 'is_active')}),
    )

@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('numero', 'design', 'stock')

@admin.register(Fournisseur)
class FournisseurAdmin(admin.ModelAdmin):
    list_display = ('numero', 'nom')

@admin.register(Approvisionnement)
class ApprovisionnementAdmin(admin.ModelAdmin):
    list_display = ('id', 'fournisseur', 'produit', 'qteentree')

@admin.register(AuditApprovisionnement)
class AuditAdmin(admin.ModelAdmin):
    list_display = ('action', 'date', 'utilisateur', 'produit_design', 'qteentree_nouv')
    readonly_fields = ('date',) # L'audit ne doit pas être modifié manuellement