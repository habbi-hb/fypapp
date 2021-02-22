import React, {useEffect, useState} from 'react';
import {
    View,
    StatusBar,
    Image,
    StyleSheet,
    ScrollView,
    key,
    FlatList,
    ActivityIndicator,
    Modal, 

  } from 'react-native';
  import {Container, Text, Icon, Item, Input, Card, CardItem, Button }from 'native-base';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import {TouchableOpacity} from 'react-native-gesture-handler';
import Server from "./Server";


import Loader from "./Loader"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import * as Animatable from 'react-native-animatable';


const Tab = createBottomTabNavigator();

const App = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [budgetmodel, setbudgetmodel] = React.useState(false);
  const [modalDel, setModalDel] = React.useState(false);
  const [modalDel2, setModalDel2] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');
  const [edu, setedu] = React.useState('');
  const [house, sethouse] = React.useState('');

  const [medical, setmedical] = React.useState('');
  const [marriage, setmarriage] = React.useState('');
  const [other, setother] = React.useState(''); 
  const [Budget, setbudget] = React.useState(0);
  const [ser, setser] = React.useState('')







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
    Server.get('api/getuser/all',{
      headers:{
          'Authorization': `Bearer ${login_row.access_token}`
      }
  }).
  then(res => {
      // console.log(res.data);
      setEventsData(res.data);
      console.log(res.data[0].status)
      setloader(false);
  }).
  catch(err => {
    alert(err);
    setloader(false)
  });
  }
  
  const approvedUser = () => {
      setloader(true);
      setModalDel(false);
      
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.put(`api/update_user/${idDel}`,{
                  "status" : "Approved",
              
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                  navigation.navigate('AdminDashboard');
                 alert('approved')
                 setIdDel('');
                 setloader(false);
                 setModalDel2(false);
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }
    const myfun = ({item}) => {
     
        if (item.status === 'Approved')
        {
          return(
            
             <View style={styles.container}>
              <View style={{width:'90%'}}>
                <Text style={styles.title}>ID:{item.id} </Text>
                <Text style={styles.desc}>Name: {item.fname} {item.lname}</Text>
                <Text style={styles.desc}>Email: {item.email}</Text>
                <Text style={styles.desc}>CNIC: {item.cnic}</Text>
                <Text style={styles.desc}>Phone: {item.phone}</Text>
                <Text style={styles.desc}>Status: {item.status}</Text>
             
              </View>
             
         
              
            
          </View>
          )
        }
    
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
            Admin Services
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
          <Icon
          name="menu"
          type="Entypo"
          style={{marginRight: '2%', fontSize: 40}}
          onPress={() => navigation.openDrawer()}
        />
        </View>
      </View>
      <Loader loading={loader} />
      <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ myfun}
            keyExtractor={(item) => item.id.toString()}
          />
       
     
   
   
     
    </Container>
  );
};
const styles = StyleSheet.create({
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
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '7%',
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
   
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default App;
