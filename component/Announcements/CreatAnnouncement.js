/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, TextInput, Textarea, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Body, Title, Button, Label, } from 'native-base';
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
    <Text style={{fontSize:30}}>Create Announcements </Text>
    <Label>Title</Label>
    <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Announcement Title"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               />
                <Label>Description</Label>
                <TextInput
                    multiline={true}
                    style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Announcement description"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                />
               
    
                <Label>Attachments</Label>
    <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "null"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               />
                <Label>Expiry</Label>
    <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "10-2-2021 "
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               />
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
},
input: {
    margin: 15,
    width:'90%',
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
});

export default App;
