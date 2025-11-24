/**
 * Serviço de Armazenamento Local
 * Implementa RN05: Histórico de 24 meses
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  constructor() {
    this.KEYS = {
      DAILY_RECORDS: '@carbon_calculator:daily_records',
      USER_PROFILE: '@carbon_calculator:user_profile',
      SETTINGS: '@carbon_calculator:settings'
    };
    this.MAX_MONTHS = 24; // RN05: Manter dados por 24 meses
  }

  /**
   * Salva um registro diário
   */
  async saveDailyRecord(record) {
    try {
      const records = await this.getDailyRecords();
      const newRecords = [...records, { ...record, id: Date.now().toString() }];
      
      // Limpar registros antigos (> 24 meses)
      const cleanedRecords = this.cleanOldRecords(newRecords);
      
      await AsyncStorage.setItem(
        this.KEYS.DAILY_RECORDS,
        JSON.stringify(cleanedRecords)
      );
      return true;
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      return false;
    }
  }

  /**
   * Obtém todos os registros diários
   */
  async getDailyRecords() {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.DAILY_RECORDS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao obter registros:', error);
      return [];
    }
  }

  /**
   * Obtém registros de um mês específico
   */
  async getRecordsByMonth(year, month) {
    try {
      const records = await this.getDailyRecords();
      return records.filter(record => {
        const date = new Date(record.date);
        return date.getFullYear() === year && date.getMonth() === month;
      });
    } catch (error) {
      console.error('Erro ao obter registros do mês:', error);
      return [];
    }
  }

  /**
   * Remove registros mais antigos que 24 meses (RN05)
   */
  cleanOldRecords(records) {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - this.MAX_MONTHS);
    
    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= cutoffDate;
    });
  }

  /**
   * Obtém dados para comparação mensal
   */
  async getMonthlyComparison(months = 6) {
    try {
      const records = await this.getDailyRecords();
      const monthlyData = {};

      // Agrupar por mês
      records.forEach(record => {
        const date = new Date(record.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[key]) {
          monthlyData[key] = {
            total: 0,
            count: 0,
            breakdown: {
              transport_land: 0,
              transport_air: 0,
              energy: 0,
              gas: 0,
              domestic_activities: 0,
              waste: 0
            }
          };
        }

        monthlyData[key].total += record.emissions.total;
        monthlyData[key].count += 1;
        
        Object.keys(record.emissions.breakdown).forEach(category => {
          monthlyData[key].breakdown[category] += record.emissions.breakdown[category];
        });
      });

      // Converter para array e ordenar
      const sortedData = Object.entries(monthlyData)
        .map(([key, value]) => ({ month: key, ...value }))
        .sort((a, b) => b.month.localeCompare(a.month))
        .slice(0, months);

      return sortedData.reverse();
    } catch (error) {
      console.error('Erro ao obter comparação mensal:', error);
      return [];
    }
  }

  /**
   * Exporta dados para CSV
   */
  async exportToCSV() {
    try {
      const records = await this.getDailyRecords();
      
      let csv = 'Data,Total CO₂ (kg),Transporte Terrestre,Transporte Aéreo,Energia,Gás,Atividades Domésticas,Resíduos/Reciclagem\n';
      
      records.forEach(record => {
        csv += `${record.date},${record.emissions.total},`;
        csv += `${record.emissions.breakdown.transport_land},`;
        csv += `${record.emissions.breakdown.transport_air},`;
        csv += `${record.emissions.breakdown.energy},`;
        csv += `${record.emissions.breakdown.gas},`;
        csv += `${record.emissions.breakdown.domestic_activities || 0},`;
        csv += `${record.emissions.breakdown.waste || 0}\n`;
      });
      
      return csv;
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      return null;
    }
  }

  /**
   * Limpa todos os dados
   */
  async clearAllData() {
    try {
      await AsyncStorage.removeItem(this.KEYS.DAILY_RECORDS);
      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }
  }
}

export default new StorageService();
