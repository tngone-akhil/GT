import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Filter from '../images/svg/Filter';
import Score from '../images/svg/score';
import {
  Loader,
  RoundView,
  TouchableOpacityTextbox,
} from '../shared/CommonComponent';
import TickSquare from '../images/svg/Ticksquare';
import Friend from '../images/svg/Friend';
import Document from '../images/svg/docu';
import Upload from '../images/svg/Upload';
import Adduser from '../images/svg/adduser';
import ThreeUser from '../images/svg/threeuser';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import useAxiosPrivate from '../hooks/useAxios';
import {useAuth} from '../context/AuthContext';
import Arrow from '../images/svg/arrow';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {styles} from './TaskPage';
import {DateTimePickerComponent} from '../shared/DateTimePicker';

export function HomePage() {
  const {auth} = useAuth();
  const navigation = useNavigation();
  const axiosIntercepted = useAxiosPrivate();
  const [performanceScore, setPerformanceScore] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTaskCount, setPendingTaskCountt] = useState(0);
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [loader, setLoader] = useState(false);

  const unFilter = {
    toDate: 'To',
    fromDate: 'From',
    location: '',
  };

  const [filter, setFilter] = useState({
    toDate: 'To',
    fromDate: 'From',
    location: '',
  });
  const [toValue, setToValue] = useState('To');
  const [fromValue, setFromValue] = useState('From');

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const [filterModal, setFilerModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getKeyPairValue = async () => {
        await getKeyPairValues(true);
      };
      getKeyPairValue();
      return () => {};
    }, []),
  );

  const onDateChangeFrom = (event, value) => {
    if (Platform.OS === 'android') {
      setModalVisible(false);
    }
    setFromDate(value);
    const date = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    const month =
      value.getMonth() < 10 ? '0' + (value.getMonth() + 1) : value.getMonth();
    setFilter(prev => {
      return {
        ...prev,
        fromDate: value.getUTCFullYear() + '-' + month + '-' + date,
      };
    });
  };

  const onDateChangeTo = (event, value) => {
    if (Platform.OS === 'android') {
      setModalVisibleTo(false);
    }
    setToDate(value);
    const date = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    const month =
      value.getMonth() < 10 ? '0' + (value.getMonth() + 1) : value.getMonth();
    setFilter(prev => {
      return {
        ...prev,
        toDate: value.getUTCFullYear() + '-' + month + '-' + date,
      };
    });
  };

  const getKeyPairValues = async () => {
    // setRefreshing(true);
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.GETKEYVALUE;
      const BODY = JSON.stringify({
        toDate: filter.toDate == 'To' ? '0001-01-01' : filter.toDate,
        fromDate: filter.fromDate == 'From' ? '0001-01-01' : filter.fromDate,
        location: filter.location,
      });

      const response = await axiosIntercepted.post(URL, BODY);
      const results = response.data;
      setAdminCount(results.adminCount);
      setClientCount(results.clientCount);
      setCompletedTaskCount(results.completedTaskCount);
      setPendingTaskCountt(results.pendingTaskCount);
      setTotalTaskCount(results.totalTaskCount);
      setTotalUserCount(results.totalUserCount);
      setPerformanceScore(results.performanceScore);
      setLoader(false);
      // generalHelpers.fetchLookups();
      // generalHelpers.storeToken(results.userId);
      // NEW_USER.isHeadQuarters = results.isHeadQuarters;
    } catch (err) {
      console.log(err);
    } finally {
      // setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      {loader && <Loader />}
      <View style={style.back}>
        <Text style={style.text}>Hi,{auth.username}</Text>
        <Text
          style={{
            color: 'white',
            paddingLeft: 13,
            fontWeight: '300',
            fontSize: 17,
            margin: 0,
          }}>
          Good Morning
        </Text>
        <TouchableOpacity
          onPress={() => setFilerModal(true)}
          style={{position: 'absolute', right: 10, top: 10}}>
          <Filter />
        </TouchableOpacity>
      </View>
      <View style={style.front}>
        <View style={{width: '50%'}}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: '400',
              color: '#0368E9',
              margin: 20,
              marginBottom: 10,
            }}>
            Performance Score
          </Text>
          <Text style={style.scoreStyle}>{Math.trunc(performanceScore)}</Text>
        </View>

        <Score style={{position: 'absolute', right: 30, top: 30}} />
      </View>
      <Text
        style={{
          marginTop: '26%',
          marginLeft: '6%',
          color: 'black',
          fontSize: 17,
          fontWeight: '500',
        }}>
        Report View
      </Text>

      <View style={style.reportView}>
        {auth.role != 'CLIENT' && (
          <TouchableOpacity
            style={[style.onerow, {backgroundColor: '#ECF3FF'}]}>
            <View>
              <Text style={style.boxText}>Total User</Text>
              <RoundView color={'#2051E5'} />
              <Text style={[style.insideboxtext, {color: '#2051E5'}]}>
                {totalUserCount}
              </Text>
              <ThreeUser style={[style.svg, {top: 76}]} />
            </View>
          </TouchableOpacity>
        )}
        {auth.role != 'CLIENT' && (
          <TouchableOpacity
            style={[style.onerow, {backgroundColor: '#FEF1F1'}]}>
            <View>
              <Text style={style.boxText}>Total Client</Text>
              <Text style={[style.insideboxtext, {color: '#FF4B4B'}]}>
                {clientCount}
              </Text>
              <RoundView color={'#FF4B4B'} />
              <Friend style={style.svg} />
            </View>
          </TouchableOpacity>
        )}
        {auth.role != 'CLIENT' && (
          <TouchableOpacity
            style={[style.onerow, {backgroundColor: '#FFE3C1'}]}>
            <View>
              <Text style={style.boxText}>Total Admin</Text>
              <RoundView color={'#AD6510'} />
              <Text style={[style.insideboxtext, {color: '#AD6510'}]}>
                {adminCount}
              </Text>
              <Adduser style={style.svg} />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Task')}
          style={[style.onerow, {backgroundColor: '#F3EDFF'}]}>
          <View>
            <Text style={style.boxText}>Total Task</Text>
            <RoundView color={'#7000FE'} />
            <Text style={[style.insideboxtext, {color: '#7000FE'}]}>
              {totalTaskCount}
            </Text>
            <Document style={style.svg} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('pendingTask')}
          style={[style.onerow, {backgroundColor: '#FFF8E8'}]}>
          <View>
            <Text style={style.boxText}>Pending Task</Text>
            <RoundView color={'#F0AD00'} />
            <Text style={[style.insideboxtext, {color: '#F0AD00'}]}>
              {pendingTaskCount}
            </Text>
            <Upload style={style.svg} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('completedTask')}
          style={[style.onerow, {backgroundColor: '#E8FAF2'}]}>
          <View>
            <Text style={style.boxText}>Completed Task</Text>
            <RoundView color={'#10B559'} />
            <Text style={[style.insideboxtext, {color: '#10B559'}]}>
              {completedTaskCount}
            </Text>
            <TickSquare style={[style.svg, {right: 23}]} />
          </View>
        </TouchableOpacity>
      </View>
      <Modal presentationStyle="formSheet" visible={filterModal}>
        <SafeAreaView style={[style.Container]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setFilerModal(false);
              }}>
              <Arrow style={{marginTop: 10, left: 10}} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: '600',
                left: 20,
              }}>
              Filters
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFilter(unFilter);
              }}
              style={{
                backgroundColor: '#E7EDFF',
                width: 80,
                height: 30,
                borderRadius: 30,
                marginTop: 10,
                right: 10,
              }}>
              <Text style={{textAlign: 'center', color: 'blue', marginTop: 5}}>
                Clear Filter
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'black',
                margin: 10,
              }}>
              Date
            </Text>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacityTextbox
                value={filter.fromDate}
                onpress={() => {
                  setModalVisible(true);
                }}
              />
              <TouchableOpacityTextbox
                value={filter.toDate}
                onpress={() => {
                  setModalVisibleTo(true);
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              {auth.role != 'CLIENT' && (
                <InputTextComponent
                  onchange={value => {
                    setFilter(prev => {
                      return {...prev, location: value};
                    });
                  }}
                  TextUpper={'Location'}
                  placeHolder={'Enter Location'}
                  value={filter.location}
                  upperFont={{fontWeight: '500', marginLeft: 10, fontSize: 16}}
                />
              )}
              <ButtonComponent
                title={'Apply'}
                onPresscomponent={() => {
                  setFilerModal(false);
                  getKeyPairValues();
                }}
                buttonStyle={styles.button}
                textStyle={styles.textLogin}
              />
            </View>
          </ScrollView>

          {modalVisible && (
            <DateTimePickerComponent
              functioning={onDateChangeFrom}
              mode={'date'}
              value={fromDate}
            />
          )}

          {modalVisibleTo && (
            <DateTimePickerComponent
              functioning={onDateChangeTo}
              mode={'date'}
              value={toDate}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    backgroundColor: '#2051E5',
    height: '22%',
  },
  text: {
    fontWeight: '500',
    fontSize: 25,
    color: 'white',
    padding: 10,
  },
  front: {
    position: 'absolute',
    top: 115,
    left: 15,
    height: '17%',
    width: '93%',
    backgroundColor: '#E4EEFF',
    borderRadius: 20,
  },
  onerow: {
    width: '43%',
    height: 125,
    borderRadius: 20,
  },
  svg: {
    position: 'absolute',
    top: 74,
    right: 25,
  },
  boxText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    margin: 20,
  },
  insideboxtext: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 30,
  },
  scoreStyle: {
    color: '#0368E9',
    width: 55,
    borderColor: '#0368E9',
    borderWidth: 1,
    paddingLeft: '9%',
    borderRadius: 20,
    marginLeft: 25,
    fontWeight: '500',
    fontSize: 17,
  },
  reportView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 20,
    flexWrap: 'wrap',
    gap: 18,
  },
  modal: {
    margin: 60,
    marginTop: 200,
  },
  touchableOpacity: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  calender: {
    top: 10,
    right: 10,
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '97%',
    borderRadius: 30,
    marginTop: 80,
    marginLeft: 10,
  },
  textLogin: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginTop: 14,
  },
  upperText: {
    paddingLeft: 10,
  },
});
