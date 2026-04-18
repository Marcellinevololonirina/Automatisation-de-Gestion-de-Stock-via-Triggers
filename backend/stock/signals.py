from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from .models import Approvisionnement, Produit, AuditApprovisionnement

# STOCK + AUDIT INSERT / UPDATE

@receiver(pre_save, sender=Approvisionnement)
def get_old_qte(sender,instance, **kwargs):
    if instance.pk:
        old = Approvisionnement.objects.get(pk=instance.pk)
        instance._old_qte=old.qteentree
    else:
        instance._old_qte=0


@receiver(post_save,sender=Approvisionnement)
def update_stock_and_audit(sender, instance,created, **kwargs):
    produit = instance.produit
    ancien_qte = getattr(instance, '_old_qte', 0)


    #Mise à jour stock
    produit.stock += instance.qteentree - ancien_qte
    produit.save()

    action = 'INSERT' if created else 'UPDATE'


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