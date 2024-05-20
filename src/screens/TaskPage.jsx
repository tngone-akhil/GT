import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {style} from './UserManagement';
import Download from '../images/svg/Download';
import Filter from '../images/svg/FilterBlack';
import Vector from '../images/svg/Vector';

import {BoxView, Loader} from '../shared/CommonComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import { axiosIntercepted } from '../services';

export function TaskPage() {

  const navigation = useNavigation()
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getTask = async () => {
        await GetAllTask(true);
      };
      getTask();
      return () => {};
    }, []),
  );


  const renderItem = data => {
    const res = data.item;
    return (
      <View style={styles.view}>
        <BoxView
         navig={()=>navigation.navigate('viewTask',{task:res})}
          Header={res.concept}
          Subheader={res.maintenanceWork}
          status={res.status}
          Date={res.approvedQuotationDate}
          Place={res.location}
          Function={() => navigation.navigate('editTask',{task:res})}
        />
      </View>
    );
  };

  const GetAllTask = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.GETALLTASK;
      const BODY = JSON.stringify(
        {
          concept: "",
          location: "",
          poc: "",
          responsibility: "",
          status: "",
          priority: "",
          toDate: "0001-01-01",
          fromDate: "0001-01-01"
        }
      )
      const response = await axiosIntercepted.post(URL,BODY);
      const result = response.data;
      setData(result);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader/>}
      <View style={{paddingBottom: 15}}>
        <Text style={[style.header]}>Task Management</Text>
        <TouchableOpacity style={styles.download}>
          <Download />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('advFilter');
          }}
          style={[styles.download, {right: 7}]}>
          <Filter />
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={{backgroundColor: '#F2F4FF'}}> */}
        {/* <View style={styles.view}> */}
          <FlatList style={{backgroundColor: '#F2F4FF'}} data={data} renderItem={renderItem} />
          {/* {data.map((item, index) => {
            return (            
              <BoxView
                key={index}
                Header={item.header}
                Subheader={item.Subheader}
                status={item.status}
                Date={item.date}
                Place={item.place}
                Function={()=>navigation.navigate('editTask')}
              />
            );
          })} */}
        {/* </View> */}
      {/* </ScrollView> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('addTask')}
        style={[style.addButton, {bottom: 70}]}>
        <Vector style={{position: 'relative', top: 17, left: 18}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  download: {
    position: 'absolute',
    right: 40,
    top: 14,
  },
  view: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
