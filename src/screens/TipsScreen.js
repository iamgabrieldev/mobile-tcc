import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TipCard from '../components/TipCard';
import Card from '../components/Card';
import { COLORS } from '../constants/colors';
import tipsService from '../services/tipsService';
import storageService from '../services/storageService';
import treeService from '../services/treeService';

const TipsScreen = () => {
  const [personalizedTips, setPersonalizedTips] = useState([]);
  const [allTips, setAllTips] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [treeSuggestions, setTreeSuggestions] = useState([]);

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      // Obter dados do mês atual para dicas personalizadas
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const monthRecords = await storageService.getRecordsByMonth(currentYear, currentMonth);

      if (monthRecords.length > 0) {
        // Calcular totais do mês
        const totals = {
          total: 0,
          breakdown: {
            transport_land: 0,
            transport_air: 0,
            energy: 0,
            gas: 0
          }
        };

        monthRecords.forEach(record => {
          totals.total += record.emissions.total;
          Object.keys(record.emissions.breakdown).forEach(category => {
            totals.breakdown[category] += record.emissions.breakdown[category];
          });
        });

        const tips = tipsService.getPersonalizedTips(totals);
        setPersonalizedTips(tips);

        // Calcular árvores necessárias e obter sugestões
        const treeData = treeService.calculateTreesForMonthly(totals.total);
        const suggestions = treeService.getSuggestions(treeData.treesRounded);
        setTreeSuggestions(suggestions);
      }

      setAllTips(tipsService.getAllTips());
    } catch (error) {
      console.error('Erro ao carregar dicas:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dicas de Redução</Text>
        <Text style={styles.subtitle}>Sugestões para diminuir suas emissões</Text>
      </View>

      {personalizedTips.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-star" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Personalizadas para Você</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Baseadas no seu padrão de consumo deste mês
          </Text>
          {personalizedTips.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="lightbulb-on" size={24} color={COLORS.secondary} />
          <Text style={styles.sectionTitle}>Todas as Dicas</Text>
        </View>
        
        {!showAll && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAll(true)}
          >
            <Text style={styles.showMoreText}>Ver todas as dicas</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showAll && (
          <>
            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>🚗 Transporte Terrestre</Text>
              {tipsService.getTipsByCategory('transport_land').map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </View>

            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>✈️ Transporte Aéreo</Text>
              {tipsService.getTipsByCategory('transport_air').map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </View>

            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>⚡ Energia Elétrica</Text>
              {tipsService.getTipsByCategory('energy').map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </View>

            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>🔥 Gás</Text>
              {tipsService.getTipsByCategory('gas').map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </View>

            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => setShowAll(false)}
            >
              <Text style={styles.showMoreText}>Mostrar menos</Text>
              <MaterialCommunityIcons name="chevron-up" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Compensação por Árvores */}
      {treeSuggestions.length > 0 && (
        <Card style={styles.treeCard}>
          <View style={styles.infoHeader}>
            <MaterialCommunityIcons name="tree" size={32} color={COLORS.success} />
            <Text style={styles.treeCardTitle}>🌳 Compensação por Árvores</Text>
          </View>
          <Text style={styles.treeCardSubtitle}>
            Além de reduzir emissões, você pode compensá-las plantando árvores:
          </Text>
          {treeSuggestions.map((suggestion, index) => (
            <View key={index} style={styles.treeSuggestion}>
              <Text style={styles.treeSuggestionIcon}>{suggestion.icon}</Text>
              <View style={styles.treeSuggestionContent}>
                <Text style={styles.treeSuggestionTitle}>{suggestion.title}</Text>
                <Text style={styles.treeSuggestionImpact}>{suggestion.impact}</Text>
              </View>
            </View>
          ))}
          <View style={styles.treeInfoBox}>
            <MaterialCommunityIcons name="information-outline" size={20} color={COLORS.success} />
            <Text style={styles.treeInfoText}>
              Uma árvore adulta absorve aproximadamente 22 kg de CO₂ por ano
            </Text>
          </View>
        </Card>
      )}

      {/* Informações adicionais */}
      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <MaterialCommunityIcons name="information" size={24} color={COLORS.info} />
          <Text style={styles.infoTitle}>Sobre o Impacto</Text>
        </View>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Muito Alta:</Text> Redução significativa (mais de 50% em algumas categorias)
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Alta:</Text> Redução considerável (20-50%)
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Média:</Text> Redução moderada (10-20%)
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Baixa:</Text> Redução pequena mas constante (menos de 10%)
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  categorySection: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginVertical: 8,
  },
  showMoreText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 8,
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#E3F2FD',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '600',
  },
  treeCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#E8F5E9',
    padding: 16,
  },
  treeCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 8,
  },
  treeCardSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
    marginBottom: 16,
  },
  treeSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  treeSuggestionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  treeSuggestionContent: {
    flex: 1,
  },
  treeSuggestionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  treeSuggestionImpact: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  treeInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
  },
  treeInfoText: {
    fontSize: 13,
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
});

export default TipsScreen;
