#!/bin/bash

echo "🚀 Installation du Scraper Discord Canary"
echo "========================================"
echo ""

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé!"
    echo "Installez Node.js depuis https://nodejs.org"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances npm..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dépendances installées avec succès!"
    echo ""
    echo "🔧 Lancer la configuration interactive..."
    node setup.js
else
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi
