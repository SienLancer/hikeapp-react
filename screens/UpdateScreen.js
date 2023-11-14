import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const UpdateScreen = ({ route }) => {
  const { hike } = route.params;
  const navigation = useNavigation();
  const [idU, setIdU] = useState(hike.id);
  const [titleU, setTitleU] = useState(hike.title);
  const [locationU, setLocationU] = useState(hike.location);
  const [descriptionU, setDescriptionU] = useState(hike.description);
  const [dohU, setDohU] = useState(hike.doh);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [checkedU, setCheckedU] = useState(hike.checked);
  const [lengthU, setLengthU] = useState(hike.length);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValueU, setCurrentValueU] = useState(hike.level);


  const items = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

    setDohU(fDate);
  }

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  }

  const handleUpdateHike = async () => {
    if (!titleU || !locationU ||!dohU ||!checkedU ||!lengthU ||!currentValueU || !descriptionU) {
      Alert.alert("Error", "Please enter title and description");
      return;
    }
    await Database.updateHike(titleU, locationU, dohU, checkedU, lengthU, currentValueU, descriptionU, idU);
    navigation.goBack();
  };



  return (
    <View style={styles.container}>
      <View style={{
        backgroundColor: '#04BF8A', width: '100%', height: 80, borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: 20
      }}>
        <Ionic name="chevron-back-outline" size={30} color='white' onPress={() => navigation.goBack()} />
        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center', fontWeight: 'bold', marginRight: 150 }}>Update Hike</Text>
      </View>
      {/* Name */}
      <Text style={styles.text}>Name of the hike</Text>
      <TextInput style={styles.input} onChangeText={setTitleU}>{titleU}</TextInput>
      {/* Location */}
      <Text style={styles.text}>Location</Text>
      <TextInput style={styles.input} onChangeText={setLocationU}>{locationU}</TextInput>

      <Text style={styles.text}>Date of the hike</Text>
      <TouchableOpacity style={styles.input} onPress={() => showMode("date")} >
        <Text style={{ color: 'gray' }} >{dohU}</Text>
      </TouchableOpacity>
      {
        show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )
      }

      <View style={styles.rbbg}>
        <Text style={[styles.text, { paddingTop: 5 }]}>Parking available</Text>
        <View style={styles.wrapper}>
          {['Yes', 'No'].map(feeling =>

            <View key={feeling} style={styles.mood}>

              <TouchableOpacity style={styles.outter} onPress={() => setCheckedU(feeling)}>
                {checkedU === feeling && <View style={styles.inner} />}
              </TouchableOpacity>
              <Text style={styles.feeling} >{feeling}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.lengthParkBg}>
        <Text style={styles.textL}>Length of the hike</Text>

        <TextInput style={styles.inputSmall} placeholder='Km' keyboardType="numeric"
          onChangeText={setLengthU}>{lengthU}</TextInput>
      </View>

      <View style={styles.lengthParkBg}>
        <Text style={styles.textL}>Level of the hike</Text>
        <View>
          <DropDownPicker style={{
            width: 150, height: 40, borderColor: '#04BF8A',
            borderRadius: 25, borderWidth: 2
          }} items={items} open={isOpen} setOpen={() => setIsOpen(!isOpen)} value={currentValueU} setValue={(val) => setCurrentValueU(val)} />
        </View>
      </View>

      {/* Des */}
      <Text style={styles.text}>Description</Text>
      <TextInput style={[styles.input, { height: 100 }]} onChangeText={setDescriptionU}
        multiline>{descriptionU}</TextInput>

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleUpdateHike}
        >
          <Text style={styles.addButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 25,
    backgroundColor: "#04BF8A",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  lengthParkBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  feeling: {
    fontSize: 14,
    textTransform: 'capitalize',
    paddingLeft: 5
  },
  mood: {
    flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  inner: {
    width: 13,
    height: 13,
    backgroundColor: '#04BF8A',
    borderRadius: 10,

  },
  outter: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: '#04BF8A',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rbbg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  textL: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 25,
    borderColor: '#04BF8A',
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 10,
    height: 40,
  },
  inputSmall: {
    borderRadius: 25,
    borderColor: '#04BF8A',
    borderWidth: 2,
    padding: 10,
    width: 150,
    height: 40,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: "#43888B",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: 'center',
    width: 349,
    height: 50,
  },
});

export default UpdateScreen;