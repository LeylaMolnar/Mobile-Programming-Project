import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, View, Button, Text} from 'react-native';
import GameBoard from './components/GameBoard';

const App = () => {
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate); // "2022-06-17"

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
      {/* <Button onPress={fetchPoke} title="readPoke" /> */}
      {loading ? (
        <Text>Loading...</Text> // Show loading indicator while data is being fetched
      ) : (
        <GameBoard hints={currentPoke}></GameBoard> // Render GameBoard only when data is ready
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    backgroundColor: 'grey',
  },
});

export default App;
