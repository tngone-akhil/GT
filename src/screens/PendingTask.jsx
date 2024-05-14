import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {style} from './UserManagement';

import {BoxView} from '../shared/CommonComponent';
import {styles} from './TaskPage';

export function PendingTask() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: 'white'}}>
        <Text style={[style.header, {marginLeft: 28, margin: 5}]}>
          Pending Task
        </Text>
      </View>
      <ScrollView style={{backgroundColor: '#F2F4FF'}}>
        <View style={styles.view}>
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'pending'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'pending'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'pending'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'pending'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
          <BoxView
            Header={'Candidate Management'}
            Subheader={'For - Zoho Project'}
            status={'pending'}
            Date={'June 27, 2022'}
            Place={'Canada'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
