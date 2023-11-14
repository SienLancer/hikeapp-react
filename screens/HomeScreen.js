import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Ionic from 'react-native-vector-icons/Ionicons'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Icon
} from "react-native";
import Database from "../Database";

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
      } catch (error) {
        console.log("Error fetching hikes", error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleDeleteHike = async (id, title) => {
    await Database.deleteHike(id, title);
    const data = await Database.getHikes();
    setHikes(data);
  };


  const renderHikeItem = ({ item }) => (
    <View style={styles.itemList}>
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate("Detail", { hike: item })}
    >
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.location}</Text>
      <Text style={styles.text}>{item.doh}</Text>
      <View style={styles.deleteBg}>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate("Update", { hike: item })}
      >
        <Text style={styles.deleteButtonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id, item.title)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      </View>
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{
        backgroundColor: '#04BF8A', width: '100%', height: 100, borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30, paddingHorizontal: 10, alignItems: 'center'
      }}>
        <Text style={{ color: "#fff", paddingTop: 50, fontSize: 24, fontWeight: 'bold' }}>Let's start hiking!</Text>
        
      </View>
      <FlatList
        data={hikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  delAllBtn: {
    backgroundColor: 'red',
    width: 50,
    height:50,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
  itemList: {
    alignItems: 'center',
    height:150,
    justifyContent: 'center',
    backgroundColor: '#04BF8A',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 30,
    paddingHorizontal: 10
  },
  todoItem: {
    width: '100%',
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 15,
    width: 100,
    height: 35,
    alignItems: 'center'
  },
  deleteBg: {
    backgroundColor: 'white',
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    paddingTop: 5
  },
  deleteButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 14
  },
  updateButton:{
    backgroundColor: "#03A64A",
    padding: 8,
    borderRadius: 15,
    width: 100,
    height: 35,
    alignItems: 'center'
  }
});

export default HomeScreen;