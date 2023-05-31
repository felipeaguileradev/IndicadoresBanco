import React from 'react';
import {MenuItem} from '../interfaces/menuItem';
import {Text} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';

interface Props {
  menuItem: MenuItem;
}

export const FlatListMenuItem = ({menuItem}: Props) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailScreen', {
            title: menuItem.title,
            indicator: menuItem.indicator,
          })
        }>
        <Text variant="h6" style={{color: 'blue'}}>
          {menuItem.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icons}
        onPress={() =>
          navigation.navigate('DetailIndicatorScreen', {
            title: menuItem.title,
            indicator: menuItem.indicator,
          })
        }>
        <Icon name="information-circle-outline" size={24} color="blue" />
        <Icon name="chevron-forward-outline" color="blue" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
  },
});
