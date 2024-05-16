import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';

import {BoxView, Header, Loader} from '../shared/CommonComponent';
import {styles} from './TaskPage';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import useAxiosPrivate from '../hooks/useAxios';

export function PendingTask() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const axiosIntercepted = useAxiosPrivate();
  useEffect(() => {
    GetAllPendingTask();
  }, []);

  const GetAllPendingTask = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.GETALLPENDINGTASK;
      const response = await axiosIntercepted.get(URL);
      const result = response.data;
      setData(result);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = item => {
    const res = item.item;
    return (
      <View style={styles.view}>
        <BoxView
          Header={res.concept}
          Subheader={res.maintenanceWork}
          status={res.status}
          Date={res.approvedQuotationDate}
          Place={res.location}
          Function={() => navigation.navigate('editTask')}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader />}
      <Header header={'Pending Task'} />
      {/* <ScrollView style={{backgroundColor: '#F2F4FF'}}> */}
      {/* {data.map((res, index) => {
            return (
              <View style={styles.view}>
              <BoxView
                key={index}
                Header={res.concept}
                Subheader={res.maintenanceWork}
                status={res.status}
                Date={res.approvedQuotationDate}
                Place={res.location}
                Function={()=>navigation.navigate('editTask')}
              />
              </View>
            );
          })} */}

      <FlatList style={{backgroundColor: '#F2F4FF'}} data={data} renderItem={renderItem}  />

      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
