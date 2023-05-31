import React, {useEffect} from 'react';
import {Platform, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {styles} from '../theme/appTheme';
import {MenuItem} from '../interfaces/menuItem';
import {FlatListMenuItem, ItemSeparator} from '../components/Components';
import {request, PERMISSIONS} from 'react-native-permissions';

const menuItems: MenuItem[] = [
  {title: 'Dólar', indicator: 'dolar'},
  {title: 'Euro', indicator: 'euro'},
  {title: 'IPC', indicator: 'ipc'},
  {title: 'UF', indicator: 'uf'},
  {title: 'UTM', indicator: 'utm'},
];

export const HomeScreen = () => {
  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return (
    <View style={{flex: 1, ...styles.globalMargin}}>
      <FlatList
        data={menuItems}
        renderItem={({item}) => <FlatListMenuItem menuItem={item} />}
        keyExtractor={({title}) => title}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
