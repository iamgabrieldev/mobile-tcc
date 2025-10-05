/**
 * Script para preparar release
 * Executa checklist antes de fazer build para produção
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparando Release para Play Store\n');

// Verificar arquivos essenciais
const checks = [
  {
    name: 'App.js existe',
    check: () => fs.existsSync('App.js')
  },
  {
    name: 'package.json configurado',
    check: () => fs.existsSync('package.json')
  },
  {
    name: 'app.json configurado',
    check: () => {
      if (!fs.existsSync('app.json')) return false;
      const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
      return appJson.expo.android.package && appJson.expo.version;
    }
  },
  {
    name: 'Firebase configurado',
    check: () => fs.existsSync('src/config/firebase.js')
  },
  {
    name: 'Assets presentes',
    check: () => {
      return fs.existsSync('assets/icon.png') && 
             fs.existsSync('assets/splash.png');
    }
  }
];

let allPassed = true;

checks.forEach(check => {
  const passed = check.check();
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
  if (!passed) allPassed = false;
});

console.log('\n');

if (allPassed) {
  console.log('✅ Tudo pronto! Você pode executar:');
  console.log('   npm run build:android\n');
  
  // Mostrar informações da versão
  const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
  console.log(`📦 Versão: ${appJson.expo.version}`);
  console.log(`📱 Package: ${appJson.expo.android.package}`);
  console.log(`🔢 Version Code: ${appJson.expo.android.versionCode}\n`);
  
  console.log('📋 Próximos passos:');
  console.log('   1. eas build --platform android --profile production');
  console.log('   2. Aguarde o build finalizar');
  console.log('   3. Baixe o arquivo .aab');
  console.log('   4. Faça upload no Play Console\n');
  
  process.exit(0);
} else {
  console.log('❌ Alguns itens precisam ser corrigidos antes do build.');
  console.log('   Consulte: DEPLOY_PLAYSTORE.md\n');
  process.exit(1);
}

