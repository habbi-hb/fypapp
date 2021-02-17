import React, {useEffect} from 'react';
import {
  Container,
     Button,
  Text,
  Form,
  Item,
  Icon,
  Header,
  View,
 Input,
 Left,
 Body,
 Right,
 
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Server from "../Server";
import Loader from "../Loader";

const  App= () => {
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [service, setService] = React.useState('');
  const [Name, setName] = React.useState('');
  const [CNIC, setCNIC] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [modalDel, setModalDel] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');

    useEffect(()=>{
        AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
                const login_row = JSON.parse(val);
                // console.log(login_row.access_token);
                Server.get('api/service',{
                    headers:{
                        'Authorization': `Bearer ${login_row.access_token}`
                    }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
            }
        })
    },[]);

    const addService = () => {
      setloader(true);
      setModal(false);
      setService('');
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post('api/service',{
                services:'Medical',
                form_object:{
                    name:Name,
                    Email:Email,
                    CNIC:CNIC,
                    Description: Description
                },
                attachments : null
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                Server.get('api/service',{
                  headers:{
                      'Authorization': `Bearer ${login_row.access_token}`
                  }
                }).
                then(res => {
                  console.log(login_row.access_token);
                  setEventsData(res.data.services);
                  navigation.navigate('Nav');
                  alert("Add successfully")

                  setloader(false);
                    
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
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
          <Text>Medical</Text>
        </Body>
        
      </Header>
      
       
      <Form style={styles.form}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}>Name </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                      value={Name}
                      onChangeText={(val) => setName(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="account"
                  type="MaterialCommunityIcons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
     
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> CNIC </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                  value={CNIC}
                  onChangeText={(val) => setCNIC(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="contacts"
                  type="AntDesign"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
         
        
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Email </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                  value={Email}
                  onChangeText={(val) => setEmail(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="mail"
                  type="Octicons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
         
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Description </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                  value={Description}
                  onChangeText={(val) => setDescription(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="book"
                  type="FontAwesome5"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
         
           
            <Button onPress={()=> addService()}   danger={true} style={styles.btns} rounded>
              <Text>Register</Text>
            </Button>
          </KeyboardAwareScrollView>
        </Form>
      </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '87%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
    marginVertical: '5%',
  },
  form: {
    height: '90%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  inputOuter: {
    marginLeft: '2%',
    marginTop: 15,
  },
});
export default App; 