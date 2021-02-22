/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, StatusBar, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  Item,
  Input,
  Button
} from 'native-base';
import {useNavigation} from '@react-navigation/native';


var Listtab =[
  {
    status: 'Approved'
  },
  {
  status: 'Pending'
  },
 
]
 

const App = () => {

   
   const [status, setStatus] = useState('Approved')
   const setStatuseF = status => {
     setStatus(status)
   }
 
  let navigation = useNavigation();

  return (
    <Container>
       <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon active name="arrowleft" type="AntDesign" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>Events</Text>
          </Body>
       
      </Header>
        <View style={styles.tabcontainer}>
          <View style={styles.listtab}>
            {
                Listtab.map(e => (
              
                <TouchableOpacity 
                style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                  onPress={() => setStatuseF(e.status)}
               
                >
                  <Text style={styles.texttab, status===e.status && styles.textActive}>{e.status}</Text>
                </TouchableOpacity>
              ))
            }
          </View>

        </View>
      
     
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '10%',
  },
  tabcontainer:{
    margin:3,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  listtab:{
    flexDirection:'row',
    alignSelf:'center',
    marginBottom: 20,
  },
  btnTab:{
    width: 100,
    borderRadius:10,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent:'center'
  },
  texttab:{
    fontSize:16,
    color:'#000'
  },
  btnTabActive :{
    backgroundColor: '#E6838D'
  },
  textActive:{
    color:'#fff'
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
  },
 

});

export default App;
