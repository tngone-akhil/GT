import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomePage} from '../screens/HomePage';
import HomeFocused from '../images/svg/homeFocused';
import HomeNotFocused from '../images/svg/home';
import Notification from '../images/svg/Notification'
import User from '../images/svg/User'
import Settings from '../images/svg/Setting'
import Task from '../images/svg/Document'
import NotificationFocused from '../images/svg/Notificationfocused'
import UserFocused from '../images/svg/Userfocused'
import SettingsFocused from '../images/svg/Settingfocused'
import TaskFocused from '../images/svg/DocumentFocused'
import {Platform} from 'react-native';
import { UserManagement } from '../screens/UserManagement';
import { TaskPage } from '../screens/TaskPage';
import { SettingPage } from '../screens/SettingPage';
import { NotificationPage } from '../screens/NotificationPage';

const tab = createBottomTabNavigator();
export function BottomNavigator() {
  return (
    <tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: [
          {
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: Platform.OS === 'ios' ? 90 : 80,
            padding: Platform.OS === 'ios' ? 20 : 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 0.9,
            shadowRadius: 5,
            elevation: 10,
            // position: 'absolute',
          },
        ],
        tabBarLabelStyle: {
          bottom: Platform.OS === 'android' ? 15 : 0,
          fontSize: 12,
        },
        tabBarIcon: ({focused}) => {
          let iconComponent;
          if (route.name === 'Home') {
            iconComponent = focused ? <HomeFocused /> : <HomeNotFocused />;
          } else if (route.name === 'User') {
            iconComponent = focused ? <UserFocused /> : <User />;
          }else if (route.name === 'Task') {
            iconComponent = focused ? <TaskFocused /> : <Task />;
          }else if (route.name === 'Notification') {
            iconComponent = focused ? <NotificationFocused/> : <Notification />;
          }else if (route.name === 'Settings') {
            iconComponent = focused ? <SettingsFocused /> : <Settings />;
          }
          return iconComponent;
        },
      })}>
      <tab.Screen name="Home" component={HomePage} />
      <tab.Screen name="User" component={UserManagement} />
      <tab.Screen name="Task" component={TaskPage}></tab.Screen>
      <tab.Screen name="Notification" component={NotificationPage}></tab.Screen>
      <tab.Screen name="Settings" component={SettingPage}></tab.Screen>
    </tab.Navigator>
  );
}
