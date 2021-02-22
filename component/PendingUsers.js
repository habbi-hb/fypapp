import React, {useEffect, useState} from 'react';
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
  View,
  Item,
  Input,
  Button
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet, Modal,Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";

import Server from "./Server";


import Loader from "./Loader";
import { ScrollView } from 'react-native-gesture-handler';





const OurServices = () => {
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modcal, setModal] = React.useState([]);
  const [modalDel, setModalDel] = React.useState(false);
  const [modalDel2, setModalDel2] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');
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
      
   
      if (item.status === "Pending")
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
           
        <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
          <Icon onPress={()=>{setModalDel2(true);setIdDel(e.id)}}
          style={{marginBottom:10,color:'#86eb7c',}} active name="checkcircleo" type="AntDesign"  />
          <Icon style={{color:'#ff9d96',}} active name="closecircleo" type="AntDesign" />
        </View>
            
          
        </View>
        )
      }
  
}

 

    
    

    

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
          <Text>pending Users</Text>
        </Body>
        
        
      </Header>
      <Loader loading={loader} />
      <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ myfun}
            keyExtractor={(item) => item.id.toString()}
          />
       
     
   
        
          <Modal
              animationType={'fade'}
              transparent={true}
              visible={modalDel2}
              onRequestClose={() => setModalDel2(false)}
              on
              >
            <View style={{ flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'rgba(0,0,0,0.5)',
                            borderRadius:5,
                            padding:10,
                            alignItems:'center' }} >
                <View style={{ height:150,
                                width:300,
                                backgroundColor:'#fff',
                                borderRadius:15,
                                justifyContent:'space-between',
                                alignItems:'center',
                                alignSelf:'center'}} >
                  <View style={{width:'100%'}}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Approve user ?</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => approvedUser()}
                      >
                      <Text style={styles.btnTxt}>Approve</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
   
         
           
    
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
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      marginTop: '4%',
    },
   
});

export default OurServices; 
