/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  key,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";
import * as Animatable from 'react-native-animatable';

const Tab = createBottomTabNavigator();

const App = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

    useEffect(()=>{
        AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                setloader(false);
                navigation.navigate('LoginScreen');
            } else {
                const login_row = JSON.parse(val);
                // console.log(login_row.access_token);
                reFresh(login_row);
            }
        });
    },[]);

    const reFresh= (login_row) => {
      Server.get('api/announcement',{
    }).
    then(res => {
        // console.log(res.data);
        setEventsData(res.data);
        setloader(false);
    }).
    catch(err => {
      alert(err);
      setloader(false)
    });
    }


  return (
    <Container
      style={{
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
      }}>
      {show && (
        <Animatable.View
          style={{
            height: '18%',
            position: 'absolute',
            zIndex: 9,
            width: '25%',
            top: '4%',
            marginLeft: '40%',
          }}
          animation="lightSpeedIn">
          <Item
            rounded
            style={{
              width: '100%',
              backgroundColor: 'lightgray',
              color: 'white',
            }}>
            <Input placeholder="Search..." />
          </Item>
        </Animatable.View>
      )}
      <View
        style={{
          height: '15%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('./assets/2.jpg')}
            style={{height: '35%', width: '20%', borderRadius: 50}}
          />
          <Text style={{marginLeft: '4%', fontSize: 20, fontWeight: 'bold'}}>
            Services
          </Text>
        </View>

        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '3%',
            flexDirection: 'row',
          }}>
          
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon active name="gear" type="FontAwesome" />
          </TouchableOpacity>
        </View>
      </View>
      <Loader loading={loader} />
      <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                <View style={{width:'90%'}}>
                <Text style={styles.title}> {item.title}</Text>
                    <Text style={styles.desc}> {item.description}</Text>
                    <Text style={styles.date}> Date : {item.expiry}</Text>
                </View>
                
                <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                
                </View>
            </View>
            }
            keyExtractor={(item) => item.id.toString()}

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
    marginTop: '7%',
  },
  container: {
    alignItems:'center',
    alignSelf:'center',
    borderRadius : 1,
    width: '90%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(161,155,183,1)',
      margin:10,
      paddingHorizontal:10,
      paddingVertical:10,
      flexDirection:'row'
  },
  title: {
      fontSize:16,
      fontWeight:'bold',
      color:'gray'
  },
  desc: {
      fontSize:14,
      // fontWeight:'bold',
      color:'gray'
  },
  date: {
      fontSize:12,
      // fontWeight:'bold',
      color:'gray'
  },
  modalBody:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:5,
    padding:10,
    alignItems:'center'
  },
  modalContainer:{
    height:500,
    width:300,
    backgroundColor:'#fff',
    borderRadius:15,
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center'
  },
  modalContainerDel:{
    height:150,
    width:300,
    backgroundColor:'#fff',
    borderRadius:15,
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center'
  },
  btns: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  form: {
    height: '75%',
    width: '95%',
    marginTop: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  inputOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default App;
