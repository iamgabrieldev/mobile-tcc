import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';
import { COLORS } from '../constants/colors';

const TreeCompensationCard = ({ treesData }) => {
  if (!treesData || treesData.trees === 0) {
    return (
      <Card style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="tree" size={32} color={COLORS.success} />
          <Text style={styles.title}>Compensação por Árvores</Text>
        </View>
        <View style={styles.perfectScore}>
          <MaterialCommunityIcons name="check-circle" size={48} color={COLORS.success} />
          <Text style={styles.perfectText}>🌟 Parabéns!</Text>
          <Text style={styles.perfectSubtext}>Suas emissões estão zeradas!</Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="tree" size={32} color={COLORS.success} />
        <Text style={styles.title}>Compensação por Árvores</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.treeCount}>
          <Text style={styles.treeNumber}>{treesData.treesRounded}</Text>
          <Text style={styles.treeLabel}>
            {treesData.treesRounded === 1 ? 'árvore' : 'árvores'}
          </Text>
        </View>

        <Text style={styles.description}>
          seriam necessárias para compensar suas emissões {getPeriodText(treesData.period)}
        </Text>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information" size={20} color={COLORS.info} />
          <Text style={styles.infoText}>
            Uma árvore absorve ~{treesData.co2PerTree} kg CO₂/ano
          </Text>
        </View>

        {treesData.annualEmission && (
          <View style={styles.annualInfo}>
            <Text style={styles.annualLabel}>Emissão anual projetada:</Text>
            <Text style={styles.annualValue}>
              {treesData.annualEmission.toFixed(2)} kg CO₂
            </Text>
          </View>
        )}

        <Text style={styles.motivationalMessage}>{treesData.message}</Text>
      </View>
    </Card>
  );
};

const getPeriodText = (period) => {
  switch(period) {
    case 'daily':
      return 'diárias';
    case 'weekly':
      return 'semanais';
    case 'monthly':
      return 'mensais';
    case 'yearly':
      return 'anuais';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 12,
    flex: 1,
  },
  perfectScore: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  perfectText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.success,
    marginTop: 12,
  },
  perfectSubtext: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  content: {
    alignItems: 'center',
  },
  treeCount: {
    alignItems: 'center',
    marginBottom: 12,
  },
  treeNumber: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  treeLabel: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginTop: -8,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  annualInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  annualLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  annualValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 4,
  },
  motivationalMessage: {
    fontSize: 15,
    color: COLORS.text,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 16,
    lineHeight: 22,
  },
});

export default TreeCompensationCard;

