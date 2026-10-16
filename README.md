# Vicino

Prototype interactif d'une plateforme de partage de quartier : prêter des objets, offrir du temps et des compétences.
Les profils et annonces sont fictifs ; les annonces et rendez-vous créés restent dans le navigateur (`localStorage`).

## Structure

```
.
├── index.html        # Structure de la page
├── css/
│   └── style.css     # Styles
├── js/
│   ├── app.js        # Annonces, recherche, profils, rendez-vous
│   └── effects.js    # Animations (orbite, étoiles, pause des effets)
└── assets/
    ├── galaxy.webp   # Image de fond
    └── cursor.svg    # Curseur personnalisé
```

## Lancer en local

Aucune dépendance, aucun build. Ouvrez `index.html` dans un navigateur, ou lancez un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Publier sur GitHub Pages

1. Poussez ces fichiers à la racine du dépôt.
2. Dans **Settings → Pages**, choisissez la branche `main` et le dossier `/ (root)`.
3. Le site sera disponible à l'adresse `https://<utilisateur>.github.io/<depot>/`.
