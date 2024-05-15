import React from 'react';
import {
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

import {BoxView} from '../shared/CommonComponent';
import { useNavigation } from '@react-navigation/native';
let data = [
  {
    header: 'candidate Management',
    Subheader: 'For - Zoho Project',
    status: 'completed',
    date: 'June 27, 2022',
    place: 'canada',
  },
  {
    header: 'candidate Management',
    Subheader: 'For - Zoho Project',
    status: 'completed',
    date: 'June 27, 2022',
    place: 'canada',
  },
  {
    header: 'candidate Management',
    Subheader: 'For - Zoho Project',
    status: 'pending',
    date: 'June 27, 2022',
    place: 'canada',
  },
  {
    header: 'candidate Management',
    Subheader: 'For - Zoho Project',
    status: 'completed',
    date: 'June 27, 2022',
    place: 'canada',
  },
  {
    header: 'candidate Management',
    Subheader: 'For - Zoho Project',
    status: 'pending',
    date: 'June 27, 2022',
    place: 'canada',
  },
];
export function TaskPage() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingBottom: 15}}>
        <Text style={[style.header]}>Task Management</Text>
        <TouchableOpacity style={styles.download}>
          <Download />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('advFilter')}} style={[styles.download, {right: 7}]}>
          <Filter />
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: '#F2F4FF'}}>
        <View style={styles.view}>
          {data.map((item, index) => {
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
          })}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={()=>navigation.navigate("addTask")} style={[style.addButton, {bottom: 70}]}>
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
