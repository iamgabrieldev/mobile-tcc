import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';
import { COLORS } from '../constants/colors';

const EmissionCard = ({ icon, title, value, unit, color, percentage }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      {percentage !== undefined && (
        <Text style={styles.percentage}>{percentage}% do total</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    flex: 1,
    margin: 6,
    minWidth: 150,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  unit: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  percentage: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default EmissionCard;
