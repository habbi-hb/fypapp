/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, TextInput, Textarea, Text, FlatList, 
  Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Body, Title, Button, Label, } from 'native-base';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const DATA = [
  {
    id: '1',
    title: 'First ',
    des: "this is first announcment"
  },
  {
    id: '2',
    title: 'Second',
    des: "this is Second announcment"
  },
  {
    id: '3',
    title: 'Third',
    des: "this is third announcment"
  },
];
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={{fontWeight:'bold'}}>{item.title}</Text>
    <Text>{item.des}</Text>
  </TouchableOpacity>
);


const getapi = "https://react.codupcloud.com/api/announcement";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    var TOKEN =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmVhY3QuY29kdXBjbG91ZC5jb21cL2FwaVwvc2lnbnVwIiwiaWF0IjoxNjEzMDM4MjAwLCJuYmYiOjE2MTMwMzgyMDAsImp0aSI6IllqbVdPS0RuNXNnOTBpWWYiLCJzdWIiOjQsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.25W_6jQthJQG_yRy8Az0kYfQXubZsU4oN6zsM2YbNpc";

  
    //fetching our data
  
    useEffect(() => {
      
      
      fetch(getapi, {
        headers:{
    
            Authorization: 'Bearer ' + TOKEN,
      
           
               },
      })
      .then((res) => res.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .finally(setLoading(false));
    });
    console.log('Announcement..............:',data)
  let navigation = useNavigation();
  const renderItem = ({ item }) => {
  

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
       
      />
    );
  };
  

  return (
      
    <Container
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: '100%',
     
    }}>
    <StatusBar barStyle="dark-content" />
    <Text style={{fontSize:30}}>All Announcements </Text>
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
 item: {
              padding:10,
               borderRadius : 1,
               width: 350,
               borderStyle: 'dashed',
               borderWidth: 1,
               borderColor: 'black',
               margin: 10

},

});

export default App;
