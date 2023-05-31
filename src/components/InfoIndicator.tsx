import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from '@react-native-material/core';

interface Props {
  title: string;
  data: string;
}

export const InfoIndicator = ({title, data}: Props) => {
  return (
    <View style={styles.row}>
      <Text variant="h5">{title}</Text>
      <Text variant="h5">{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
});
