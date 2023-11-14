import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { Alert, ToastAndroid } from "react-native";

const database_name = "Hike.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 300000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        location TEXT,
        doh TEXT,
        parking TEXT,
        length INTEGER,
        level TEXT,
        description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


const deleteHike = (id, title) => {
  Alert.alert('Delete', 'You want to delete '+ title + ' ?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM hikes WHERE id = ?",
          [id],
          () => {
            resolve();
            ToastAndroid.showWithGravityAndOffset(
              'Deleted successfully!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          },
          (_, error) => {
            reject(error);
            ToastAndroid.showWithGravityAndOffset(
              'Failed!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        );
      });
    })},
  ]);
  
}


const updateHike = (title, location, doh, parking, length, level, description, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE hikes SET title = (?), location = (?), doh = (?), parking = (?), length = (?), level = (?), description = (?) WHERE id = (?)",
        [title, location, doh, parking, length, level, description, id],
        () => {
          resolve();
          ToastAndroid.showWithGravityAndOffset(
            'Updated successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        },
        (_, error) => {
          reject(error);
          ToastAndroid.showWithGravityAndOffset(
            'Failed!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      );
    });
  });
};

const addHike = (title, location, doh, parking, length, level, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikes (title, location, doh, parking, length, level, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, location, doh, parking, length, level, description],
        (_, { insertId }) => {
          resolve(insertId);
          ToastAndroid.showWithGravityAndOffset(
            'Added successfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        },
        (_, error) => {
          reject(error);
          ToastAndroid.showWithGravityAndOffset(
            'Failed!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      );
    });
  });
};

const Database = {
  initDatabase,
  addHike,
  getHikes,
  updateHike,
  deleteHike,
};

export default Database;