import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, View, Button, Text} from 'react-native';
import GameBoard from './components/GameBoard';
import Input from './components/Input';

const App = () => {
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate);

  const [currentPoke, setPoke] = useState();
  const [loading, setLoading] = useState(true); // State to manage loading
  const fetchPoke = async () => {
    console.log('Fetching Poke');
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/getPokeByDate/' + currentDate,
      );
      let json = await response.json();
      setPoke(json);
      setLoading(false);
      console.log(json);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchPoke();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      {/* <Button onPress={fetchPoke} title="readPoke" /> */}
      <View style={styles.board}>
        {loading ? (
          <Text>Loading...</Text> // Show loading indicator while data is being fetched
        ) : (
          <GameBoard hints={currentPoke} /> // Render GameBoard only when data is ready
        )}
      </View>
      <View style={styles.input}>
        <Input />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 100,
    // paddingBottom: 100,
    backgroundColor: 'grey',
  },
  header: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  board: {
    flex: 8,
    backgroundColor: 'orange',
  },
  input: {
    flex: 4,
    backgroundColor: 'red',
  },
});

export default App;
