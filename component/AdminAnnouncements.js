/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Body, Title, Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  let navigation = useNavigation();

  return (
    <Container
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: '100%',
     
    }}>
    <StatusBar barStyle="dark-content" />
    <Text style={{fontSize:30}}>Admin Announcements </Text>
    
    <TouchableOpacity onPress={() => navigation.navigate('CreatAnnouncment')}
    style={[styles.btns,{ backgroundColor:'#f0ee92',}]} >
        <Text style={styles.btnTxt}>Create Announcement</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={() => navigation.navigate('UpdateSpecificAnnoncement')}
    style={[styles.btns,{ backgroundColor:'#a6c1ed',}]} >
        <Text style={styles.btnTxt}>Update Specific Announcement</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('GetSpecificAnnoncement')}
    style={[styles.btns,{ backgroundColor:'#b8eda6',}]} >
        <Text style={styles.btnTxt}>Get Specific Announcement</Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AllAnnouncment')}
 
    style={[styles.btns,{ backgroundColor:'#dba6ed',}]} >
        <Text style={styles.btnTxt}> Get All Announcements</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={() => navigation.navigate('DeleteSpecificAnnoncement')}
    style={[styles.btns,{ backgroundColor:'#edb4a6',}]} >
        <Text style={styles.btnTxt}>Delete Specific Announcement</Text>
    </TouchableOpacity>
    </Container>
);
};

const styles = StyleSheet.create({
btns: {
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
  justifyContent: 'center',
  marginTop: '4%',
  padding: 10,
  borderRadius: 30
},
btnTxt:{
  width: '100%', textAlign: 'center', color:'black', fontSize: 18
}
});

export default App;
