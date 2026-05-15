import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let lastBuildNumber = null;

// Charger le dernier numéro de build connu
function loadLastBuildNumber() {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'info.json'), 'utf8'));
    return data.buildNumber;
  } catch (error) {
    console.error('Erreur lors du chargement de info.json:', error);
    return null;
  }
}

// Envoyer les informations au canal Discord
async function sendUpdate(buildInfo) {
  try {
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    if (!channel) {
      console.error('Canal Discord non trouvé');
      return;
    }

    const embed = {
      title: '🚀 Nouvelle mise à jour Discord Canary détectée!',
      description: `Une nouvelle version a été trouvée`,
      fields: [
        {
          name: 'Build Number',
          value: buildInfo.buildNumber,
          inline: true
        },
        {
          name: 'Version Hash',
          value: buildInfo.versionHash.substring(0, 8) + '...',
          inline: true
        },
        {
          name: 'Built At',
          value: new Date(parseInt(buildInfo.builtAt)).toLocaleString('fr-FR'),
          inline: false
        }
      ],
      color: 0x5865F2, // Couleur Discord
      timestamp: new Date()
    };

    await channel.send({ embeds: [embed] });
    console.log(`✅ Mise à jour envoyée au canal Discord (Build: ${buildInfo.buildNumber})`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message Discord:', error);
  }
}

// Vérifier les mises à jour
async function checkForUpdates() {
  try {
    const buildInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'info.json'), 'utf8'));
    
    if (lastBuildNumber === null) {
      lastBuildNumber = buildInfo.buildNumber;
      console.log(`📌 Build actuel chargé: ${lastBuildNumber}`);
      return;
    }

    if (buildInfo.buildNumber !== lastBuildNumber) {
      console.log(`🔔 Nouvelle mise à jour détectée!`);
      console.log(`Ancien: ${lastBuildNumber} -> Nouveau: ${buildInfo.buildNumber}`);
      await sendUpdate(buildInfo);
      lastBuildNumber = buildInfo.buildNumber;
    } else {
      console.log(`✔️ Pas de nouvelle mise à jour (Build: ${buildInfo.buildNumber})`);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des mises à jour:', error);
  }
}

client.on('ready', () => {
  console.log(`✅ Bot Discord connecté en tant que ${client.user.tag}`);
  
  // Charger le dernier build
  lastBuildNumber = loadLastBuildNumber();
  
  // Vérifier les mises à jour immédiatement
  checkForUpdates();
  
  // Vérifier toutes les 5 minutes (300000 ms)
  setInterval(checkForUpdates, 5 * 60 * 1000);
  console.log('⏱️ Vérification des mises à jour chaque 5 minutes...');
});

client.on('error', error => {
  console.error('Erreur Discord.js:', error);
});

// Connexion Discord
try {
  await client.login(process.env.DISCORD_TOKEN);
} catch (error) {
  console.error('❌ Impossibile de se connecter à Discord:', error.message);
  process.exit(1);
}
