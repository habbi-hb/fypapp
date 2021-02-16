import React, {useEffect} from 'react';
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
import {TouchableOpacity, FlatList, StyleSheet,Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";
import DateTimePicker from '@react-native-community/datetimepicker';

const ListAvatarExample = () => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  let [show, setShow] = React.useState(false);
  let navigation = useNavigation();
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
      Server.get('api/event',{
        headers:{
            'Authorization': `Bearer ${login_row.access_token}`
        }
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
        <Right>
          
        </Right>
      </Header>
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
    }
});

export default ListAvatarExample; 
