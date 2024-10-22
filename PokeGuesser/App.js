import React, {useRef, useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  DrawerLayoutAndroid,
  Modal,
  Pressable,
} from 'react-native';
import GameBoard from './components/GameBoard';
import Input from './components/Input';
import Header from './components/Header';

const themes = [
  ['#332011', '#633C15', '#C5915D', '#EFDBB6', '#FCF3E4'], //Eevee
  ['#E3BE66', '#B68933', '#6BC399', '#89D89B', '#F2E7A6'], //Leafeon
  ['#261D2D', '#57346F', '#E7D94D', '#EFF06E', '#F9F8E5'], //Jolteon
  ['#107496', '#114E67', '#419DBF', '#84DEFF', '#FFE6A4', '#D9D9D9'], //Vaporeon
  ['#742119', '#C7A66A', '#D84254', '#E1C08D', '#F6734A'], //Flareon
  ['#363F44', '#414E53', '#4C6180', '#DE634D', '#EFCB69'], //Umbreon
  ['#5872A6', '#726CA8', '#C64863', '#D9BAD2', '#E4CDDD'], //Espeon
  ['#6E82B7', '#95DAF8', '#F492A5', '#F7E8D8', '#F9CBD0'], //Sylveon
  ['#2B595E', '#428795', '#4D7E93', '#92CCDB', '#C5E7E9'], //Glaceon
];

const App = () => {
  //HANDLING THEME
  const activeTheme = themes[8];

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
    const fetchData = async () => {
      await fetchPoke(); // Wait for fetchPoke to complete
      await fetchPlayer(); // Then call fetchPlayer
    };

    fetchData(); // Call the async function
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
      // console.log('value in fetchPlayer: ' + json);
      console.log(json);
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
  const [victoryVisible, setVictoryVisible] = useState(false);
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [noOfGuesses, setGuessNumber] = useState(0);

  let score = 15000;
  // let noOfGuesses = 0;
  const makeGuess = async (pokemon, guess) => {
    setGuessNumber(noOfGuesses + 1);
    console.log(hintsRevealed);
    if (pokemon.name.toLowerCase() == guess) {
      setVictoryVisible(true);

      player.gamesPlayed++;
      player.gamesWon++;
      player.streak++;
      player.scoreTotal = parseInt(player.scoreTotal, 10) || 0;
      player.scoreTotal += score;
      player.scoreAvg = player.scoreTotal / player.gamesPlayed;
      player.winPercent = player.gamesWon / player.gamesPlayed;
      updatePlayer(player);
    } else if (hintsRevealed === 9) {
      setGameOverVisible(true);
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
    //Side menu
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={navigationView}>
      {/* Victory modal */}
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={victoryVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setVictoryVisible(!victoryVisible);
          }}>
          <View style={styles.popUp}>
            <View style={styles.popUpWindow}>
              <Text style={styles.modalText}>Victory! Yay!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVictoryVisible(!victoryVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Game Over modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={gameOverVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setGameOverVisible(!gameOverVisible);
          }}>
          <View style={styles.popUp}>
            <View style={styles.popUpWindow}>
              <Text style={styles.modalText}>Game Over!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setGameOverVisible(!gameOverVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Header
            onMenuOpen={() => drawer.current.openDrawer()}
            theme={activeTheme}
          />
        </View>
        {/* <Button onPress={fetchPlayer} title="readPoke" /> */}
        <View style={[styles.board, {backgroundColor: activeTheme[4]}]}>
          {loading ? (
            <Text>Loading...</Text> // Show loading indicator while data is being fetched
          ) : (
            <GameBoard
              hints={currentPoke}
              theme={activeTheme}
              onHintsRevealed={number => setHintsRevealed(number)}
            /> // Render GameBoard only when data is ready
          )}
        </View>
        <View style={styles.input}>
          <Input
            onMakeGuess={text => makeGuess(currentPoke, text)}
            theme={activeTheme}
          />
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
    // backgroundColor: 'grey',
  },
  header: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  board: {
    flex: 8,
    // backgroundColor: 'orange',
  },
  input: {
    flex: 4,
    // backgroundColor: 'red',
  },

  popUp: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  popUpWindow: {
    width: '80%',
    aspectRatio: 1 / 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
