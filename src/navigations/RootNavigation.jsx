import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomePage} from '../screens/WelcomePage';
import {useAppTheme} from '../context/ThemeContext';
import {StatusBar} from 'react-native';
import {LoginPage} from '../screens/LoginPage';
import {ForgetPassword} from '../screens/ForgetPassword';
import {OtpVerification} from '../screens/OtpVerification';
import {ChangePassword} from '../screens/ChangePassword';
import {BottomNavigator} from './BottomNavigator';
import {CompletedTask} from '../screens/CompletedTask';
import { PendingTask } from '../screens/PendingTask';
import { FilterPage } from '../screens/FilterPage';
import { AdvancedFilter } from '../screens/AdvancedFilter';
import { ViewTaskPage } from '../screens/ViewTaskPage';
import { AddTaskScreen } from '../screens/AddTaskScreen';
import { EditTaskScreen } from '../screens/EditTask';
import { EditProfile } from '../screens/EditProfile';
import { AddUser } from "../screens/AddUser";
import { UpdatePassword } from '../screens/UpdatePassword';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

const HomeNavigator = () => {
  const {isDarkMode} = useAppTheme();
  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? 'black' : 'white'}
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
      />
      <Stack.Navigator initialRouteName="logedPage">
        <Stack.Screen
          name="welcome"
          component={WelcomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="forget"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="otp"
          component={OtpVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="changepassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="logedPage"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="completedTask"
          component={CompletedTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="pendingTask"
          component={PendingTask}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Filter"
          component={FilterPage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="advFilter"
          component={AdvancedFilter}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="viewTask"
          component={ViewTaskPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="addTask"
          component={AddTaskScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="editTask"
          component={EditTaskScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="addUser"
          component={AddUser}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="updatePassword"
          component={UpdatePassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};
