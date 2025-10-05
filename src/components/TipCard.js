import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';
import { COLORS } from '../constants/colors';

const TipCard = ({ tip }) => {
  const getImpactColor = (impact) => {
    switch(impact) {
      case 'Muito Alta':
        return COLORS.error;
      case 'Alta':
        return COLORS.warning;
      case 'Média':
        return COLORS.info;
      case 'Baixa':
        return COLORS.textSecondary;
      default:
        return COLORS.primary;
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name={tip.icon} 
          size={24} 
          color={COLORS.primary} 
          style={styles.icon}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{tip.title}</Text>
          <View style={[styles.badge, { backgroundColor: getImpactColor(tip.impact) }]}>
            <Text style={styles.badgeText}>Impacto: {tip.impact}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.description}>{tip.description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default TipCard;
