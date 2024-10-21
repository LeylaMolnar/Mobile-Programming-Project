import React, {useRef, useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  DrawerLayoutAndroid,
} from 'react-native';
import GameBoard from './components/GameBoard';
import Input from './components/Input';
import Header from './components/Header';

const App = () => {
  //LOADING DAILY POKE
  let currentDate = new Date().toJSON().slice(0, 10);
  // console.log(currentDate);
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
      // console.log(json);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Fetch the data when the component mounts
  useEffect(() => {
    fetchPoke();
  }, []); // Empty dependency array ensures it runs once on mount

  //HANDLING PLAYER
  let username = 'admin';
  const [player, setPlayer] = useState();
  const fetchPlayer = async () => {
    console.log('Fetching player');
    try {
      let response = await fetch('http://10.0.2.2:8080/getUser/' + username);
      let json = await response.json();
      setPlayer(json);
      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlayer = async player => {
    console.log('Updating player data');
    console.log(player);
    try {
      let response = await fetch('http://10.0.2.2:8080/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      });

      if (!response.ok) {
        throw new Error('Failed to update Pokémon');
      }
      console.log('Update successful');
    } catch (error) {
      console.log(error);
    }
  };

  //HANDLING GUESSES
  let score = 15000;
  let noOfGuesses = 0;
  const makeGuess = async (pokemon, guess) => {
    console.log('Pokemon:', pokemon.name);
    console.log('Guess:', guess);

    if (pokemon.name.toLowerCase() == guess) {
      console.log('Correct Guess');
      await fetchPlayer();
      console.log(player);
      player.gamesPlayed++;
      player.gamesWon++;
      player.streak++;
      player.scoreTotal += score;
      player.scoreAvg = player.scoreTotal / player.gamesPlayed;
      player.winPercent = player.gamesWon / player.gamesPlayed;
      updatePlayer(player);
    } else {
      console.log('Wrong');
    }
  };

  //Menu
  const drawer = useRef(null);
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header onMenuOpen={() => drawer.current.openDrawer()} />
        </View>
        {/* <Button onPress={fetchPoke} title="readPoke" /> */}
        <View style={styles.board}>
          {loading ? (
            <Text>Loading...</Text> // Show loading indicator while data is being fetched
          ) : (
            <GameBoard hints={currentPoke} /> // Render GameBoard only when data is ready
          )}
        </View>
        <View style={styles.input}>
          <Input onMakeGuess={text => makeGuess(currentPoke, text)} />
        </View>
      </View>
    </DrawerLayoutAndroid>
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
