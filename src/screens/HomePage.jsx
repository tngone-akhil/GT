import React from 'react';
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
import {RoundView} from '../shared/CommonComponent';
import TickSquare from '../images/svg/Ticksquare';
import Friend from '../images/svg/Friend';
import Document from '../images/svg/docu';
import Upload from '../images/svg/Upload';
import Adduser from '../images/svg/adduser';
import ThreeUser from '../images/svg/threeuser';
import {useNavigation} from '@react-navigation/native';

export function HomePage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.container}>
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
          <Text style={style.scoreStyle}>28</Text>
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
            <Text style={[style.insideboxtext, {color: '#2051E5'}]}>10</Text>
            <ThreeUser style={[style.svg, {top: 76}]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#FEF1F1'}]}>
          <View>
            <Text style={style.boxText}>Total Client</Text>
            <Text style={[style.insideboxtext, {color: '#FF4B4B'}]}>10</Text>
            <RoundView color={'#FF4B4B'} />
            <Friend style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#FFE3C1'}]}>
          <View>
            <Text style={style.boxText}>Total Admin</Text>
            <RoundView color={'#AD6510'} />
            <Text style={[style.insideboxtext, {color: '#AD6510'}]}>10</Text>
            <Adduser style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#F3EDFF'}]}>
          <View>
            <Text style={style.boxText}>Total Task</Text>
            <RoundView color={'#7000FE'} />
            <Text style={[style.insideboxtext, {color: '#7000FE'}]}>10</Text>
            <Document style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#FFF8E8'}]}>
          <View>
            <Text style={style.boxText}>Pending Task</Text>
            <RoundView color={'#F0AD00'} />
            <Text style={[style.insideboxtext, {color: '#F0AD00'}]}>10</Text>
            <Upload style={style.svg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[style.onerow, {backgroundColor: '#E8FAF2'}]}>
          <View>
            <Text style={style.boxText}>Completed Task</Text>
            <RoundView color={'#10B559'} />
            <Text style={[style.insideboxtext, {color: '#10B559'}]}>10</Text>
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
    width: 60,
    borderColor: '#0368E9',
    borderWidth: 1,
    paddingLeft: 20,
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
