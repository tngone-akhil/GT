import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {style} from './UserManagement';

import {BoxView, Header, Loader} from '../shared/CommonComponent';
import {styles} from './TaskPage';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';

export function CompletedTask() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetAllCompletedTask();
  }, []);

  const renderItem = data => {
    const res = data.item;
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

  const GetAllCompletedTask = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.GETALLCOMPLETEDTASK;
      const response = await axiosIntercepted.get(URL);
      const result = response.data;
      setData(result);
      console.log(result)
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader />}
      <Header header={'Completed Task'} />

      <FlatList
        style={{backgroundColor: '#F2F4FF'}}
        data={data}
        renderItem={renderItem}
      />
      {/* <ScrollView style={{backgroundColor: '#F2F4FF'}}>
        <View style={styles.view}>
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'completed'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'completed'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'completed'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'completed'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'completed'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
}
