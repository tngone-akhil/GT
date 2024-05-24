import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {style} from './UserManagement';
import Download from '../images/svg/Download';
import Filter from '../images/svg/FilterBlack';
import Vector from '../images/svg/Vector';
import RNFetchBlob from 'rn-fetch-blob';
import XLSX from 'xlsx';
import {decode} from 'base64-arraybuffer';
import RNFS from 'react-native-fs';

// import FileSaver from 'file-saver'

import Arrow from '../images/svg/arrow';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {TouchableOpacityTextbox} from '../shared/CommonComponent';
import {DateTimePickerComponent} from '../shared/DateTimePicker';
import {DropDownComponent} from '../shared/DropDownComponenet';

import {BoxView, Loader} from '../shared/CommonComponent';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';
import {useAuth} from '../context/AuthContext';

const nullFilter = {
  concept: '',
  location: '',
  poc: '',
  responsibility: '',
  status: '',
  priority: '',
  toDate: 'To',
  fromDate: 'From',
};

let Priority = [
  {label: 'P1', value: 'P1'},
  {label: 'P2', value: 'P2'},
  {label: 'P3', value: 'P3'},
  {label: 'P4', value: 'P4'},
  {label: 'P5', value: 'P5'},
  {label: 'P6', value: 'P6'},
  {label: 'P7', value: 'P7'},
];

let Status = [
  {label: 'Completed', value: 'COMPLETED'},
  {label: 'Pending', value: 'PENDING'},
];

