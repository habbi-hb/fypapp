/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  key,
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Screen1 from './MyServices1';
import Screen4 from "./MYScreen3";
import Screen2 from './MyServices2';

const Tab = createBottomTabNavigator();

const App = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);

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
            User Dashboard
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
   
      <ScrollView>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
            
            justifyContent:'space-evenly'
          }}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            width: 150,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
            }}
            onPress={() => navigation.navigate('Education')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/edu.png')}
                  style={{height: 50, width: 65}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Education</Text>
            </View>


            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, width: 150, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,}}
            onPress={() => navigation.navigate('househelp')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/house.png')}
                  style={{height: 50, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>House Help</Text>
            </View>


            </TouchableOpacity>
         
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
            
            justifyContent:'space-evenly'
          }}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            width: 150,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
            }}
            onPress={() => navigation.navigate('Medical')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/medical.png')}
                  style={{height: 60, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Medical</Text>
            </View>


            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, width: 150, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,}}
            onPress={() => navigation.navigate('Marriagehelp')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/mirage.png')}
                  style={{height: 50, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Marriage Help</Text>
            </View>


            </TouchableOpacity>
         
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
            
            justifyContent:'space-evenly'
          }}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            width: 150,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
            }}
            onPress={() => navigation.navigate('Arbitration')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/Arbitration.png')}
                  style={{height: 50, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Arbitration</Text>
            </View>


            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, width: 150, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,}}
            onPress={() => navigation.navigate('GraveYard')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/GraveYard.png')}
                  style={{height: 50, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>GraveYard</Text>
            </View>


            </TouchableOpacity>
         
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
            
            justifyContent:'space-evenly'
          }}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            width: 150,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
            }}
            onPress={() => navigation.navigate('Employement')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/Employment.png')}
                  style={{height: 50, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Employment</Text>
            </View>


            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, width: 150, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,}}
            onPress={() => navigation.navigate('YouthandIT')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                  source={require('./assets/Youth.png')}
                  style={{height: 50, width: 50}}
                />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Youth and IT</Text>
            </View>


            </TouchableOpacity>
         
        </View>

      </ScrollView>
    </Container>
  );
};
const Services = () => {
  let [currentScreen, setCurrentScreen] = useState();
  let [show, setShow] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home3"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home2"
        component={Screen1}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '120%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Services
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}>
              <Image
                source={require('./assets/9.png')}
                style={{height: 30, width: 30}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home3"
        component={App}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(App)}>
              <Icon
                type="Ionicons"
                name="home"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={() => <Text></Text>}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                }}></Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  position: 'relative',
                  borderRadius: 50,
                  width: 60,
                  top: -25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {show && (
                  <Animatable.View
                    animation="zoomInUp"
                    style={{
                      position: 'absolute',
                      zIndex: 122,
                      top: -40,
                      flexDirection: 'row',
                      width: 120,
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      borderRadius: 25,
                      elevation: 10,
                      padding: 5,
                    }}>
                    <Icon
                      type="Zocial"
                      name="statusnet"
                      style={{fontSize: 20, color: 'black'}}
                    />
                    <Text>{'  '} Status</Text>
                  </Animatable.View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fe019a',
                    height: 50,
                    borderRadius: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setShow(!show)}>
                  <Icon
                    type="Feather"
                    name="plus"
                    style={{fontSize: 25, color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home4"
        component={Screen1}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {' '}
                Approvals
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '115%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}>
              <Icon
                type="AntDesign"
                name="checkcircleo"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
        <Tab.Screen
        name="Home5"
        component={Screen4}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {' '}
                Annoucement
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '115%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}
             >
              <Icon
                type="MaterialCommunityIcons"
                name="call-split"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />

    </Tab.Navigator>
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

export default Services;
