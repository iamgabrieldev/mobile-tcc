import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  updateDoc,
  increment
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Serviço de Pontos e Ranking
 * Gerencia pontos dos usuários baseado na redução de emissões de carbono
 */

class PointsService {
  constructor() {
    this.STORAGE_KEY = '@carbon_calculator:user_points';
    this.useLocalStorage = false; // Flag para fallback
  }

  /**
   * Verifica se o Firestore está disponível
   */
  async checkFirestoreAvailability() {
    try {
      // Tenta uma operação simples para verificar conectividade
      await getDocs(query(collection(db, 'userPoints'), limit(1)));
      this.useLocalStorage = false;
      return true;
    } catch (error) {
      console.warn('Firestore indisponível, usando armazenamento local:', error.message);
      this.useLocalStorage = true;
      return false;
    }
  }
  /**
   * Calcula pontos baseado na redução de emissões
   * Quanto maior a redução, mais pontos
   * @param {number} previousEmission - Emissão anterior em kg CO₂
   * @param {number} currentEmission - Emissão atual em kg CO₂
   * @returns {number} Pontos ganhos
   */
  calculatePoints(previousEmission, currentEmission) {
    const reduction = previousEmission - currentEmission;
    
    // Se houve redução, ganha pontos proporcionais
    if (reduction > 0) {
      // 10 pontos por kg de CO₂ reduzido
      return Math.round(reduction * 10);
    }
    
    // Se aumentou, perde metade dos pontos
    if (reduction < 0) {
      return Math.round(reduction * 5);
    }
    
    // Se manteve igual, ganha 1 ponto por participação
    return 1;
  }

  /**
   * Adiciona pontos ao usuário (com fallback local)
   * @param {string} userId - ID do usuário
   * @param {number} points - Pontos a adicionar
   * @param {number} emission - Emissão atual
   * @param {string} period - 'daily' ou 'weekly'
   */
  async addPoints(userId, points, emission, period = 'daily') {
    try {
      // Tentar usar Firestore primeiro
      const userPointsRef = doc(db, 'userPoints', userId);
      const userPointsDoc = await getDoc(userPointsRef);

      if (userPointsDoc.exists()) {
        await updateDoc(userPointsRef, {
          totalPoints: increment(points),
          lastEmission: emission,
          lastUpdate: Timestamp.now(),
          [`${period}Points`]: increment(points)
        });
      } else {
        await setDoc(userPointsRef, {
          userId,
          totalPoints: points,
          dailyPoints: period === 'daily' ? points : 0,
          weeklyPoints: period === 'weekly' ? points : 0,
          lastEmission: emission,
          lastUpdate: Timestamp.now(),
          createdAt: Timestamp.now()
        });
      }

      // Registrar histórico
      await this.addPointsHistory(userId, points, emission, period);

      return { success: true, points };
    } catch (error) {
      console.error('Erro ao adicionar pontos no Firestore, usando armazenamento local:', error);
      
      // Fallback para armazenamento local
      return await this.addPointsLocal(userId, points, emission, period);
    }
  }

