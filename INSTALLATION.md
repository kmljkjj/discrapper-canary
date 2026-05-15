# 🚀 discrapper-canary - Bot Discord Scraper

Système automatisé qui **scrape les mises à jour de Discord Canary** et les **envoie automatiquement** dans un salon Discord.

## 📖 Vue d'ensemble

```
Vérifie info.json → Détecte nouvelle build → Envoie message Discord
     ↓                    ↓                          ↓
  Toutes les 5s      Quand buildNumber         Embed coloré avec
  minutes            change                    les détails
```

## ✨ Fonctionnalités

- ✅ **Monitoring automatique** des mises à jour Canary
- ✅ **Notifications Discord** en temps réel
- ✅ **Historique des builds** préservé
- ✅ **Configuration simple** et sécurisée
- ✅ **Interface interactive** pour la première installation

## 🚀 Démarrage Rapide

### Option 1: Installation interactive (recommandée)

```bash
# Rendre le script exécutable
chmod +x install.sh

# Lancer l'installation
./install.sh

# Ou directement
npm install
node setup.js
```

### Option 2: Configuration manuelle

```bash
# Installer les dépendances
npm install

# Créer .env
cp .env.example .env

# Éditer .env avec vos données
nano .env

# Démarrer
npm start
```

## 📋 Configuration Requise

### 1. Bot Discord

```
DISCORD_TOKEN=votre_super_token_secret_ici
DISCORD_CHANNEL_ID=123456789012345678
```

[Tutoriel complet → SETUP.md](SETUP.md)

## 🎮 Commandes

```bash
npm start        # Mode production (une fois démarré)
npm run dev      # Mode développement (redémarre automatiquement)
```

## 🔍 Logs d'exécution

```
✅ Bot Discord connecté en tant que MyBot#1234
📌 Build actuel chargé: 513744
⏱️ Vérification des mises à jour chaque 5 minutes...
✔️ Pas de nouvelle mise à jour (Build: 513744)
🔔 Nouvelle mise à jour détectée!
Ancien: 513744 → Nouveau: 513745
✅ Mise à jour envoyée au canal Discord (Build: 513745)
```

## 📊 Structure des données

### info.json (source)
```json
{
  "buildNumber": "513744",
  "versionHash": "ad08768133611e9d3f00a9c4d4865ca06ec3f892",
  "builtAt": 1773948194054
}
```

### Message Discord (destination)

```
🚀 Nouvelle mise à jour Discord Canary détectée!
Une nouvelle version a été trouvée

Build Number
513744

Version Hash
ad08768...

Built At
16/04/2026, 10:30:34
```

## 🔧 Fichiers du projet

```
discrapper-canary/
├── index.js              # Bot principal
├── package.json          # Dépendances
├── setup.js              # Configuration interactive
├── install.sh            # Script d'installation
├── .env                  # Configuration (À CRÉER)
├── .env.example          # Template
├── SETUP.md              # Guide détaillé
├── info.json             # Données de build
├── strings.json          # Ressources Discord
├── chunks/               # Code Discord compilé
└── ...
```

## 🛡️ Sécurité

- ✅ `.env` est ignoré par Git (voir `.gitignore`)
- ✅ Token Discord jamais committé
- ✅ Variables d'environnement isolées
- ✅ Logs minimal pour production

## 🐛 Troubleshooting

### Le bot ne démarre pas

❌ **Erreur: "Cannot find module 'discord.js'"**
```bash
npm install
```

❌ **Erreur: "Impossible de se connecter à Discord: Invalid token"**
- Vérifiez le token dans `.env`
- Assurez-vous que c'est le lien "Copy Token" et non "Copy User Token"

### Pas de message dans le canal

❌ **Le bot est silencieux**
1. Vérifiez que le `DISCORD_CHANNEL_ID` est correct
2. Assurez-vous que le bot a la permission "Send Messages"
3. Vérifiez les logs du bot (voir console)

### Modifications non détectées

Par défaut, le bot scrape toutes les **5 minutes**. Pour modifier:

[Éditer index.js ligne 80](index.js#L80):
```javascript
// Changer 5 * 60 * 1000 (5 minutes)
setInterval(checkForUpdates, 1 * 60 * 1000); // 1 minute
```

## 📦 Dépendances

- **discord.js**: ^14.14.0 - Library Discord officielle
- **dotenv**: ^16.3.1 - Gestion des variables d'environnement

## 📝 Licence

Voir le [README original](README.md) pour les informations de licence Discord.

## 🤝 Support

Consultez SETUP.md ou posez une question !

---

**Dernière mise à jour:** 16 April 2026
