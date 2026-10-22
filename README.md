# Mon carnet — gestion de contacts

Application Vue.js réalisée pour le TP de gestion de contacts.

## Installation et lancement

```bash
npm install
npm run dev
```

Pour vérifier la version de production :

```bash
npm run build
```

## Fonctionnalités

- liste de cinq contacts initiaux avec photo, nom, prénom, téléphone et e-mail ;
- recherche dans les contacts ;
- création et modification d'une fiche sans rechargement de page ;
- validation des champs obligatoires et du format e-mail ;
- boutons `Appeler` (`tel:`) et `E-mail` (`mailto:`) ;
- sélection d'une photo depuis la galerie ou capture via la caméra de l'appareil ;
- prévisualisation immédiate de la photo ;
- partage de l'état entre les pages avec un store réactif et sauvegarde `localStorage`.

Le routage est assuré par Vue Router. Les photos initiales sont des illustrations SVG intégrées afin que l'application reste utilisable hors ligne.

Les captures utilisées dans le compte rendu sont regroupées dans le dossier [`captures/`](./captures/).
Le compte rendu PDF est disponible dans [`compte-rendu-contacts.pdf`](./compte-rendu-contacts.pdf).
