# 🧙‍♂️ User Management Sorcery: Enchanting CI/CD Pipeline with GitHub Actions & Heroku Magic

Welcome to the realm of User Management, where sorcery meets technology! Our enchanted API is crafted with Node.js and Express.js, dockerized for swift deployments, and enchanted with CI/CD pipelines to summon automated tests and deployments as if by magic.

## 🌟 Mystical Features

- **CRUD Conjurations**: Create, Read, Update, and Delete user enchantments.
- **Express.js Spellbook**: A fast and minimalist spellbook for Node.js rituals.
- **MongoDB Atlas Kingdom**: Cloud-hosted citadel for storing user scrolls.
- **Jest Incantations**: Comprehensive test scrolls for API spells.
- **Swagger Grimoire**: Interactive spellbook documentation for easy spellcasting.
- **Zod Wardings**: Input validation wardings for enhanced spell security.
- **Docker Concoctions**: Containerized cauldron for consistent spell environments.
- **GitHub Actions Sorcery**: Automated CI/CD spells for testing and deployment.

## 🌌 Sorcery-Enabled CI/CD Pipeline

The power of CI/CD sorcery is harnessed through GitHub Actions and Heroku incantations. With every push to the `main` realm, the sorcery unfolds, running spells and deploying the enchanted API to the Heroku realm.

## 📜 The Spellbook

### Prerequisites

Before diving into the arcane world, ensure you possess the following artifacts:

- Node.js
- Docker
- Git

### 🌀 Spellcasting Instructions

1. **Summon the Repository**:

    ```bash
    git clone https://github.com/Uditsingh7/User_management_dockerisation.git
    ```

2. **Enter the Enchanted Realm**:

    ```bash
    cd User_management_dockerisation
    ```

3. **Gather the Ingredients**:

    ```bash
    npm install
    ```

### 🌌 Casting the Spell

#### 🌍 Local Sorcery

```bash
npm run start
```

The enchanted API will awaken at `http://localhost:3000`.

#### 🐳 Docker Spellcasting

```bash
docker build -t user-management-api .
docker run -p 3000:3000 user-management-api
```

### 🧪 Testing the Incantations

Invoke the tests:

```bash
npm test
```

### 📖 The  Swagger Grimoire documentation

Access the interactive spellbook at `http://localhost:3000/api-docs`.

## 🚀 The Celestial Deployment

The live enchantment is deployed on Heroku and can be accessed at [Heroku Enchantment](https://user-alchemy-5e7f69440ee9.herokuapp.com/).

## 🧙‍♂️ Conjurers' Circle

We welcome fellow conjurers to contribute! 
