import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  List,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import Loader from "../Loader";

export default function DrawerContent(props) {
 
  const [expanded, setExpanded] = useState([false,false,false,false,false,false,false,false]);
  const [loader, setloader] = React.useState(false);
 
  

  // console.log("arry");
  // console.log(arry);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>
                 Sameer
                </Title>
                <Caption style={styles.caption}>
                  @sameer
                </Caption>
              </View>
            </View>
          </View>
          <Loader loading={loader} />
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
            />
         
            <DrawerItem
              icon={({color, size}) => (
                <Icons name="like2" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Adminupdateprofile');
              }}
              label="Update Profile"
            
            />
           
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="room-service-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('AdminServices');
              }}
              label="Services"
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="call-split" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('AdminAnnouncements');
              }}
              label="Announcement"
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              onPress={() => {
                setloader(true);
                props.navigation.navigate('Welcome');
                setloader(false);
              }}
              label="Log Out"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
