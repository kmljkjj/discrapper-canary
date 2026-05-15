# 🤖 Configuration et Démarrage du Scraper Discord

## ✅ Fichiers créés

Le système est maintenant prêt avec :
- ✅ `index.js` - Bot principal qui vérifie les mises à jour
- ✅ `package.json` - Dépendances NPM
- ✅ `.env.example` - Template des variables d'environnement
- ✅ `.gitignore` - Pour éviter de committer les secrets

## 📋 Étapes pour démarrer

### 1️⃣ Créer un bot Discord
1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Cliquez sur "New Application"
3. Donnez-lui un nom (ex: "discrapper-canary")
4. Aller dans "Bot" → "Add Bot"
5. Copiez le token sous "TOKEN"

### 2️⃣ Configurer les permissions
- Aller dans "OAuth2" → "URL Generator"
- Scopes: `bot`
- Permissions: `Send Messages`, `Embed Links`, `Read Message History`
- Copiez l'URL générée et ouvrez-la pour inviter le bot à votre serveur

### 3️⃣ Créer le fichier .env
Créez un fichier `./.env` et ajoutez :

\`\`\`
DISCORD_TOKEN=votre_token_du_bot_ici
DISCORD_CHANNEL_ID=votre_id_de_canal_ici
\`\`\`

**Comment obtenir l'ID du canal:**
- Activez le "Mode Développeur" dans Discord
- Clic droit sur le canal → "Copy Channel ID"

### 4️⃣ Installer et lancer

\`\`\`bash
# Installation des dépendances
npm install

# Lancer en mode dev (redémarre auto)
npm run dev

# Lancer en production
npm start
\`\`\`

## 🚀 Fonctionnement

- Le bot se connecte à Discord
- Charge le dernier build number depuis `info.json`
- **Vérifie toutes les 5 minutes** si une nouvelle version est disponible
- **Envoie un message** au canal Discord quand une mise à jour est détectée

## 📊 Exemple de message Discord

```
🚀 Nouvelle mise à jour Discord Canary détectée!
Une nouvelle version a été trouvée

Build Number: 513744
Version Hash: ad08768...
Built At: 16/04/2026, 10:30:34
```

## 🔧 Personnalisation

- Modifiez l'intervalle de vérification dans `index.js` ligne 80 (actuellement 5 minutes)
- Personnalisez le message embed pour les mises à jour
- Ajoutez des filtres si vous voulez seulement notifier certaines builds

## ⚠️ Troubleshooting

**"Token invalide"** → Vérifiez que le token est correct dans `.env`

**"Canal non trouvé"** → Vérifiez l'ID du canal dans `.env`

**"Pas de message"** → Assurez-vous que le bot a les permissions dans le canal

---

**Création du système:** 16 April 2026
