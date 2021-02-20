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
    title,
    Item,
    Input,
    Button
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";


import Loader from "./Loader";

const OurServices = () => {
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [total, settotal] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [Budget, setbudget] = React.useState(0);

  const [service, setService] = React.useState('');
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
  Server.get('api/budget',{
    headers:{
        'Authorization': `Bearer ${login_row.access_token}`
    }
}).
then(res => {
    
     console.log(res.data[0].total_budget)
     settotal(res.data[0].total_budget);
    setEventsData(res.data);
   
    setloader(false);
}).
catch(err => {
  alert(err);
  setloader(false)
});
}


const addbudget  = () => { 
    setloader(true);
    setModal(false);
    console.log("old..........",total)
    console.log("input .........",Budget)
    const bd=parseInt(total) + parseInt(Budget)
    AsyncStorage.getItem('Login_row').
      then(val => {
          if (val == null) {
              navigation.navigate('LoginScreen');
          } else {
            const login_row = JSON.parse(val);
            Server.post(`api/budget`,{
              "total_budget":bd         
            },
            {
              headers:{
                  'Authorization': `Bearer ${login_row.access_token}`
              }
            }).
            then(res => {
              setIdDel('');
              setloader(true);
                alert('added')
                
                setModal(false);
                reFresh(login_row);
            }).
            catch(err => {
                alert(err);
                setloader(false);
            });
        }
      })
      setloader(false);
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
          <Text>Budget</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Icon active name="plus" type="AntDesign" />
          </TouchableOpacity>
        </Right>
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                    <View style={{width:'90%'}}>
                      <Text style={styles.title}>ID: {item.id}</Text>
                      <Text style={styles.desc}>Total Budget: {item.total_budget}</Text>
                      <Text style={styles.desc}>Education Budget: {item.education_budget}</Text>
                      <Text style={styles.desc}>Medical Budget: {item.medical_budget}</Text>
                      <Text style={styles.desc}>Marriage Budget: {item.marriage_budget}</Text>
                      <Text style={styles.desc}>Other Budget: {item.other_budget}</Text>
                   
                    </View>
                   
               
                    
                  
                </View>
            }
            keyExtractor={(item) => item.id.toString()}
          />
           <Modal
              animationType={'fade'}
              transparent={true}
              visible={modal}
              onRequestClose={() => setModal(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContainer}>
                  <View style={{width:'100%',marginVertical:10}}>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Budget</Text>
                    </View> 
                    <View style={{flexDirection: 'row', alignItems: 'center',margin:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                   
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Budget{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        multiline={true}
                        style={{textAlignVertical: 'top'}}
                       value={Budget}
                        type="number"
                        onChangeText={(val) => setbudget(parseInt(val))}
                          placeholder=""
                        />
                      </Item>
                    </View>
                   
                    <Button
                      danger={true}
                      style={styles.btns}
                      rounded
                      active={true}
                      onPressIn={() => addbudget()}
                      >
                      <Text style={styles.btnTxt}>Add</Text>
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
        height:200,
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
   
});

export default OurServices; 
