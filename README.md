# ELORA Accessories — version locale + Supabase

Cette version du site fonctionne comme prototype local **avec intégration Supabase optionnelle**. 

## 🚀 Nouveau : Intégration Supabase

Le site supporte maintenant **Supabase** pour:
- ✅ Authentification utilisateur réelle
- ✅ Panier persistant multi-appareils
- ✅ Historique des commandes en base de données
- ✅ Synchronisation des favoris
- ✅ Gestion des produits via dashboard

**Mode fallback automatique** : Si Supabase n'est pas configuré, le site fonctionne avec localStorage/sessionStorage comme avant.

### Configuration rapide (5 minutes)

1. **Créez un projet Supabase** sur [supabase.com](https://supabase.com)
2. **Exécutez le schéma** : Copiez tout le contenu de `supabase-schema.sql` dans l'éditeur SQL Supabase
3. **Configurez les clés** : Modifiez `supabase-config.js` avec vos identifiants
4. **Activez** : Changez `SUPABASE_ENABLED = true`

📖 **Guide complet** : Consultez `SUPABASE-README.md` ou `SUPABASE-SETUP.md`

## Ouvrir le site

Ouvrez ce dossier dans l'Explorateur de fichiers et double-cliquez sur `index.html`.

## Contenu

### Fichiers principaux
- Pages HTML de la boutique, des catégories, des fiches produit, du panier et du checkout
- `style.css`, `script.js`, `ecommerce.js` et le dossier `images/`

### Fichiers Supabase (nouveau)
- `supabase-config.js` - Configuration du projet
- `supabase-db.js` - Couche d'abstraction base de données
- `supabase-schema.sql` - Schéma complet de la base
- `SUPABASE-README.md` - Guide d'intégration complet
- `SUPABASE-SETUP.md` - Instructions pas-à-pas

### Documentation
- Les prompts ELORA remplis sont fournis comme documents de référence

## Mode sans Supabase

Si vous n'activez pas Supabase, le site fonctionne exactement comme avant:
- Comptes simulés en sessionStorage
- Panier en localStorage  
- Commandes en localStorage
- Aucune donnée n'est envoyée en ligne

Utilisez uniquement des coordonnées fictives dans le parcours de démonstration.
"# KodsProj" 