export function TaskPage({route}) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState({
    concept: '',
    location: '',
    poc: '',
    responsibility: '',
    status: '',
    priority: '',
    toDate: 'To',
    fromDate: 'From',
  });
  const [filterModal, setFilterModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const {auth} = useAuth();

  const downloadFiles = async (base64Data, fileName) => {
    // Decode base64 string to binary buffer
    const binaryData = decode(base64Data);

    // Create workbook from binary buffer
    const workbook = XLSX.read(binaryData, {type: 'array', cellDates: true});

    // Write workbook to file
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'base64',
    });
    let filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    let fileExists = await RNFS.exists(filePath);

    // If file exists, generate a new file name
    if (fileExists) {
      const timestamp = new Date().getTime();
      newFileName = `${timestamp}_${fileName}`;
      filePath = `${RNFS.DownloadDirectoryPath}/${newFileName}`;
    }

    try {
      RNFetchBlob.fs.writeFile(filePath, excelBuffer, 'base64');
      console.log('File saved successfully:', filePath);
      if (Platform.OS == 'android') {
        ToastAndroid.show('File saved successfully', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  const downloadFile = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.DOWNLOAD_REPORT;
      const BODY = JSON.stringify({
        concept: filterdData.concept,
        location: filterdData.location,
        poc: filterdData.poc,
        responsibility: filterdData.responsibility,
        status: filterdData.status,
        priority: filterdData.priority,
        toDate: filterdData.toDate == 'To' ? '0001-01-01' : filterdData.toDate,
        fromDate:
          filterdData.fromDate == 'From' ? '0001-01-01' : filterdData.fromDate,
      });

      const response = await axiosIntercepted.post(URL, BODY);

      downloadFiles(response.data, 'excelreport.xlsx');
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const getTask = async () => {
        await GetAllTask();
      };
      getTask();
      return () => {};
    }, []),
  );

  const onDateChangeFrom = (event, value) => {
    if (Platform.OS === 'android') {
      setModalVisible(false);
    }
    setFromDate(value);
    const month =
      value.getMonth() < 10
        ? '0' + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    setFilteredData(prev => {
      return {
        ...prev,
        fromDate: value.getUTCFullYear() + '-' + month + '-' + day,
      };
    });
  };

  const onDateChangeTo = (event, value) => {
    if (Platform.OS === 'android') {
      setModalVisibleTo(false);
    }
    setToDate(value);
    const month =
      value.getMonth() < 10
        ? '0' + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    setFilteredData(prev => {
      return {
        ...prev,
        toDate: value.getUTCFullYear() + '-' + month + '-' + day,
      };
    });
  };

  const renderItem = data => {
    const res = data.item;
    return (
      <View style={styles.view}>
        <BoxView
          disableEdit={res.status == 'COMPLETED' ? true : false}
          navig={() => navigation.navigate('viewTask', {task: res})}
          Header={res.concept}
          Subheader={res.maintenanceWork}
          status={res.status}
          Date={res.approvedQuotationDate}
          Place={res.location}
          Function={() =>
            auth.role == 'CLIENT'
              ? navigation.navigate('editTaskClient', {task: res})
              : navigation.navigate('editTask', {task: res})
          }
        />
      </View>
    );
  };

  const GetAllTask = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.GETALLTASK;

      const BODY = JSON.stringify({
        concept: filterdData.concept,
        location: filterdData.location,
        poc: filterdData.poc,
        responsibility: filterdData.responsibility,
        status: filterdData.status,
        priority: filterdData.priority,
        toDate: filterdData.toDate == 'To' ? '0001-01-01' : filterdData.toDate,
        fromDate:
          filterdData.fromDate == 'From' ? '0001-01-01' : filterdData.fromDate,
      });
      const response = await axiosIntercepted.post(URL, BODY);
      const result = response.data;
      setData(result);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader />}
      <View style={{paddingBottom: 15}}>
        <Text style={[style.header]}>Task Management</Text>
        <TouchableOpacity style={styles.download} onPress={downloadFile}>
          <Download />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilterModal(true);
          }}
          style={[styles.download, {right: 7}]}>
          <Filter />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{backgroundColor: '#F2F4FF'}}
        data={data}
        renderItem={renderItem}
      />

      <Modal presentationStyle="formSheet" visible={filterModal}>
        <SafeAreaView style={[style.Container]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setFilterModal(false)}>
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
                setFilteredData(nullFilter);
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
                value={filterdData.fromDate}
                onpress={() => {
                  setModalVisible(true);
                }}
              />
              <TouchableOpacityTextbox
                value={filterdData.toDate}
                onpress={() => {
                  setModalVisibleTo(true);
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 18,
                  margin: 10,
                }}>
                Multilevel Filters
              </Text>
              <InputTextComponent
                TextUpper={'Concept'}
                placeHolder={'Enter Concept'}
                value={filterdData.concept}
                onchange={value => {
                  setFilteredData(prev => {
                    return {...prev, concept: value};
                  });
                }}
                upperStyle={styles.upperText}
                upperFont={styles.upperFont}
              />
              <InputTextComponent
                TextUpper={'Location'}
                placeHolder={'Enter Location'}
                value={filterdData.location}
                onchange={value => {
                  setFilteredData(prev => {
                    return {...prev, location: value};
                  });
                }}
                upperStyle={styles.upperText}
                upperFont={styles.upperFont}
              />
              <InputTextComponent
                TextUpper={'Responsibility'}
                placeHolder={'Enter Responsibility'}
                upperStyle={styles.upperText}
                upperFont={styles.upperFont}
                value={filterdData.responsibility}
                onchange={value => {
                  setFilteredData(prev => {
                    return {...prev, responsibility: value};
                  });
                }}
              />
              <DropDownComponent
                functionality={data => {
                  setFilteredData(prev => {
                    return {...prev, priority: data};
                  });
                }}
                upperText={'Priority'}
                placeholder={'Select Priority'}
                data={Priority}
                upperTextStyle={{
                  color: 'black',
                  fontWeight: '500',
                  marginLeft: 3,
                }}
              />
              <DropDownComponent
                functionality={data => {
                  setFilteredData(prev => {
                    return {...prev, status: data};
                  });
                }}
                upperText={'Status'}
                placeholder={'Select Status'}
                data={Status}
                upperTextStyle={{
                  color: 'black',
                  fontWeight: '500',
                  marginLeft: 3,
                }}
              />
              <ButtonComponent
                title={'Apply'}
                buttonStyle={styles.button}
                textStyle={styles.textLogin}
                onPresscomponent={() => {
                  GetAllTask();
                  setFilterModal(false);
                }}
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
      {auth.role != 'CLIENT' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('addTask')}
          style={[style.addButton, {bottom: 70}]}>
          <Vector style={{position: 'relative', top: 17, left: 18}} />
        </TouchableOpacity>
      )}
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
  upperText: {},
  upperFont: {
    marginLeft: 10,
    marginTop: 5,
    fontWeight: '500',
  },
});
