/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import {View, StatusBar, Platform, StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Header,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const App = () => {
  let [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [password, setPassword] = useState('');

  const [fName, setFname] = useState('');
  const [lname, setlname] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Education, setEducation] = useState('');
  const [Gender, setGender] = useState('');
  const [Level, setLevel] = useState('');
  const [Isadmin, setisadmin] = useState('1');
  const [idDel, setIdel] = React.useState('');
  const [memberId, setmemberId] = useState('');
  const [eventsData, setEventsData] = React.useState([]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(()=>{
    AsyncStorage.getItem('Login_row').
    then(val => {
        if (val == null) {
            navigation.navigate('LoginScreen');
        } else {
            const login_row = JSON.parse(val);
            // console.log(login_row.access_token);
            reFresh(login_row);
        }
    });
},[]);

  const reFresh= (login_row) => {
    Server.get('api/getuser',{
      headers:{
          'Authorization': `Bearer ${login_row.access_token}`
      }
  }).
  then(res => {
       console.log(res.data);
      setEventsData(res.data);
     
  }).
  catch(err => {
    alert(err);
    
  });
  }

  const UpdateProfile = () => {
    AsyncStorage.getItem('Login_row').
    then(val => {
        if (val == null) {
            navigation.navigate('LoginScreen');
        } else {
          const login_row = JSON.parse(val);
          Server.put('api/update_profile',
          {
           fname: fName,
           lname:lname ,
           email: Email,
           cnic: memberId,
           phone: PhoneNo,
           password: password,
           education : Education,
           level: Level,
           isadmin: Isadmin,
           gender : Gender,
           dob : date
       },{
         headers:{
           'Authorization': `Bearer ${login_row.access_token}`
         }
          }).
          then(res => {
            console.log(res)
            setIdel('');
            setEducation('');
            setEmail('')
            reFresh(login_row);
          }).
          catch(err => {
              alert(err);
            
          });
      }
    })
    
  
    
  }
  return (
    <>
    <Container
    style={{
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: '100%',
    }}>
    <StatusBar barStyle="dark-content" />
    <Header
      style={{
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
      }}>
      <Text
        style={[
          styles.loginTxt,
          {
            backgroundColor: '#f2f2f2',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            color: '#ED553B',
            fontWeight: 'bold',
            fontSize: 18,
          },
        ]}>
        {' '}
        Update your Profile
      </Text>
    </Header>
  

    <Form style={styles.form}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputOuter}>
          <Text style={{marginLeft: '1%', fontSize: 14}}> First Name </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={fName}
            onChangeText={(val) => setFname(val)}
            placeholder="First Name"
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
          <Text style={{marginLeft: '1%', fontSize: 14}}> Last Name </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={lname}
            onChangeText={(val) => setlname(val)}
            placeholder="Last Names "
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
            value={memberId}
            onChangeText={(val) => setmemberId(val)}
            placeholder="32601-3645123-8"
            keyboardType='numeric'
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
          <Text style={{marginLeft: '1%', fontSize: 14}}> Phone </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={PhoneNo}
            onChangeText={(val) => setPhoneNo(val)}
            placeholder="00 92 322 3445678"
            keyboardType='numeric'
            style={{height: 40}}
           />
            <Icon
              active
              name="phone"
              type="Entypo"
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
            placeholder="youremail@host.com"
            keyboardType='email-address'
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
          <Text style={{marginLeft: '1%', fontSize: 14}}> Password </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder="**********"
            style={{height: 40}}
           />
            <Icon
              active
              name="lock"
              type="Octicons"
              style={{fontSize: 18}}
            />
          </Item>
        </View>
        <View style={styles.inputOuter}>
          <Text style={{marginLeft: '1%', fontSize: 14}}> Education </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={Education}
            onChangeText={(val) => setEducation(val)}
            placeholder="Your Edu"
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
        <View style={styles.inputOuter}>
          <Text style={{marginLeft: '1%', fontSize: 14}}> Gender </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={Gender}
            onChangeText={(val) => setGender(val)}
            placeholder="Male/Female"
            style={{height: 40}}
           />
            <Icon
              active
              name="human-male-female"
              type="MaterialCommunityIcons"
              style={{fontSize: 18}}
            />
          </Item>
        </View>
        <View style={styles.inputOuter}>
          <Text style={{marginLeft: '1%', fontSize: 14}}> Level </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input 
            value={Level}
            onChangeText={(val) => setLevel(val)}
            placeholder="yourlevel"
            style={{height: 40}}
           />
            <Icon
              active
              name="book"
              type="MaterialCommunityIcons"
              style={{fontSize: 18}}
            />
          </Item>
        </View>
        <View style={styles.inputOuter}>
          <Text style={{marginLeft: '1%', fontSize: 14}}> DoB </Text>
          <Item
            style={{
              width: '95%',
              marginLeft: '2%',
              borderColor: 'black',
              borderWidth: 1,
            }}
            rounded>
            <Input
              placeholder=""
              style={{height: 40}}
              value={date.toString().slice(0, 15)}
              onTouchStart={() => setShow(true)}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Icon
              active
              name="calendar-alt"
              type="FontAwesome5"
              style={{fontSize: 18}}
            />
          </Item>
        </View>
        
        <Button onPress={()=> UpdateProfile()} danger={true} style={styles.btns} rounded>
          <Text>Register</Text>
        </Button>
        
      </KeyboardAwareScrollView>
    </Form>
 
  </Container>

  </>
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
