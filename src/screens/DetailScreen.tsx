import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {useIndicators} from '../hooks/useIndicators';
import {ItemSeparator, Loading} from '../components/Components';
import {Text} from '@react-native-material/core';
import {Indicator} from '../interfaces/indicatorInterface';

interface RouteParams {
  title: string;
  indicator: string;
}

interface Props extends StackScreenProps<any, any> {}

export const DetailScreen = ({route, navigation}: Props) => {
  const {title, indicator} = route.params as RouteParams;

  const {indicators, isLoading} = useIndicators({
    indicator,
    daysBefore: 30,
  });

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (isLoading) {
    return <Loading />;
  }

  const renderMenuItem = (menuItem: Indicator) => {
    return (
      <View style={styles.container}>
        <Text variant="h6" style={{margin: 16, color: 'blue'}}>
          {menuItem.Fecha}
        </Text>
        <Text variant="h6" style={{margin: 16}}>
          ${menuItem.Valor}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={indicators}
        renderItem={({item}) => renderMenuItem(item)}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
