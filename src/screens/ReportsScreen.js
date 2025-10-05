import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS } from '../constants/colors';
import storageService from '../services/storageService';

const screenWidth = Dimensions.get('window').width;

const ReportsScreen = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await storageService.getMonthlyComparison(6);
      setMonthlyData(data);

      // Calcular totais por categoria
      const totals = {
        transport_land: 0,
        transport_air: 0,
        energy: 0,
        gas: 0
      };

      data.forEach(month => {
        totals.transport_land += month.breakdown.transport_land;
        totals.transport_air += month.breakdown.transport_air;
        totals.energy += month.breakdown.energy;
        totals.gas += month.breakdown.gas;
      });

      setCategoryData(totals);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const exportToPDF = async () => {
    setLoading(true);
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #4CAF50; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #4CAF50; color: white; }
            </style>
          </head>
          <body>
            <h1>Relatório de Pegada de Carbono</h1>
            <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
            <h2>Emissões Mensais</h2>
            <table>
              <tr>
                <th>Mês</th>
                <th>Total (kg CO₂)</th>
                <th>Transporte Terrestre</th>
                <th>Transporte Aéreo</th>
                <th>Energia</th>
                <th>Gás</th>
              </tr>
              ${monthlyData.map(month => `
                <tr>
                  <td>${month.month}</td>
                  <td>${month.total.toFixed(2)}</td>
                  <td>${month.breakdown.transport_land.toFixed(2)}</td>
                  <td>${month.breakdown.transport_air.toFixed(2)}</td>
                  <td>${month.breakdown.energy.toFixed(2)}</td>
                  <td>${month.breakdown.gas.toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
      Alert.alert('Sucesso', 'Relatório PDF gerado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    setLoading(true);
    try {
      const csv = await storageService.exportToCSV();
      const fileUri = FileSystem.documentDirectory + 'relatorio_carbono.csv';
      await FileSystem.writeAsStringAsync(fileUri, csv);
      await Sharing.shareAsync(fileUri);
      Alert.alert('Sucesso', 'Relatório CSV gerado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o CSV: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const pieChartData = categoryData ? [
    {
      name: 'Transporte Terrestre',
      population: categoryData.transport_land,
      color: COLORS.chart.transport,
      legendFontColor: COLORS.text,
      legendFontSize: 12
    },
    {
      name: 'Transporte Aéreo',
      population: categoryData.transport_air,
      color: COLORS.chart.air,
      legendFontColor: COLORS.text,
      legendFontSize: 12
    },
    {
      name: 'Energia',
      population: categoryData.energy,
      color: COLORS.chart.energy,
      legendFontColor: COLORS.text,
      legendFontSize: 12
    },
    {
      name: 'Gás',
      population: categoryData.gas,
      color: COLORS.chart.gas,
      legendFontColor: COLORS.text,
      legendFontSize: 12
    }
  ].filter(item => item.population > 0) : [];

  const lineChartData = {
    labels: monthlyData.map(m => m.month.substring(5)),
    datasets: [{
      data: monthlyData.length > 0 ? monthlyData.map(m => m.total) : [0]
    }]
  };

  const chartConfig = {
    backgroundColor: COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.surface,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: COLORS.primary
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>Análise comparativa de emissões</Text>
      </View>

      {monthlyData.length > 0 ? (
        <>
          {/* Gráfico de Linha - Evolução Mensal */}
          <Card>
            <View style={styles.chartHeader}>
              <MaterialCommunityIcons name="chart-line" size={24} color={COLORS.primary} />
              <Text style={styles.chartTitle}>Evolução Mensal</Text>
            </View>
            <LineChart
              data={lineChartData}
              width={screenWidth - 72}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </Card>

          {/* Gráfico de Pizza - Distribuição por Categoria */}
          {pieChartData.length > 0 && (
            <Card>
              <View style={styles.chartHeader}>
                <MaterialCommunityIcons name="chart-pie" size={24} color={COLORS.primary} />
                <Text style={styles.chartTitle}>Distribuição por Categoria</Text>
              </View>
              <PieChart
                data={pieChartData}
                width={screenWidth - 72}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </Card>
          )}

          {/* Resumo Estatístico */}
          <Card>
            <View style={styles.chartHeader}>
              <MaterialCommunityIcons name="chart-bar" size={24} color={COLORS.primary} />
              <Text style={styles.chartTitle}>Resumo Estatístico</Text>
            </View>
            {monthlyData.map((month, index) => (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statMonth}>{month.month}</Text>
                <Text style={styles.statValue}>{month.total.toFixed(2)} kg CO₂</Text>
              </View>
            ))}
          </Card>

          {/* Botões de Exportação */}
          <View style={styles.exportSection}>
            <Text style={styles.sectionTitle}>Exportar Dados</Text>
            <Button
              title="Exportar PDF"
              onPress={exportToPDF}
              loading={loading}
              style={styles.exportButton}
            />
            <Button
              title="Exportar CSV"
              onPress={exportToCSV}
              variant="outline"
              loading={loading}
              style={styles.exportButton}
            />
          </View>
        </>
      ) : (
        <Card style={styles.emptyCard}>
          <MaterialCommunityIcons name="chart-timeline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>Nenhum dado disponível</Text>
          <Text style={styles.emptySubtext}>
            Comece a registrar seus consumos para visualizar relatórios
          </Text>
        </Card>
      )}
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
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statMonth: {
    fontSize: 14,
    color: COLORS.text,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  exportSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  exportButton: {
    marginBottom: 12,
  },
  emptyCard: {
    margin: 20,
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ReportsScreen;
