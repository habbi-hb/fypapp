import React, {useEffect} from 'react';
import {
  Container,
  Header,
 
  Left,
  Body,

  Text,
  Icon,
  View,
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
    const reFresh= (login_row) => {
      Server.get('api/budget',{
        headers:{
            'Authorization': `Bearer ${login_row.access_token}`
        }
    }).
    then(res => {
         setedu(res.data[0].education_budget);
         sethouse(res.data[0].house_budget);
         setmedical(res.data[0].medical_budget);
         setmarriage(res.data[0].marriage_budget);
         setother(res.data[0].other_budget);
        setloader(false);
    }).
    catch(err => {
      alert(err);
      setloader(false)
    });
    }


    
    const approvedService = () => {
        setloader(true);
        setModalDel(false);
        
        AsyncStorage.getItem('Login_row').
          then(val => {
              if (val == null) {
                  navigation.navigate('LoginScreen');
              } else {
                const login_row = JSON.parse(val);
                Server.put(`api/service/status/${idDel}`,{
                    "status" : "Approved",
                    "note" : "Approved By Admin"
                },
                {
                  headers:{
                      'Authorization': `Bearer ${login_row.access_token}`
                  }
                }).
                then(res => {
                  setbudgetmodel(true)
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
     
const addbudget  = () => { 
  eventsData.map((dd) => {
   if(dd.services==="Medical")
{  
  setloader(true);
  setModal(false);
  console.log("old..........",medical)
  console.log("input .........",Budget)
  const bd=parseInt(medical) + parseInt(Budget)
  AsyncStorage.getItem('Login_row').
    then(val => {
        if (val == null) {
            navigation.navigate('LoginScreen');
        } else {
          const login_row = JSON.parse(val);
          Server.post(`api/budget`,{
            
            "medical_budget":bd         
          },
          {
            headers:{
                'Authorization': `Bearer ${login_row.access_token}`
            }
          }).
          then(res => {
            
            navigation.navigate('AdminDashboard');
           
              setloader(false);
              setModal(false);
              setbudgetmodel(false)
              reFresh(login_row);
          }).
          catch(err => {
              alert(err);
              setloader(false);
          });
      }
    })
    setloader(false);
    return true;

  }else if (dd.services==="MarriageHelp")
  {
    setloader(true);
    setModal(false);
    console.log("old..........",marriage)
    console.log("input .........",Budget)
    const bd=parseInt(marriage) + parseInt(Budget)
    AsyncStorage.getItem('Login_row').
      then(val => {
          if (val == null) {
              navigation.navigate('LoginScreen');
          } else {
            const login_row = JSON.parse(val);
            Server.post(`api/budget`,{
              
              "marriage_budget":bd         
            },
            {
              headers:{
                  'Authorization': `Bearer ${login_row.access_token}`
              }
            }).
            then(res => {
              
                navigation.navigate('AdminDashboard');
               
                  setloader(false);
                setModal(false);
                setbudgetmodel(false)
            }).
            catch(err => {
                alert(err);
                setloader(false);
            });
        }
      })
      setloader(false);
      return true;
    }else if(dd.services==="Education")
    {
      setloader(true);
      setModal(false);
      console.log("old..........",edu)
      console.log("input .........",Budget)
      const bd=parseInt(edu) + parseInt(Budget)
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post(`api/budget`,{
                
                "education_budget":bd         
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
               
                navigation.navigate('AdminDashboard');
               
                  setloader(false);
                  setModal(false);
                  setbudgetmodel(false)
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
        setloader(false);
        return true;
    }else if(dd.services==="HouseHelp")
    {
      setloader(true);
      setModal(false);
      console.log("old..........",house)
      console.log("input .........",Budget)
      const bd=parseInt(house) + parseInt(Budget)
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post(`api/budget`,{
                
                "house_budget":bd         
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
               
                navigation.navigate('AdminDashboard');
               
                  setloader(false);
                  setModal(false);
                  setbudgetmodel(false)
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
        setloader(false);
        return true;
    }else {
      setloader(true);
      setModal(false);
      console.log("old..........",other)
      console.log("input .........",Budget)
      const bd=parseInt(other) + parseInt(Budget)
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post(`api/budget`,{
                
                "other_budget":bd         
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                navigation.navigate('AdminDashboard');
               
                  setloader(false);
                  setModal(false);
                  setbudgetmodel(false)
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
        setloader(false);
        return true;
    }
})
return;
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
          <Text>Services</Text>
        </Body>
        
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                    <View style={{width:'90%'}}>
                      <Text style={styles.title}> {item.services}</Text>
                      <Text style={styles.desc}> {item.form_object}</Text>
                      <Text style={styles.desc}> status '{item.status}'</Text>
                      <Text style={styles.date}> {item.note}</Text>
                    </View>
                    <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                  <Icon onPress={()=>{setModalDel2(true);setIdDel(item.id)}} 
                  style={{marginBottom:10,color:'#86eb7c',}} active name="checkcircleo" type="AntDesign"  />
             
                </View>
                    
                  
                </View>
            }
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
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Approve Service ?</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => approvedService()}
                      >
                      <Text style={styles.btnTxt}>Approve</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={budgetmodel}
              onRequestClose={() => setbudgetmodel(false)}
              on
              >
            <View style={{ flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'rgba(0,0,0,0.5)',
                            borderRadius:5,
                            padding:10,
                            alignItems:'center' }} >
                <View style={{ height:250,
                                width:300,
                                backgroundColor:'#fff',
                                borderRadius:15,
                                justifyContent:'space-between',
                                alignItems:'center',
                                alignSelf:'center'}} >
                  <View style={{width:'100%'}}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Budget</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
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
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => addbudget()}
                      >
                      <Text style={styles.btnTxt}>Add Budget</Text>
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
