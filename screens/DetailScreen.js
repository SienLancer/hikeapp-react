import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { hike } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{
        backgroundColor: '#04BF8A', width: '100%', height: 80, borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: 20, marginBottom: 20
      }}>
        <Ionic name="chevron-back-outline" size={30} color='white' onPress={() => navigation.goBack()} />
        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center', fontWeight: 'bold', marginRight: 130 }}>Detail</Text>
      </View>
      <View style={styles.line}>
      <Text style={styles.title}>Name of the hike: </Text>
      <Text style={styles.content}>{hike.title}</Text>
      </View>

      <View style={styles.line}>
      <Text style={styles.title}>Location: </Text>
      <Text style={styles.content}>{hike.location}</Text>
      </View>
      
      <View style={styles.line}>
      <Text style={styles.title}>Date of the hike: </Text>
      <Text style={styles.content}>{hike.doh}</Text>
      </View>

      <View style={styles.line}>
      <Text style={styles.title}>Parking available: </Text>
      <Text style={styles.content}>{hike.parking}</Text>
      </View>

      <View style={styles.line}>
      <Text style={styles.title}>Length of the hike: </Text>
      <Text style={styles.content}>{hike.length +"Km"}</Text>
      </View>

      <View style={styles.line}>
      <Text style={styles.title}>Level of the hike: </Text>
      <Text style={styles.content}>{hike.level}</Text>
      </View>

      <View style={styles.line}>
      <Text style={styles.title}>Description: </Text>
      <Text style={styles.content}>{hike.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    height: 40,
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#04BF8A',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#04BF8A'

  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'white'
  },

  content: {
    fontSize: 16,
    color: 'white'
  },
});

export default DetailScreen;