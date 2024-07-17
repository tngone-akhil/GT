import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {style} from './UserManagement';
import Notification from '../images/svg/notificationIcon';
import {Loader, NotificationBox} from '../shared/CommonComponent';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';
import {useFocusEffect} from '@react-navigation/native';

export function NotificationPage() {
  const [refresh, setRefresh] = useState(false);
  const [data ,setData] = useState([])

  useFocusEffect(
    useCallback(() => {
      const notifications = async () => {
        await GetNotification(true);
      };
      notifications();
      return () => {};
    }, []),
  );

  const GetNotification = async () => {
    try {
      setRefresh(true);
      const URL = BUSINESS_ENDPOINTS.GET_NOTIFICATION;
      const response = await axiosIntercepted.get(URL);
      setData(response.data.notificationList);
      setRefresh(false);
    } catch (err) {
      setRefresh(false);

    }
  };
  return (
    <SafeAreaView style={style.Container}>
      {refresh && <Loader />}
      <View style={{alignItems: 'center'}}>
        <Text style={style.header}>Notification</Text>
      </View>
      <ScrollView>
        <View style={{marginTop: 10}}>
          {data.map((item, index) => {
            return (
              <NotificationBox
              readable={item.isRead}
              notification={item.message}
              details={item.createdDate}
              key={index}/>
            );
          })}
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