  /**
   * Adiciona pontos localmente (fallback)
   */
  async addPointsLocal(userId, points, emission, period = 'daily') {
    try {
      const localData = await this.getLocalPoints(userId);
      
      const updatedData = {
        userId,
        totalPoints: (localData.totalPoints || 0) + points,
        dailyPoints: period === 'daily' ? (localData.dailyPoints || 0) + points : (localData.dailyPoints || 0),
        weeklyPoints: period === 'weekly' ? (localData.weeklyPoints || 0) + points : (localData.weeklyPoints || 0),
        lastEmission: emission,
        lastUpdate: new Date().toISOString()
      };

      await AsyncStorage.setItem(
        `${this.STORAGE_KEY}_${userId}`,
        JSON.stringify(updatedData)
      );

      return { success: true, points, local: true };
    } catch (error) {
      console.error('Erro ao adicionar pontos localmente:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtém pontos locais
   */
  async getLocalPoints(userId) {
    try {
      const data = await AsyncStorage.getItem(`${this.STORAGE_KEY}_${userId}`);
      return data ? JSON.parse(data) : { totalPoints: 0, dailyPoints: 0, weeklyPoints: 0, lastEmission: 0 };
    } catch (error) {
      return { totalPoints: 0, dailyPoints: 0, weeklyPoints: 0, lastEmission: 0 };
    }
  }

  /**
   * Registra histórico de pontos
   * @param {string} userId - ID do usuário
   * @param {number} points - Pontos ganhos/perdidos
   * @param {number} emission - Emissão registrada
   * @param {string} period - Período
   */
  async addPointsHistory(userId, points, emission, period) {
    try {
      const historyRef = collection(db, 'pointsHistory');
      await setDoc(doc(historyRef), {
        userId,
        points,
        emission,
        period,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      console.error('Erro ao adicionar histórico de pontos:', error);
    }
  }

  /**
   * Obtém pontos de um usuário (com fallback local)
   * @param {string} userId - ID do usuário
   * @returns {Object} Dados de pontos do usuário
   */
  async getUserPoints(userId) {
    try {
      const userPointsRef = doc(db, 'userPoints', userId);
      const userPointsDoc = await getDoc(userPointsRef);

      if (userPointsDoc.exists()) {
        return { success: true, data: userPointsDoc.data() };
      } else {
        return { 
          success: true, 
          data: { 
            totalPoints: 0, 
            dailyPoints: 0, 
            weeklyPoints: 0,
            lastEmission: 0 
          } 
        };
      }
    } catch (error) {
      console.error('Erro ao obter pontos do Firestore, usando dados locais:', error);
      
      // Fallback para dados locais
      const localData = await this.getLocalPoints(userId);
      return { 
        success: true, 
        data: localData,
        local: true 
      };
    }
  }

  /**
   * Obtém ranking global de usuários
   * @param {number} limitCount - Número de usuários a retornar
   * @param {string} period - 'total', 'daily' ou 'weekly'
   * @returns {Array} Lista de usuários ordenados por pontos
   */
  async getRanking(limitCount = 100, period = 'total') {
    try {
      const orderField = period === 'total' ? 'totalPoints' : 
                         period === 'daily' ? 'dailyPoints' : 'weeklyPoints';

      const q = query(
        collection(db, 'userPoints'),
        orderBy(orderField, 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const ranking = [];

      // Buscar informações dos usuários
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const doc = querySnapshot.docs[i];
        const pointsData = doc.data();
        
        // Buscar email do usuário
        const userEmail = await this.getUserEmail(pointsData.userId);
        
        ranking.push({
          position: i + 1,
          userId: pointsData.userId,
          email: userEmail || 'Usuário',
          totalPoints: pointsData.totalPoints || 0,
          dailyPoints: pointsData.dailyPoints || 0,
          weeklyPoints: pointsData.weeklyPoints || 0,
          lastEmission: pointsData.lastEmission || 0
        });
      }

      return { success: true, data: ranking };
    } catch (error) {
      console.error('Erro ao obter ranking do Firestore:', error);
      
      // Retornar lista vazia se não conseguir conectar
      return { 
        success: true, 
        data: [],
        message: 'Ranking não disponível no momento. Verifique sua conexão com a internet.',
        offline: true
      };
    }
  }

  /**
   * Obtém posição de um usuário no ranking
   * @param {string} userId - ID do usuário
   * @param {string} period - 'total', 'daily' ou 'weekly'
   * @returns {Object} Posição e pontos do usuário
   */
  async getUserRank(userId, period = 'total') {
    try {
      const orderField = period === 'total' ? 'totalPoints' : 
                         period === 'daily' ? 'dailyPoints' : 'weeklyPoints';

      const userPoints = await this.getUserPoints(userId);
      if (!userPoints.success) {
        return userPoints;
      }

      const userPointsValue = userPoints.data[orderField] || 0;

      // Contar quantos usuários têm mais pontos
      const q = query(
        collection(db, 'userPoints'),
        where(orderField, '>', userPointsValue)
      );

      const querySnapshot = await getDocs(q);
      const position = querySnapshot.size + 1;

      return { 
        success: true, 
        data: {
          position,
          points: userPointsValue,
          totalUsers: querySnapshot.size + 1
        }
      };
    } catch (error) {
      console.error('Erro ao obter posição no ranking:', error);
      
      // Fallback com dados locais
      const localData = await this.getLocalPoints(userId);
      const orderField = period === 'total' ? 'totalPoints' : 
                         period === 'daily' ? 'dailyPoints' : 'weeklyPoints';
      
      return { 
        success: true, 
        data: {
          position: 1,
          points: localData[orderField] || 0,
          totalUsers: 1
        },
        local: true,
        message: 'Posição não disponível offline'
      };
    }
  }

  /**
   * Reseta pontos diários (deve ser executado diariamente)
   */
  async resetDailyPoints() {
    try {
      const q = query(collection(db, 'userPoints'));
      const querySnapshot = await getDocs(q);

      const updatePromises = querySnapshot.docs.map(doc => 
        updateDoc(doc.ref, { dailyPoints: 0 })
      );

      await Promise.all(updatePromises);
      return { success: true };
    } catch (error) {
      console.error('Erro ao resetar pontos diários:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Reseta pontos semanais (deve ser executado semanalmente)
   */
  async resetWeeklyPoints() {
    try {
      const q = query(collection(db, 'userPoints'));
      const querySnapshot = await getDocs(q);

      const updatePromises = querySnapshot.docs.map(doc => 
        updateDoc(doc.ref, { weeklyPoints: 0 })
      );

      await Promise.all(updatePromises);
      return { success: true };
    } catch (error) {
      console.error('Erro ao resetar pontos semanais:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtém email do usuário (helper)
   * @param {string} userId - ID do usuário
   * @returns {string} Email do usuário
   */
  async getUserEmail(userId) {
    try {
      // Aqui você pode buscar de uma coleção de perfis de usuários
      // Por enquanto, retornamos apenas o ID truncado
      return userId.substring(0, 8) + '...';
    } catch (error) {
      return 'Usuário';
    }
  }
}

export default new PointsService();

