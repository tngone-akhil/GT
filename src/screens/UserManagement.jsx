import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Vector from '../images/svg/Vector';
import {Loader, UserBox} from '../shared/CommonComponent';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    userList();
  }, []);

  const refreshPage = () => {
    setPageNumber(pageNumber + 1);
    userList();
  };

  const userList = async () => {
    try {
      const URL = BUSINESS_ENDPOINTS.GETALLUSER;
      const BODY = JSON.stringify({
        pageNumber: pageNumber,
        rowsPerPage: rowsPerPage,
      });
      const response = await axiosIntercepted.post(URL, BODY);
      setUsers(users.concat(response.data.users));
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = item => {
    const res = item.item;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        <UserBox email={res.email} name={res.userName} role={res.userType} />
      </View>
    );
  };

  return (
    <SafeAreaView style={style.Container}>
      {loading && <Loader/>}
      <View style={{height: 65}}>
        <Text style={style.header}>User Management</Text>
        <TouchableOpacity style={style.addButton}>
          <Vector style={{position: 'absolute', top: 16, right: 17}} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        onEndReached={refreshPage}
      />
    </SafeAreaView>
  );
}

export const style = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingTop: 5,
    alignSelf: 'center',
  },
  addButton: {
    position: 'absolute',
    height: 55,
    width: 55,
    backgroundColor: 'blue',
    borderRadius: 50,
    right: 10,
  },
});
