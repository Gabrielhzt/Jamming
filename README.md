Jammming
========

Jammming est une application web qui permet aux utilisateurs de créer et de gérer des playlists Spotify. Utilisant l'API Spotify, Jammming offre une expérience fluide pour rechercher des chansons, les ajouter à des playlists, et synchroniser les playlists avec Spotify.

Fonctionnalités
---------------

*   **Authentification avec Spotify** : Les utilisateurs peuvent se connecter avec leur compte Spotify pour accéder à leurs données de playlist.
    
*   **Recherche de chansons** : Les utilisateurs peuvent rechercher des chansons et les ajouter à leurs playlists.
    
*   **Gestion des playlists** : Les utilisateurs peuvent créer et modifier des playlists.
    
*   **Synchronisation avec Spotify** : Les playlists créées dans Jammming peuvent être importées directement dans le compte Spotify de l'utilisateur.
    

Prérequis
---------

*   Node.js
    
*   Un compte Spotify Developer
    
*   Clé API Spotify
    

Installation
------------

1.  git clone https://github.com/votre-utilisateur/jammming.gitcd jammming
    
2. npm install
    
3.  REACT\_APP\_SPOTIFY\_CLIENT\_ID=your\_spotify\_client\_idREACT\_APP\_SPOTIFY\_REDIRECT\_URI=http://localhost:3000/callbackRemplacez your\_spotify\_client\_id par votre ID client Spotify et ajustez l'URI de redirection selon vos besoins.
    
4.  npm start Ouvrez [http://localhost:3000](http://localhost:3000/) pour voir votre application en action.
    

Utilisation
-----------

1.  **Connexion** : Cliquez sur le bouton de connexion pour vous authentifier via Spotify.
    
2.  **Recherche** : Utilisez la barre de recherche pour trouver des chansons.
    
3.  **Ajouter aux playlists** : Cliquez sur les boutons pour ajouter des chansons à votre playlist actuelle.
    
4.  **Gestion des playlists** : Modifiez le titre et la description de votre playlist, supprimez des chansons et importez la playlist sur Spotify.
    

Structure du projet
-------------------

*   public/
    
*   src/
    
    *   API/
        
        *   Spotify.js : Module d'interaction avec l'API Spotify.
            
    *   App/
        
        *   App.css : Styles de l'application.
            
        *   App.js : Composant principal de l'application.
            
    *   Info/
        
        *   Info.css : Styles du composant d'informations.
            
        *   Info.js : Composant d'informations.
            
    *   Playlist/
        
        *   Playlist.css : Styles du composant de gestion des playlists.
            
        *   Playlist.js : Composant de gestion des playlists.
            
    *   Profile/
        
        *   Profile.css : Styles du composant de profil utilisateur.
            
        *   Profile.js : Composant de profil utilisateur.
            
    *   Search/
        
        *   Search.css : Styles du composant de recherche.
            
        *   Search.js : Composant de recherche.
            
    *   index.css : Styles globaux.
        
    *   index.js : Point d'entrée de l'application React.
        
*   .gitignore : Fichiers et dossiers à ignorer par Git.
    
*   README.md : Documentation du projet (ce fichier).
    

Développement
-------------

Pour contribuer au développement de Jammming, suivez ces étapes :

1.  **Fork** le dépôt.
    
2.  **Clone** votre fork localement.
    
3.  Créez une nouvelle branche pour votre fonctionnalité ou correction de bug.
    
4.  Développez votre fonctionnalité ou correction.
    
5.  Soumettez une **pull request** avec une description détaillée de vos changements.
