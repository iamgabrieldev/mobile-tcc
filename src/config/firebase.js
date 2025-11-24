/**
 * Configuração do Firebase
 * IMPORTANTE: Renomeie este arquivo para firebase.js e adicione suas credenciais
 * Nunca commite o arquivo firebase.js com suas credenciais reais
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQWmMZu-Q12cSyIaghO311UIgstlJLRh0",
    authDomain: "calculadora-tcc.firebaseapp.com",
    projectId: "calculadora-tcc",
    storageBucket: "calculadora-tcc.firebasestorage.app",
    messagingSenderId: "105815371555",
    appId: "1:105815371555:web:b62f122ffe5a2a6e14e696",
    measurementId: "G-DSZCX8TP00"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);

// Inicializar Firestore com configuração de persistência offline
let db;
try {
    db = initializeFirestore(app, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
    });
} catch (error) {
    // Se já foi inicializado, apenas obter a instância
    db = getFirestore(app);
}

export { db };
export default app;

