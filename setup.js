#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('\n🚀 Configuration du Scraper Discord Canary\n');
  console.log('='.repeat(50));

  // Vérifier si .env existe déjà
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const overwrite = await question('\n⚠️  Un fichier .env existe déjà. Le remplacer ? (oui/non): ');
    if (overwrite.toLowerCase() !== 'oui' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Installation annulée');
      rl.close();
      return;
    }
  }

  // Récupérer les informations
  console.log('\n📝 Entrez les informations suivantes:\n');

  let token = '';
  let channelId = '';
  let valid = false;

  while (!valid) {
    token = await question('🔑 Token Discord Bot: ');
    channelId = await question('📢 ID du canal Discord: ');

    if (token && channelId) {
      valid = true;
    } else {
      console.log('❌ Les deux champs sont obligatoires!\n');
    }
  }

  // Créer le fichier .env
  const envContent = `# Configuration discrapper-canary
DISCORD_TOKEN=${token}
DISCORD_CHANNEL_ID=${channelId}

# (Optionnel) Webhook pour les notifications alternatives
# WEBHOOK_URL=
`;

  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ Fichier .env créé avec succès!\n');

  // Vérifier si node_modules existe
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    const install = await question('📦 Installer les dépendances npm? (oui/non): ');
    if (install.toLowerCase() === 'oui' || install.toLowerCase() === 'yes') {
      console.log('\n⏳ Installation en cours...');
      console.log('Exécutez: npm install\n');
    }
  }

  console.log('='.repeat(50));
  console.log('\n✅ Configuration terminée!\n');
  console.log('Prochaines étapes:');
  console.log('1. npm install (si pas déjà fait)');
  console.log('2. npm run dev (démarrer en mode développement)');
  console.log('3. Consultez SETUP.md pour plus de détails\n');

  rl.close();
}

setup().catch((error) => {
  console.error('❌ Erreur:', error);
  rl.close();
  process.exit(1);
});
