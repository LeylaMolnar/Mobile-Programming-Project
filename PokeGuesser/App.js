import React, {useRef, useState} from 'react';

import {StyleSheet, View, Button} from 'react-native';
import GameBoard from './components/GameBoard';

const App = () => {
  // let currentDate = new Date().toJSON().slice(0, 10);
  // console.log(currentDate); // "2022-06-17"

  const [currentPoke, setPoke] = useState();
  const fetchPoke = async () => {
    console.log('Fetching Poke');
    try {
      let response = await fetch('http://10.0.2.2:8080/getPoke/Snorlax');
      let json = await response.json();
      setPoke(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={fetchPoke} title="readPoke" />
      <GameBoard hints={currentPoke}></GameBoard>
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
