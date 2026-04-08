from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from .models import Approvisionnement, Produit, AuditApprovisionnement

# STOCK + AUDIT INSERT / UPDATE
@receiver(pre_save, sender=Approvisionnement)
def update_stock_and_audit(sender, instance, **kwargs):
    try:
        old = Approvisionnement.objects.get(pk=instance.pk)
        ancien_qte = old.qteentree
        action = 'UPDATE'
    except Approvisionnement.DoesNotExist:
        ancien_qte = 0
        action = 'INSERT'

    produit = instance.produit

    # Mise à jour stock
    produit.stock = produit.stock + instance.qteentree - ancien_qte
    produit.save()

    # Audit
    AuditApprovisionnement.objects.create(
        action=action,
        fournisseur_nom=instance.fournisseur.nom,
        produit_design=produit.design,
        qteentree_ancien=ancien_qte,
        qteentree_nouv=instance.qteentree,
        utilisateur="system"  # on va améliorer après
    )


# DELETE
@receiver(post_delete, sender=Approvisionnement)
def audit_delete(sender, instance, **kwargs):
    produit = instance.produit

    produit.stock -= instance.qteentree
    produit.save()

    AuditApprovisionnement.objects.create(
        action='DELETE',
        fournisseur_nom=instance.fournisseur.nom,
        produit_design=produit.design,
        qteentree_ancien=instance.qteentree,
        qteentree_nouv=0,
        utilisateur="system"
    )

    utilisateur = getattr(instance, '_user', 'system')