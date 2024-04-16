# Chat en React avec Mercure

Ce projet est un chat en temps réel développé avec React et utilisant le protocole Mercure pour la communication bidirectionnelle entre le serveur et le client.

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```
   git clone https://github.com/achkeydev/chat-react-mercure.git
   ```

2. Accédez au répertoire du projet :

   ```
   cd chat-react-mercure
   Front: cd frontend
   Back: cd backend
   ```

3. Installez les dépendances nécessaires avec npm ou yarn :

   ```
   npm install
   # ou
   yarn install
   ```

## Configuration

Avant de lancer l'application, assurez-vous de remplacer `.env.example` par `.env` dans (frontend) et (backend).

## Utilisation

Une fois les dépendances installées et la configuration terminée, vous pouvez lancer l'application en exécutant les commandes suivantes :

``` Using Docker
docker-compose up --build -d
```

-- Without Docker
```
cd backend
node server
--
cd frontend
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:3000` par défaut.

## Fonctionnalités

- **Connexion utilisateur :** Les utilisateurs peuvent se connecter avec leur nom ou pseudonyme.
- **Envoi de messages :** Les utilisateurs peuvent envoyer des messages en temps réel.
- **Réception de messages en temps réel :** Les messages sont reçus et affichés en temps réel grâce à Mercure. (Working on it)
- **Liste des utilisateurs connectés :** Une liste des utilisateurs actuellement connectés est affichée. (Working on it)

**Bonus:**

- **Création et gestion de groupes :** Les utilisateurs peuvent créer des groupes et les supprimer, et d'autres utilisateurs peuvent les rejoindre. (Working on it)
- **Envoi de messages dans un groupe :** Les utilisateurs peuvent envoyer des messages dans les groupes. (Working on it)

## Technologies utilisées

- React
- Mercure - (Fixing it..)

## Auteur

Ce projet a été développé par [Achraf CHARDOUDI] et [Lyes DJAOUT]

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez ouvrir une issue pour discuter des modifications que vous souhaitez apporter.

## Licence

Ce projet est sous licence - HETIC.
