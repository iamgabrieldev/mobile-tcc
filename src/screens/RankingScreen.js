import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';
import pointsService from '../services/pointsService';
import Card from '../components/Card';

const RankingScreen = () => {
  const { user } = useAuth();
  const [ranking, setRanking] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState('total'); // 'total', 'weekly', 'daily'

  useEffect(() => {
    loadRanking();
  }, [period]);

  const loadRanking = async () => {
    try {
      setLoading(true);
      
      // Carregar ranking geral
      const rankingResult = await pointsService.getRanking(100, period);
      if (rankingResult.success) {
        setRanking(rankingResult.data);
        
        // Mostrar alerta se estiver offline
        if (rankingResult.offline && rankingResult.message) {
          Alert.alert('Modo Offline', rankingResult.message);
        }
      }

      // Carregar posição do usuário
      if (user) {
        const userRankResult = await pointsService.getUserRank(user.uid, period);
        if (userRankResult.success) {
          setUserRank(userRankResult.data);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      Alert.alert('Erro', 'Não foi possível carregar o ranking. Verifique sua conexão.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadRanking();
  };

  const getMedalIcon = (position) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${position}º`;
    }
  };

  const getMedalColor = (position) => {
    switch (position) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return COLORS.textSecondary;
    }
  };

  const getPointsForPeriod = (item) => {
    switch (period) {
      case 'daily':
        return item.dailyPoints;
      case 'weekly':
        return item.weeklyPoints;
      default:
        return item.totalPoints;
    }
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      <TouchableOpacity
        style={[styles.periodButton, period === 'total' && styles.periodButtonActive]}
        onPress={() => setPeriod('total')}
      >
        <Text style={[styles.periodButtonText, period === 'total' && styles.periodButtonTextActive]}>
          Geral
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.periodButton, period === 'weekly' && styles.periodButtonActive]}
        onPress={() => setPeriod('weekly')}
      >
        <Text style={[styles.periodButtonText, period === 'weekly' && styles.periodButtonTextActive]}>
          Semanal
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.periodButton, period === 'daily' && styles.periodButtonActive]}
        onPress={() => setPeriod('daily')}
      >
        <Text style={[styles.periodButtonText, period === 'daily' && styles.periodButtonTextActive]}>
          Diário
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderUserPosition = () => {
    if (!userRank) return null;

    return (
      <Card style={styles.userPositionCard}>
        <View style={styles.userPositionContent}>
          <View style={styles.userPositionLeft}>
            <Text style={styles.userPositionLabel}>Sua Posição</Text>
            <Text style={styles.userPositionRank}>#{userRank.position}</Text>
          </View>
          <View style={styles.userPositionRight}>
            <MaterialCommunityIcons name="trophy" size={40} color={COLORS.primary} />
            <Text style={styles.userPositionPoints}>{userRank.points} pts</Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderRankingItem = ({ item, index }) => {
    const isCurrentUser = user && item.userId === user.uid;
    const points = getPointsForPeriod(item);

    return (
      <View
        style={[
          styles.rankingItem,
          isCurrentUser && styles.rankingItemHighlight
        ]}
      >
        <View style={styles.rankingPosition}>
          <Text 
            style={[
              styles.rankingPositionText,
              { color: getMedalColor(item.position) }
            ]}
          >
            {getMedalIcon(item.position)}
          </Text>
        </View>

        <View style={styles.rankingInfo}>
          <Text style={styles.rankingName}>
            {isCurrentUser ? 'Você' : item.email}
          </Text>
          <Text style={styles.rankingEmission}>
            Última emissão: {item.lastEmission.toFixed(2)} kg CO₂
          </Text>
        </View>

        <View style={styles.rankingPoints}>
          <Text style={styles.rankingPointsValue}>{points}</Text>
          <Text style={styles.rankingPointsLabel}>pontos</Text>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons 
        name="trophy-outline" 
        size={80} 
        color={COLORS.textSecondary} 
      />
      <Text style={styles.emptyStateText}>
        Nenhum dado de ranking ainda
      </Text>
      <Text style={styles.emptyStateSubtext}>
        Registre suas emissões para começar a ganhar pontos!
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🏆 Ranking</Text>
          <Text style={styles.subtitle}>
            Competição amigável pela sustentabilidade
          </Text>
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
          <Text style={styles.title}>🏆 Ranking</Text>
          <Text style={styles.subtitle}>
            Competição amigável pela sustentabilidade
          </Text>
        </View>

        {renderPeriodSelector()}
        {renderUserPosition()}

        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="information" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Ganhe pontos reduzindo suas emissões de CO₂!
            </Text>
          </View>
          <Text style={styles.infoSubtext}>
            Cada kg de CO₂ reduzido = 10 pontos
          </Text>
        </Card>

        <Text style={styles.sectionTitle}>Top Usuários</Text>

        {ranking.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={styles.rankingList}>
            {ranking.map((item, index) => (
              <View key={item.userId}>
                {renderRankingItem({ item, index })}
              </View>
            ))}
          </View>
        )}
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  periodSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  periodButtonTextActive: {
    color: '#FFF',
  },
  userPositionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.primaryLight,
  },
  userPositionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userPositionLeft: {
    flex: 1,
  },
  userPositionLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  userPositionRank: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userPositionRight: {
    alignItems: 'center',
  },
  userPositionPoints: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 4,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E3F2FD',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
  },
  infoSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  rankingList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rankingItemHighlight: {
    backgroundColor: '#FFF9C4',
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  rankingPosition: {
    width: 50,
    alignItems: 'center',
  },
  rankingPositionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rankingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rankingName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  rankingEmission: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  rankingPoints: {
    alignItems: 'flex-end',
  },
  rankingPointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  rankingPointsLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default RankingScreen;

