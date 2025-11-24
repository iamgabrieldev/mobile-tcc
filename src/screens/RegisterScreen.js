import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { COLORS } from '../constants/colors';
import { EMISSION_FACTORS } from '../constants/emissionFactors';
import carbonCalculator from '../services/carbonCalculator';
import storageService from '../services/storageService';
import pointsService from '../services/pointsService';
import treeService from '../services/treeService';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { user } = useAuth();
  
  // Transporte Terrestre
  const [landTransportType, setLandTransportType] = useState('CARRO_PEQUENO_GASOLINA');
  const [landDistance, setLandDistance] = useState('');

  // Transporte Aéreo
  const [airTransportType, setAirTransportType] = useState('VOO_NACIONAL');
  const [airDistance, setAirDistance] = useState('');

  // Energia
  const [energyConsumption, setEnergyConsumption] = useState('');

  // Gás
  const [gasType, setGasType] = useState('GLP');
  const [gasConsumption, setGasConsumption] = useState('');

  // Atividades Domésticas
  const [domesticActivityType, setDomesticActivityType] = useState('BANHO_QUENTE');
  const [domesticActivityQuantity, setDomesticActivityQuantity] = useState('');

  // Resíduos/Reciclagem
  const [wasteType, setWasteType] = useState('RECICLAGEM_PAPEL');
  const [wasteQuantity, setWasteQuantity] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Montar objeto de consumo
    const consumptions = {
      transport_land: [],
      transport_air: [],
      energy: 0,
      gas: [],
      domestic_activities: [],
      waste: []
    };

    // Validar e adicionar transporte terrestre
    if (landDistance && parseFloat(landDistance) > 0) {
      consumptions.transport_land.push({
        type: landTransportType,
        distance: parseFloat(landDistance)
      });
    }

    // Validar e adicionar transporte aéreo
    if (airDistance && parseFloat(airDistance) > 0) {
      consumptions.transport_air.push({
        type: airTransportType,
        distance: parseFloat(airDistance)
      });
    }

    // Validar e adicionar energia
    if (energyConsumption && parseFloat(energyConsumption) > 0) {
      consumptions.energy = parseFloat(energyConsumption);
    }

    // Validar e adicionar gás
    if (gasConsumption && parseFloat(gasConsumption) > 0) {
      consumptions.gas.push({
        type: gasType,
        consumption: parseFloat(gasConsumption)
      });
    }

    // Validar e adicionar atividades domésticas
    if (domesticActivityQuantity && parseFloat(domesticActivityQuantity) > 0) {
      consumptions.domestic_activities.push({
        type: domesticActivityType,
        quantity: parseFloat(domesticActivityQuantity)
      });
    }

    // Validar e adicionar resíduos/reciclagem
    if (wasteQuantity && parseFloat(wasteQuantity) > 0) {
      consumptions.waste.push({
        type: wasteType,
        quantity: parseFloat(wasteQuantity)
      });
    }

    // Verificar se pelo menos um campo foi preenchido
    const hasData = consumptions.transport_land.length > 0 ||
                    consumptions.transport_air.length > 0 ||
                    consumptions.energy > 0 ||
                    consumptions.gas.length > 0 ||
                    consumptions.domestic_activities.length > 0 ||
                    consumptions.waste.length > 0;

    if (!hasData) {
      Alert.alert('Atenção', 'Por favor, preencha pelo menos um campo de consumo');
      return;
    }

    setLoading(true);

    try {
      // Calcular emissões
      const emissions = carbonCalculator.calculateTotalEmissions(consumptions);

      // Salvar registro
      const record = {
        date: new Date().toISOString(),
        consumptions,
        emissions
      };

      await storageService.saveDailyRecord(record);

      // Calcular e adicionar pontos
      let pointsMessage = '';
      if (user) {
        try {
          const userPointsData = await pointsService.getUserPoints(user.uid);
          const previousEmission = userPointsData.success ? userPointsData.data.lastEmission : 0;
          
          // Calcular pontos baseado na redução ou aumento
          const points = pointsService.calculatePoints(previousEmission, emissions.total);
          
          // Adicionar pontos ao usuário
          await pointsService.addPoints(user.uid, points, emissions.total, 'daily');
          
          // Mensagem sobre pontos
          if (points > 0) {
            pointsMessage = `\n🏆 +${points} pontos ganhos!`;
          } else if (points < 0) {
            pointsMessage = `\n⚠️ ${points} pontos (aumento de emissões)`;
          } else {
            pointsMessage = `\n⭐ +1 ponto por participação!`;
          }
        } catch (error) {
          console.error('Erro ao calcular pontos:', error);
        }
      }

      // Calcular árvores necessárias
      const treeData = treeService.calculateTreesForDaily(emissions.total);
      const treeMessage = `\n\n🌳 ${treeData.treesRounded} ${treeData.treesRounded === 1 ? 'árvore seria necessária' : 'árvores seriam necessárias'} para compensar essas emissões diárias durante um ano.`;

      Alert.alert(
        'Sucesso!',
        `Total de emissões: ${emissions.total} kg CO₂${pointsMessage}${treeMessage}`,
        [
          {
            text: 'Ver Relatório',
            onPress: () => navigation.navigate('Reports')
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );

      // Limpar formulário
      resetForm();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o registro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setLandDistance('');
    setAirDistance('');
    setEnergyConsumption('');
    setGasConsumption('');
    setDomesticActivityQuantity('');
    setWasteQuantity('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Consumo Diário</Text>
        <Text style={styles.subtitle}>Informe seus dados de consumo de hoje</Text>
      </View>

      {/* Transporte Terrestre */}
      <Card>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="car" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Transporte Terrestre</Text>
        </View>
        
        <Text style={styles.label}>Tipo de Veículo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={landTransportType}
            onValueChange={setLandTransportType}
            style={styles.picker}
          >
            {Object.entries(EMISSION_FACTORS.TRANSPORT_LAND).map(([key, value]) => (
              <Picker.Item key={key} label={value.label} value={key} />
            ))}
          </Picker>
        </View>

        <Input
          label="Distância percorrida (km)"
          value={landDistance}
          onChangeText={setLandDistance}
          placeholder="Ex: 25"
          keyboardType="numeric"
        />
      </Card>

      {/* Transporte Aéreo */}
      <Card>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="airplane" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Transporte Aéreo</Text>
        </View>

        <Text style={styles.label}>Tipo de Voo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={airTransportType}
            onValueChange={setAirTransportType}
            style={styles.picker}
          >
            {Object.entries(EMISSION_FACTORS.TRANSPORT_AIR).map(([key, value]) => (
              <Picker.Item key={key} label={value.label} value={key} />
            ))}
          </Picker>
        </View>

        <Input
          label="Distância do voo (km)"
          value={airDistance}
          onChangeText={setAirDistance}
          placeholder="Ex: 350"
          keyboardType="numeric"
        />
      </Card>

      {/* Energia */}
      <Card>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="lightning-bolt" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Energia Elétrica</Text>
        </View>

        <Input
          label="Consumo de energia (kWh)"
          value={energyConsumption}
          onChangeText={setEnergyConsumption}
          placeholder="Ex: 15.5"
          keyboardType="numeric"
        />
        <Text style={styles.hint}>
          Fator: {EMISSION_FACTORS.ENERGY.MEDIA_BRASIL.factor} kg CO₂/kWh
        </Text>
      </Card>

      {/* Gás */}
      <Card>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="fire" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Gás</Text>
        </View>

        <Text style={styles.label}>Tipo de Gás</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gasType}
            onValueChange={setGasType}
            style={styles.picker}
          >
            {Object.entries(EMISSION_FACTORS.GAS).map(([key, value]) => (
              <Picker.Item key={key} label={value.label} value={key} />
            ))}
          </Picker>
        </View>

        <Input
          label={`Consumo (${gasType === 'GLP' ? 'kg' : 'm³'})`}
          value={gasConsumption}
          onChangeText={setGasConsumption}
          placeholder="Ex: 13"
          keyboardType="numeric"
        />
      </Card>

      {/* Atividades Domésticas */}
      <Card>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="home" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Atividades Domésticas</Text>
        </View>

        <Text style={styles.label}>Tipo de Atividade</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={domesticActivityType}
            onValueChange={setDomesticActivityType}
            style={styles.picker}
          >
            {Object.entries(EMISSION_FACTORS.DOMESTIC_ACTIVITIES).map(([key, value]) => (
              <Picker.Item key={key} label={value.label} value={key} />
            ))}
          </Picker>
        </View>

        <Input
          label={
            domesticActivityType === 'BANHO_QUENTE' ? 'Quantidade de banhos' :
            domesticActivityType === 'LAVAGEM_ROUPAS' ? 'Quantidade de ciclos' :
            domesticActivityType === 'SECADORA_ROUPAS' ? 'Quantidade de ciclos' :
            domesticActivityType === 'FORNO_ELETRICO' ? 'Quantidade de usos' :
            domesticActivityType === 'CONSUMO_ALIMENTOS' ? 'Quantidade de dias' :
            'Quantidade'
          }
          value={domesticActivityQuantity}
          onChangeText={setDomesticActivityQuantity}
          placeholder="Ex: 2"
          keyboardType="numeric"
        />
        <Text style={styles.hint}>
          {EMISSION_FACTORS.DOMESTIC_ACTIVITIES[domesticActivityType].unit}
        </Text>
      </Card>

      {/* Resíduos/Reciclagem */}
      <Card>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="recycle" size={24} color={COLORS.success} />
          <Text style={styles.cardTitle}>Resíduos/Reciclagem</Text>
        </View>

        <Text style={styles.label}>Tipo de Material Reciclado</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={wasteType}
            onValueChange={setWasteType}
            style={styles.picker}
          >
            {Object.entries(EMISSION_FACTORS.WASTE).map(([key, value]) => (
              <Picker.Item key={key} label={value.label} value={key} />
            ))}
          </Picker>
        </View>

        <Input
          label="Quantidade reciclada (kg)"
          value={wasteQuantity}
          onChangeText={setWasteQuantity}
          placeholder="Ex: 5"
          keyboardType="numeric"
        />
        <Text style={styles.hintPositive}>
          ♻️ Reciclagem reduz suas emissões! {EMISSION_FACTORS.WASTE[wasteType].unit}
        </Text>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Calcular e Salvar"
          onPress={handleSubmit}
          loading={loading}
        />
        <Button
          title="Limpar Formulário"
          onPress={resetForm}
          variant="outline"
          style={styles.clearButton}
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
  },
  picker: {
    height: 50,
  },
  hint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: -8,
  },
  hintPositive: {
    fontSize: 12,
    color: COLORS.success,
    fontStyle: 'italic',
    marginTop: -8,
  },
  actions: {
    padding: 20,
  },
  clearButton: {
    marginTop: 12,
  },
});

export default RegisterScreen;
