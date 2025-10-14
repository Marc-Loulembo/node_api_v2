# 🚀 Node.js REST API Template - TypeScript

Un template complet d'API REST moderne avec Node.js, TypeScript, Fastify, Prisma et authentification JWT.

## ✨ Fonctionnalités

- 🔥 **Fastify** - Framework web rapide et efficace
- 📘 **TypeScript** - Typage statique pour une meilleure sécurité
- 🗄️ **Prisma** - ORM moderne avec migrations
- 🔐 **Authentification JWT** - Sécurité avec tokens
- 🏗️ **Architecture MVC** - Structure claire et maintenable
- 📝 **Validation** - Validation des données d'entrée
- 🐳 **Docker** - Support Docker pour le déploiement
- 🔄 **Hot Reload** - Rechargement automatique en développement

## 🛠️ Technologies

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL (avec Prisma)
- **Authentication**: JWT
- **Validation**: Built-in Fastify validation
- **Development**: tsx, nodemon

## 📁 Structure du projet

```
src/
├── config/           # Configuration (Fastify, JWT)
├── controllers/      # Contrôleurs (auth, posts)
├── middleware/       # Middlewares (authentification)
├── models/          # Modèles de données (User, Post)
├── repositories/    # Couche d'accès aux données
├── routes/          # Définition des routes
│   └── auth/        # Routes d'authentification
├── utils/           # Utilitaires (JWT, autoLoad)
├── lib/             # Configuration Prisma
└── seeders/         # Données de test
```

## 🚀 Installation

### Prérequis
- Node.js 18+
- Yarn 4+
- PostgreSQL

### Installation des dépendances

```bash
# Cloner le repository
git clone <repository-url>
cd node-rest

# Installer les dépendances
yarn install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos configurations
```

### Configuration de la base de données

```bash
# Générer le client Prisma
yarn db:generate

# Exécuter les migrations
yarn db:migrate

# (Optionnel) Peupler la base de données
yarn db:seed
```

## 🏃‍♂️ Démarrage

### Développement

```bash
# Démarrer en mode développement (avec hot reload)
yarn dev
```

Le serveur sera accessible sur `http://localhost:3001`

### Production

```bash
# Compiler le TypeScript
yarn build

# Démarrer en production
yarn start
```

## 📚 Scripts disponibles

| Script | Description |
|--------|-------------|
| `yarn dev` | Démarrage en mode développement avec hot reload |
| `yarn build` | Compilation TypeScript vers JavaScript |
| `yarn start` | Démarrage en production |
| `yarn db:generate` | Génération du client Prisma |
| `yarn db:migrate` | Exécution des migrations |
| `yarn db:studio` | Interface Prisma Studio |
| `yarn db:seed` | Peuplement de la base de données |

## 🔐 API Endpoints

### Authentification

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Inscription d'un utilisateur |
| POST | `/auth/login` | Connexion |
| POST | `/auth/logout` | Déconnexion |
| POST | `/auth/refresh` | Rafraîchissement du token |
| GET | `/profile` | Profil utilisateur (protégé) |
| GET | `/private` | Données privées (protégé) |

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Liste des posts |
| POST | `/posts` | Créer un post |
| PUT | `/posts` | Modifier un post |
| DELETE | `/posts` | Supprimer un post |

### Général

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Message de bienvenue |

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# JWT
JWT_SECRET="votre-secret-super-securise"
JWT_EXPIRES_IN="24h"
JWT_REFRESH_EXPIRES_IN="7d"

# Serveur
PORT=3001
```

### Configuration TypeScript

Le projet utilise une configuration TypeScript stricte avec :
- Support ESM (ES Modules)
- Types stricts activés
- Source maps pour le debugging
- Compilation vers le dossier `dist/`

## 🏗️ Architecture

### Pattern MVC

- **Models** : Définition des entités de données avec Prisma
- **Views** : Réponses JSON structurées
- **Controllers** : Logique métier et gestion des requêtes

### Couches

1. **Routes** : Définition des endpoints
2. **Controllers** : Logique métier
3. **Repositories** : Accès aux données
4. **Models** : Entités de données

### Middleware

- **Authentification JWT** : Protection des routes
- **Validation** : Validation automatique des données
- **Logging** : Logs structurés avec Pino

## 🐳 Docker

Le projet inclut une configuration Docker :

```bash
# Démarrer avec Docker Compose
docker-compose up -d

# Arrêter les services
docker-compose down
```

## 🧪 Tests

```bash
# Exécuter les tests (à implémenter)
yarn test

# Tests avec couverture
yarn test:coverage
```

## 📦 Déploiement

### Build de production

```bash
# Compiler le projet
yarn build

# Installer les dépendances de production
yarn install --production

# Démarrer l'application
yarn start
```

### Variables d'environnement de production

Assurez-vous de configurer :
- `DATABASE_URL` : URL de la base de données de production
- `JWT_SECRET` : Secret JWT sécurisé
- `NODE_ENV=production`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Fastify](https://www.fastify.io/) - Framework web rapide
- [Prisma](https://www.prisma.io/) - ORM moderne
- [TypeScript](https://www.typescriptlang.org/) - JavaScript typé
- [Node.js](https://nodejs.org/) - Runtime JavaScript

---

**Template créé avec ❤️ pour le développement d'APIs REST modernes**