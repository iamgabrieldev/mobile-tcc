import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import EmissionCard from '../components/EmissionCard';
import Card from '../components/Card';
import Button from '../components/Button';
import TreeCompensationCard from '../components/TreeCompensationCard';
import storageService from '../services/storageService';
import treeService from '../services/treeService';
import { COLORS } from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const { user, logout, isEmailVerified } = useAuth();
  const [todayEmissions, setTodayEmissions] = useState(null);
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);
  const [treesNeeded, setTreesNeeded] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const records = await storageService.getDailyRecords();
      const today = new Date().toDateString();
      const todayRecord = records.find(r => new Date(r.date).toDateString() === today);
      
      setTodayEmissions(todayRecord?.emissions || null);

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const monthRecords = await storageService.getRecordsByMonth(currentYear, currentMonth);
      
      const monthTotal = monthRecords.reduce((sum, r) => sum + r.emissions.total, 0);
      setMonthlyEmissions(monthTotal);

      // Calcular árvores necessárias para compensar emissões mensais
      if (monthTotal > 0) {
        const treeData = treeService.calculateTreesForMonthly(monthTotal);
        setTreesNeeded(treeData);
      } else {
        setTreesNeeded(null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const getPercentage = (value, total) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá! 👋</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <Button
          title="Sair"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
          textStyle={styles.logoutText}
        />
      </View>

      {!isEmailVerified() && (
        <Card style={styles.warningCard}>
          <View style={styles.warningContent}>
            <MaterialCommunityIcons name="alert-circle" size={24} color={COLORS.warning} />
            <View style={styles.warningText}>
              <Text style={styles.warningTitle}>E-mail não verificado</Text>
              <Text style={styles.warningSubtitle}>
                Por favor, verifique seu e-mail para acesso completo
              </Text>
            </View>
          </View>
        </Card>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emissões de Hoje</Text>
        {todayEmissions ? (
          <>
            <Card style={styles.totalCard}>
              <MaterialCommunityIcons name="leaf" size={48} color={COLORS.primary} />
              <Text style={styles.totalLabel}>Total de CO₂</Text>
              <Text style={styles.totalValue}>{todayEmissions.total}</Text>
              <Text style={styles.totalUnit}>kg CO₂</Text>
            </Card>

            <View style={styles.cardsRow}>
              <EmissionCard
                icon="car"
                title="Transporte Terrestre"
                value={todayEmissions.breakdown.transport_land}
                unit="kg"
                color={COLORS.chart.transport}
                percentage={getPercentage(todayEmissions.breakdown.transport_land, todayEmissions.total)}
              />
              <EmissionCard
                icon="airplane"
                title="Transporte Aéreo"
                value={todayEmissions.breakdown.transport_air}
                unit="kg"
                color={COLORS.chart.air}
                percentage={getPercentage(todayEmissions.breakdown.transport_air, todayEmissions.total)}
              />
            </View>

            <View style={styles.cardsRow}>
              <EmissionCard
                icon="lightning-bolt"
                title="Energia"
                value={todayEmissions.breakdown.energy}
                unit="kg"
                color={COLORS.chart.energy}
                percentage={getPercentage(todayEmissions.breakdown.energy, todayEmissions.total)}
              />
              <EmissionCard
                icon="fire"
                title="Gás"
                value={todayEmissions.breakdown.gas}
                unit="kg"
                color={COLORS.chart.gas}
                percentage={getPercentage(todayEmissions.breakdown.gas, todayEmissions.total)}
              />
            </View>

            {(todayEmissions.breakdown.domestic_activities > 0 || todayEmissions.breakdown.waste !== 0) && (
              <View style={styles.cardsRow}>
                {todayEmissions.breakdown.domestic_activities > 0 && (
                  <EmissionCard
                    icon="home"
                    title="Atividades Domésticas"
                    value={todayEmissions.breakdown.domestic_activities}
                    unit="kg"
                    color={COLORS.chart.domestic}
                    percentage={getPercentage(todayEmissions.breakdown.domestic_activities, todayEmissions.total)}
                  />
                )}
                {todayEmissions.breakdown.waste !== 0 && (
                  <EmissionCard
                    icon="recycle"
                    title="Resíduos/Reciclagem"
                    value={todayEmissions.breakdown.waste}
                    unit="kg"
                    color={COLORS.chart.waste}
                    percentage={getPercentage(Math.abs(todayEmissions.breakdown.waste), todayEmissions.total)}
                  />
                )}
              </View>
            )}
          </>
        ) : (
          <Card style={styles.emptyCard}>
            <MaterialCommunityIcons name="calendar-plus" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Nenhum registro hoje</Text>
            <Button
              title="Registrar Consumo"
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
            />
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo Mensal</Text>
        <Card>
          <View style={styles.monthlyCard}>
            <MaterialCommunityIcons name="calendar-month" size={32} color={COLORS.primary} />
            <View style={styles.monthlyInfo}>
              <Text style={styles.monthlyLabel}>Total do mês</Text>
              <Text style={styles.monthlyValue}>{monthlyEmissions.toFixed(2)} kg CO₂</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Compensação por Árvores */}
      {monthlyEmissions > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌳 Compensação Ambiental</Text>
          <TreeCompensationCard treesData={treesNeeded} />
        </View>
      )}

      <View style={styles.actions}>
        <Button
          title="Registrar Novo Consumo"
          onPress={() => navigation.navigate('Register')}
          style={styles.actionButton}
        />
        <Button
          title="Ver Relatórios"
          onPress={() => navigation.navigate('Reports')}
          variant="outline"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  logoutText: {
    fontSize: 14,
  },
  warningCard: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#FFF9E6',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    marginLeft: 12,
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  warningSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  totalCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  totalValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8,
  },
  totalUnit: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 12,
    marginBottom: 20,
  },
  registerButton: {
    minWidth: 200,
  },
  monthlyCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthlyInfo: {
    marginLeft: 16,
    flex: 1,
  },
  monthlyLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  monthlyValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  actions: {
    padding: 20,
    paddingTop: 0,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default HomeScreen;
