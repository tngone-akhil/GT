import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Filter from '../images/svg/Filter';
import Score from '../images/svg/score';
import {Loader, RoundView} from '../shared/CommonComponent';
import TickSquare from '../images/svg/Ticksquare';
import Friend from '../images/svg/Friend';
import Document from '../images/svg/docu';
import Upload from '../images/svg/Upload';
import Adduser from '../images/svg/adduser';
import ThreeUser from '../images/svg/threeuser';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import useAxiosPrivate from '../hooks/useAxios';

export function HomePage() {
  const navigation = useNavigation();
  const axiosIntercepted = useAxiosPrivate();
  const [performanceScore,setPerformanceScore] = useState(0)
  const [adminCount,setAdminCount] = useState(0)
  const [clientCount,setClientCount] = useState(0)
  const [completedTaskCount,setCompletedTaskCount] = useState(0)
  const [pendingTaskCount,setPendingTaskCountt] = useState(0)
  const [totalTaskCount,setTotalTaskCount] = useState(0)
  const [totalUserCount,setTotalUserCount] = useState(0)
  const [loader,setLoader] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const getKeyPairValue = async () => {
        await getKeyPairValues(true);
      };
      getKeyPairValue();
      return () => {};
    }, []),
  );

  const getKeyPairValues = async () => {
    // setRefreshing(true);
    try {
      setLoader(true)
      const URL = BUSINESS_ENDPOINTS.GETKEYVALUE;
      const BODY = JSON.stringify({
        toDate: "0001-01-01",
        fromDate: "0001-01-01",
        location: "",

      });
      

      const response = await axiosIntercepted.post(URL, BODY);
      const results = response.data;
      setAdminCount(results.adminCount)
      setClientCount(results.clientCount)
      setCompletedTaskCount(results.completedTaskCount)
      setPendingTaskCountt(results.pendingTaskCount)
      setTotalTaskCount(results.totalTaskCount)
      setTotalUserCount(results.totalUserCount)
      setPerformanceScore(results.performanceScore)
      setLoader(false)
      // generalHelpers.fetchLookups();
      // generalHelpers.storeToken(results.userId);
      // NEW_USER.isHeadQuarters = results.isHeadQuarters;
    } catch (err) {
      console.log(err);
      // setRefreshing(false);
      // Toast.show({
      //   visibilityTime: 2000,
      //   bottomOffset: 40,
      //   position: 'bottom',
      //   type: 'error',
      //   text1: ApiErrorTexts.oops,
      //   text2: ApiErrorTexts.something,
      // });
    } finally {
      // setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      {loader && <Loader/>}
      <View style={style.back}>
        <Text style={style.text}>Hi,Alex Turner</Text>
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
          onPress={() => navigation.navigate('Filter')}
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
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#ECF3FF'}]}>
          <View>
            <Text style={style.boxText}>Total User</Text>
            <RoundView color={'#2051E5'} />
            <Text style={[style.insideboxtext, {color: '#2051E5'}]}>{totalUserCount}</Text>
            <ThreeUser style={[style.svg, {top: 76}]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#FEF1F1'}]}>
          <View>
            <Text style={style.boxText}>Total Client</Text>
            <Text style={[style.insideboxtext, {color: '#FF4B4B'}]}>{clientCount}</Text>
            <RoundView color={'#FF4B4B'} />
            <Friend style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#FFE3C1'}]}>
          <View>
            <Text style={style.boxText}>Total Admin</Text>
            <RoundView color={'#AD6510'} />
            <Text style={[style.insideboxtext, {color: '#AD6510'}]}>{adminCount}</Text>
            <Adduser style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Task')}
          style={[style.onerow, {backgroundColor: '#F3EDFF'}]}>
          <View>
            <Text style={style.boxText}>Total Task</Text>
            <RoundView color={'#7000FE'} />
            <Text style={[style.insideboxtext, {color: '#7000FE'}]}>{totalTaskCount}</Text>
            <Document style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('pendingTask')}
          style={[style.onerow, {backgroundColor: '#FFF8E8'}]}>
          <View>
            <Text style={style.boxText}>Pending Task</Text>
            <RoundView color={'#F0AD00'} />
            <Text style={[style.insideboxtext, {color: '#F0AD00'}]}>{pendingTaskCount}</Text>
            <Upload style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('completedTask')}
          style={[style.onerow, {backgroundColor: '#E8FAF2'}]}>
          <View>
            <Text style={style.boxText}>Completed Task</Text>
            <RoundView color={'#10B559'} />
            <Text style={[style.insideboxtext, {color: '#10B559'}]}>{completedTaskCount}</Text>
            <TickSquare style={[style.svg, {right: 23}]} />
          </View>
        </TouchableOpacity>
      </View>
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
    paddingLeft: "7%",
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
});
