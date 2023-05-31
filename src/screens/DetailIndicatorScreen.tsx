import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {LineChart} from 'react-native-chart-kit';
import {StackScreenProps} from '@react-navigation/stack';
import {Text} from '@react-native-material/core';
import {View, Dimensions, StyleSheet} from 'react-native';

import {useIndicators} from '../hooks/useIndicators';
import {InfoIndicator, Loading} from '../components/Components';

interface RouteParams {
  title: string;
  indicator: string;
}

interface Props extends StackScreenProps<any, any> {}

export const DetailIndicatorScreen = ({route, navigation}: Props) => {
  const {title, indicator} = route.params as RouteParams;

  const [labelInd, setLabelInd] = useState<string[]>(['']);
  const [value, setValue] = useState<number[]>([0]);

  const {isLoading, indicators} = useIndicators({
    indicator,
    daysBefore: 10,
    monthBefore: 12,
  });

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  useEffect(() => {
    const labels: any = [];
    const values: any = [];
    if (indicators !== undefined) {
      indicators.forEach(element => {
        labels.push(element.Fecha);
        const replaceDot = element.Valor.replace(',', '.');
        values.push(parseFloat(replaceDot));
      });
    }
    setValue(values);
    setLabelInd(labels);
  }, [indicators]);

  if (isLoading) {
    return <Loading />;
  }

  if (indicators === undefined) {
    return (
      <View style={styles.container}>
        <Icon name="information-circle-outline" size={60} color="blue" />
        <Text variant="h3" style={styles.title}>
          No se encontraron indicadores
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="h1" style={styles.title}>
        ${indicators[0].Valor}
      </Text>
      <View style={styles.box}>
        <InfoIndicator title="Nombre" data={title} />
        <InfoIndicator title="Fecha" data={indicators[0].Fecha} />
        <InfoIndicator title="Unidad de Medida" data="Pesos" />
      </View>
      <View style={styles.lineChart}>
        <LineChart
          data={{
            labels: labelInd.reverse(),
            datasets: [
              {
                data: value.reverse(),
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={400}
          yAxisLabel="$"
          yAxisInterval={1}
          verticalLabelRotation={45}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
  },
  box: {
    width: 400,
  },
  lineChart: {
    margin: 20,
  },
  chart: {
    flex: 1,
  },
});
