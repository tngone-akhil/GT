import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {style} from './UserManagement';
import Notification from '../images/svg/notificationIcon';
import {NotificationBox} from '../shared/CommonComponent';

export function NotificationPage() {
  return (
    <SafeAreaView style={style.Container}>
      <View style={{alignItems: 'center'}}>
        <Text style={style.header}>Notification</Text>
      </View>
      <ScrollView>
        <View style={{marginTop: 10}}>
          <NotificationBox
            notification={'New Task'}
            notificationhalf={'created'}
            details={'Last Wednesday at 9:45 am'}
          />
          <NotificationBox
            notification={'New Task'}
            notificationhalf={'created'}
            details={'Last Wednesday at 9:45 am'}
          />
          <NotificationBox
            notification={'New Task'}
            notificationhalf={'created'}
            details={'Last Wednesday at 9:45 am'}
          />
          <NotificationBox
            notification={'New Task'}
            notificationhalf={'created'}
            details={'Last Wednesday at 9:45 am'}
          />
          <NotificationBox
            notification={'New Task'}
            notificationhalf={'created'}
            details={'Last Wednesday at 9:45 am'}
          />
          <NotificationBox
            notification={'New Task'}
            notificationhalf={'created'}
            details={'Last Wednesday at 9:45 am'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
