import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Calender from '../images/svg/Calendar';
import Location from '../images/svg/Location';
import Edit from '../images/svg/Edit';
import Notification from '../images/svg/notificationIcon';
import Arrow from '../images/svg/arrow';
import Clock from '../images/svg/Time';
import {useNavigation} from '@react-navigation/native';

function RoundView({color}) {
  return <View style={[style.round, {backgroundColor: color}]}></View>;
}

function BoxView({Date, Place, status, Header, Subheader, Function,navig}) {
  return (
    <TouchableOpacity  onPress={navig} style={style.boxMainView}>
      <View style={style.boxInnerTopView}>
        <View style={{margin: 20}}>
          <Text style={{color: 'black', fontSize: 15, marginVertical: 3}}>
            {Header}
          </Text>
          <Text style={{color: 'black'}}>{Subheader}</Text>
        </View>
        <View style={{margin: 25}}>
          <Text style={{color: status == 'PENDING' ? 'orange' : 'green'}}>
            {status}
          </Text>
        </View>
      </View>
      <View style={style.boxInnerDownView}></View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{marginLeft: 20}}>
          <Text>Date</Text>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 8}}>
            <Calender />
            <Text style={{marginLeft: 3, color: 'black'}}>{Date}</Text>
          </View>
        </View>
        <View>
          <Text>Location</Text>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 8}}>
            <Location />
            <Text style={{marginLeft: 3, color: 'black'}}>{Place}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={Function}
            style={{marginRight: 15, marginTop: 20}}>
            <Edit />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function UserBox({name, email, role}) {
  return (
    <View style={style.EachView}>
      <View style={{width: '50%'}}>
        <Text style={style.name}>{name}</Text>
        <Text style={style.email}>{email}</Text>
        <Text style={style.role}>{role}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity style={style.edit}>
          <Text style={{color: 'blue'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.delete}>
          <Text style={{color: 'red'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NotificationBox({notificationhalf, notification, details}) {
  return (
    <TouchableOpacity>
      <View style={style.notificationView}>
        <View>
          <Notification />
        </View>
        <View style={{marginLeft: 15}}>
          <Text style={style.notiText}>
            {notification}
            <Text style={{fontWeight: '400'}}> {notificationhalf}</Text>
          </Text>
          <Text style={{marginVertical: 5}}>{details}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function TouchableOpacityTextbox({onpress, value, isClock = false}) {
  return (
    <TouchableOpacity style={style.touchableOpacity} onPress={onpress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{padding: 10, top: 3}}>{value}</Text>
        {!isClock ? (
          <Calender style={style.calender} />
        ) : (
          <Clock style={style.calender} />
        )}
      </View>
    </TouchableOpacity>
  );
}

function Header({header}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Arrow style={{marginTop: 10, left: 10}} />
      </TouchableOpacity>
      <Text style={[style.Header, {top: -5}]}>{header}</Text>
      <Text></Text>
    </View>
  );
}

function RemarkBox({message, name, dateAndTime}) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '90%',
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
      }}>
      <View
        style={{
          height: '65%',
          backgroundColor: '#EBF4FD',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <Text style={{margin: 10}}>{message}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{margin: 7}}>{name}</Text>
        <Text style={{margin: 7}}>{dateAndTime}</Text>
      </View>
    </View>
  );
}

function Loader({style}) {
  return (
    <View style={[{position: 'absolute', top: '50%', zIndex: 1, left: '48%'},style]}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}

const style = StyleSheet.create({
  round: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    top: 60,
    right: 10,
  },
  Header: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingTop: 5,
    alignSelf: 'center',
  },
  boxMainView: {
    width: '95%',
    backgroundColor: 'white',
    height: 170,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 8,
  },
  boxInnerTopView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxInnerDownView: {
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  EachView: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    width: '95%',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    backgroundColor: 'white',
  },
  name: {
    color: 'black',
    fontSize: 18,
    margin: 10,
    fontWeight: '500',
    marginBottom: 0,
  },
  email: {
    marginLeft: 10,
    color: 'black',
  },
  role: {
    marginLeft: 10,
    color: 'blue',
    marginTop: 3,
  },
  edit: {
    height: 35,
    backgroundColor: '#EDF1FF',
    width: '30%',
    borderRadius: 5,
    marginTop: 30,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  delete: {
    height: 35,
    backgroundColor: '#FFE7E8',
    width: '34%',
    borderRadius: 5,
    marginTop: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  notificationView: {
    height: 90,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  notiText: {
    color: 'black',
    fontSize: 17,
    marginBottom: 7,
    fontWeight: 'bold',
  },
  touchableOpacity: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  calender: {
    top: 10,
    right: 10,
  },
});

export {
  RoundView,
  BoxView,
  UserBox,
  NotificationBox,
  TouchableOpacityTextbox,
  Header,
  RemarkBox,
  Loader
};
