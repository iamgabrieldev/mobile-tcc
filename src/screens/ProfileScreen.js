import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import geminiService from '../services/geminiService';
import pointsService from '../services/pointsService';
import treeService from '../services/treeService';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  const [userStats, setUserStats] = useState({
    totalEmissions: 0,
    transportEmissions: 0,
    energyEmissions: 0,
    gasEmissions: 0,
    totalPoints: 0,
    treesNeeded: 0
  });
  
  const [analysis, setAnalysis] = useState(null);
  const [treesData, setTreesData] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);

      if (!user) return;

      // Carregar emissões do último mês
      const emissions = await loadUserEmissions();
      
      // Carregar pontos
      const pointsResult = await pointsService.getUserPoints(user.uid);
      const points = pointsResult.success ? pointsResult.data : { totalPoints: 0 };

      // Calcular árvores necessárias
      const trees = treeService.calculateTreesForMonthly(emissions.total);

      setUserStats({
        totalEmissions: emissions.total,
        transportEmissions: emissions.transport,
        energyEmissions: emissions.energy,
        gasEmissions: emissions.gas,
        totalPoints: points.totalPoints || 0,
        treesNeeded: trees.treesRounded
      });

      setTreesData(trees);

    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadUserEmissions = async () => {
    try {
      // Buscar emissões dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const q = query(
        collection(db, 'emissions'),
        where('userId', '==', user.uid),
        where('date', '>=', thirtyDaysAgo),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      let totalEmissions = 0;
      let transportEmissions = 0;
      let energyEmissions = 0;
      let gasEmissions = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.emissions) {
          totalEmissions += data.emissions.total || 0;
          transportEmissions += (data.emissions.breakdown?.transport_land || 0) + 
                                (data.emissions.breakdown?.transport_air || 0);
          energyEmissions += data.emissions.breakdown?.energy || 0;
          gasEmissions += data.emissions.breakdown?.gas || 0;
        }
      });

      return {
        total: totalEmissions,
        transport: transportEmissions,
        energy: energyEmissions,
        gas: gasEmissions
      };
    } catch (error) {
      console.error('Erro ao carregar emissões:', error);
      return { total: 0, transport: 0, energy: 0, gas: 0 };
    }
  };

  const analyzeHabits = async () => {
    try {
      setAnalyzing(true);

      const userData = {
        totalEmissions: userStats.totalEmissions,
        transportEmissions: userStats.transportEmissions,
        energyEmissions: userStats.energyEmissions,
        gasEmissions: userStats.gasEmissions,
        period: 'mensal',
        previousEmissions: userStats.totalEmissions * 1.1 // Simulação de período anterior
      };

      const result = await geminiService.analyzeHabits(userData);

      if (result.success) {
        setAnalysis(result.analysis);
      } else if (result.mockData) {
        setAnalysis(result.mockData);
        if (result.error && result.error.includes('API Key')) {
          Alert.alert(
            'Configure a API Key',
            'Para ter análises personalizadas com IA, configure sua API Key do Gemini Pro.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Configurar', onPress: () => setShowApiKeyInput(true) }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Erro ao analisar hábitos:', error);
      Alert.alert('Erro', 'Não foi possível analisar seus hábitos. Tente novamente.');
    } finally {
      setAnalyzing(false);
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      geminiService.setApiKey(apiKey.trim());
      setShowApiKeyInput(false);
      Alert.alert('Sucesso', 'API Key configurada! Agora você pode obter análises personalizadas.');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProfileData();
  };

  const renderStatsCard = () => (
    <Card style={styles.statsCard}>
      <Text style={styles.cardTitle}>📊 Suas Estatísticas</Text>
      
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="cloud" size={24} color={COLORS.error} />
          <Text style={styles.statValue}>{userStats.totalEmissions.toFixed(2)}</Text>
          <Text style={styles.statLabel}>kg CO₂/mês</Text>
        </View>
        
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="trophy" size={24} color={COLORS.primary} />
          <Text style={styles.statValue}>{userStats.totalPoints}</Text>
          <Text style={styles.statLabel}>Pontos</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.breakdownRow}>
        <View style={styles.breakdownItem}>
          <MaterialCommunityIcons name="car" size={20} color={COLORS.textSecondary} />
          <Text style={styles.breakdownText}>Transporte: {userStats.transportEmissions.toFixed(2)} kg</Text>
        </View>
        
        <View style={styles.breakdownItem}>
          <MaterialCommunityIcons name="lightning-bolt" size={20} color={COLORS.textSecondary} />
          <Text style={styles.breakdownText}>Energia: {userStats.energyEmissions.toFixed(2)} kg</Text>
        </View>
        
        <View style={styles.breakdownItem}>
          <MaterialCommunityIcons name="fire" size={20} color={COLORS.textSecondary} />
          <Text style={styles.breakdownText}>Gás: {userStats.gasEmissions.toFixed(2)} kg</Text>
        </View>
      </View>
    </Card>
  );

  const renderTreesCard = () => {
    if (!treesData) return null;

    return (
      <Card style={styles.treesCard}>
        <Text style={styles.cardTitle}>🌳 Compensação com Árvores</Text>
        
        <View style={styles.treesContent}>
          <View style={styles.treesIconContainer}>
            <Text style={styles.treesIcon}>🌲</Text>
            <Text style={styles.treesNumber}>{treesData.treesRounded}</Text>
          </View>
          
          <Text style={styles.treesMessage}>
            árvore{treesData.treesRounded !== 1 ? 's' : ''} necessária{treesData.treesRounded !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.treesSubtext}>
            para compensar suas emissões anuais
          </Text>
        </View>

        <View style={styles.treesInfo}>
          <MaterialCommunityIcons name="information" size={16} color={COLORS.textSecondary} />
          <Text style={styles.treesInfoText}>
            Uma árvore absorve ~{treesData.co2PerTree} kg CO₂/ano
          </Text>
        </View>

        {treesData.message && (
          <View style={styles.motivationBox}>
            <Text style={styles.motivationText}>{treesData.message}</Text>
          </View>
        )}
      </Card>
    );
  };

  const renderAnalysisCard = () => {
    if (!analysis) {
      return (
        <Card style={styles.analysisCard}>
          <Text style={styles.cardTitle}>🤖 Análise de Hábitos por IA</Text>
          <Text style={styles.analysisDescription}>
            Obtenha insights personalizados sobre seus hábitos e descubra onde você pode melhorar!
          </Text>
          
          <Button
            title={analyzing ? "Analisando..." : "Analisar Meus Hábitos"}
            onPress={analyzeHabits}
            disabled={analyzing}
            style={styles.analyzeButton}
          />
          
          {analyzing && (
            <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
          )}
        </Card>
      );
    }

    return (
      <Card style={styles.analysisCard}>
        <View style={styles.analysisHeader}>
          <Text style={styles.cardTitle}>🤖 Análise de Hábitos</Text>
          <TouchableOpacity onPress={analyzeHabits} disabled={analyzing}>
            <MaterialCommunityIcons 
              name="refresh" 
              size={24} 
              color={analyzing ? COLORS.textSecondary : COLORS.primary} 
            />
          </TouchableOpacity>
        </View>

        {analysis.message && (
          <View style={styles.warningBox}>
            <MaterialCommunityIcons name="information" size={16} color={COLORS.primary} />
            <Text style={styles.warningText}>{analysis.message}</Text>
          </View>
        )}

        <View style={styles.analysisSection}>
          <Text style={styles.analysisSectionTitle}>💡 Resumo</Text>
          <Text style={styles.analysisText}>{analysis.summary}</Text>
        </View>

        {analysis.strengths && analysis.strengths.length > 0 && (
          <View style={styles.analysisSection}>
            <Text style={styles.analysisSectionTitle}>✅ Pontos Fortes</Text>
            {analysis.strengths.map((strength, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemText}>{strength}</Text>
              </View>
            ))}
          </View>
        )}

        {analysis.improvements && analysis.improvements.length > 0 && (
          <View style={styles.analysisSection}>
            <Text style={styles.analysisSectionTitle}>📈 Áreas de Melhoria</Text>
            {analysis.improvements.map((improvement, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemText}>{improvement}</Text>
              </View>
            ))}
          </View>
        )}

        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <View style={styles.analysisSection}>
            <Text style={styles.analysisSectionTitle}>🎯 Recomendações</Text>
            {analysis.recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                {typeof rec === 'string' ? (
                  <>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listItemText}>{rec}</Text>
                  </>
                ) : (
                  <>
                    <View style={styles.recommendationHeader}>
                      <Text style={styles.recommendationAction}>{rec.action}</Text>
                      <View style={styles.impactBadge}>
                        <Text style={styles.impactText}>{rec.impact}</Text>
                      </View>
                    </View>
                    {rec.reduction && (
                      <Text style={styles.recommendationReduction}>
                        Redução esperada: {rec.reduction}
                      </Text>
                    )}
                  </>
                )}
              </View>
            ))}
          </View>
        )}

        {analysis.goal && (
          <View style={styles.goalBox}>
            <MaterialCommunityIcons name="flag-checkered" size={20} color={COLORS.primary} />
            <Text style={styles.goalText}>{analysis.goal}</Text>
          </View>
        )}
      </Card>
    );
  };

  const renderApiKeyInput = () => {
    if (!showApiKeyInput) return null;

    return (
      <Card style={styles.apiKeyCard}>
        <Text style={styles.cardTitle}>🔑 Configurar API Key</Text>
        <Text style={styles.apiKeyDescription}>
          Para obter análises personalizadas, configure sua API Key do Google Gemini Pro.
        </Text>
        
        <TextInput
          style={styles.apiKeyInput}
          placeholder="Cole sua API Key aqui"
          value={apiKey}
          onChangeText={setApiKey}
          secureTextEntry
        />
        
        <View style={styles.apiKeyButtons}>
          <Button
            title="Cancelar"
            onPress={() => {
              setShowApiKeyInput(false);
              setApiKey('');
            }}
            variant="outline"
            style={styles.apiKeyButton}
          />
          <Button
            title="Salvar"
            onPress={saveApiKey}
            style={styles.apiKeyButton}
          />
        </View>
        
        <Text style={styles.apiKeyInfo}>
          Obtenha sua API Key em: https://makersuite.google.com/app/apikey
        </Text>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>👤 Perfil</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>👤 Perfil</Text>
          {user && (
            <Text style={styles.email}>{user.email}</Text>
          )}
        </View>

        {renderStatsCard()}
        {renderTreesCard()}
        {renderApiKeyInput()}
        {renderAnalysisCard()}

        <Card style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowApiKeyInput(true)}
          >
            <MaterialCommunityIcons name="key" size={24} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Configurar API Key</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={24} color={COLORS.error} />
            <Text style={[styles.actionButtonText, { color: COLORS.error }]}>Sair</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  breakdownRow: {
    gap: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownText: {
    fontSize: 14,
    color: COLORS.text,
  },
  treesCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E8F5E9',
  },
  treesContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  treesIconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  treesIcon: {
    fontSize: 60,
  },
  treesNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: -10,
  },
  treesMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  treesSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  treesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
  },
  treesInfoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  motivationBox: {
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  motivationText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  analysisCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  analyzeButton: {
    marginTop: 8,
  },
  loader: {
    marginTop: 12,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginBottom: 16,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.text,
  },
  analysisSection: {
    marginBottom: 20,
  },
  analysisSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  analysisText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 8,
    marginTop: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  recommendationItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recommendationAction: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 20,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginLeft: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  recommendationReduction: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  goalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  goalText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 20,
  },
  apiKeyCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF9C4',
  },
  apiKeyDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  apiKeyInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
  },
  apiKeyButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  apiKeyButton: {
    flex: 1,
  },
  apiKeyInfo: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actionsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  actionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;

