import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from '@react-native-material/core';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <ActivityIndicator size={40} />
    </View>
  );
};
