import React, {useRef, useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  DrawerLayoutAndroid,
  Modal,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import GameBoard from './components/GameBoard';
import Input from './components/Input';
import Header from './components/Header';

const themes = [
  ['#332011', '#633C15', '#C5915D', '#EFDBB6', '#FCF3E4'], //Eevee
  ['#E3BE66', '#B68933', '#89D89B', '#F2E7A6', '#6BC399'], //Leafeon
  ['#261D2D', '#57346F', '#E7D94D', '#EFF06E', '#F9F8E5'], //Jolteon
  ['#84DEFF', '#114E67', '#419DBF', '#FFE6A4', '#107496', '#D9D9D9'], //Vaporeon
  ['#C7A66A', '#E1C08D', '#D84254', '#742119', '#F6734A'], //Flareon check flip
  ['#DE634D', '#363F44', '#4C6180', '#EFCB69', '#414E53'], //Umbreon
  ['#5872A6', '#726CA8', '#C64863', '#D9BAD2', '#AE919D'], //Espeon
  ['#95DAF8', '#6E82B7', '#F9CBD0', '#F7E8D8', '#F492A5'], //Sylveon
  ['#2B595E', '#428795', '#4D7E93', '#92CCDB', '#C5E7E9'], //Glaceon
];

const App = () => {
  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchPoke(); // Wait for fetchPoke to complete
      await fetchPlayer(); // Then call fetchPlayer
      await fetchAllPoke();
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures it runs once on mount

  //HANDLING THEME
  const activeTheme = themes[0];

  //LOADING DAILY POKE
  let currentDate = new Date().toJSON().slice(0, 10);
  let pokeDate = currentDate;
  // console.log(currentDate);
  const [currentPoke, setPoke] = useState();
  const [loading, setLoading] = useState(true); // State to manage loading
  const fetchPoke = async () => {
    console.log('Fetching Poke');
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/getPokeByDate/' + pokeDate,
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

  const [pokeList, setPokeList] = useState([]);
  const fetchAllPoke = async () => {
    console.log('Fetching all Poke');
    try {
      let response = await fetch('http://10.0.2.2:8080/getAllPoke/');
      let json = await response.json();
      setPokeList(json);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
  const [wrongGuessVisible, setWrongGuessVisible] = useState(false);
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

      // Ensure history is an array
      player.history = player.history || [];

      // Create a new history entry
      const historyEntry = {
        date: currentPoke.date, // Store date in YYYY-MM-DD format
        pokeID: currentPoke._id,
        score: score,
        noOfGuesses: noOfGuesses, // Add other relevant data from currentPoke
        hintsRevealed: hintsRevealed,
        result: 'win',
      };
      player.history.push(historyEntry);

      updatePlayer(player);
    } else if (hintsRevealed === 9) {
      setGameOverVisible(true);

      player.gamesPlayed++;
      player.gamesLost++;
      player.streak = 0;
      player.scoreTotal = parseInt(player.scoreTotal, 10) || 0;
      player.scoreTotal += score;
      player.scoreAvg = player.scoreTotal / player.gamesPlayed;
      player.winPercent = player.gamesWon / player.gamesPlayed;

      // Ensure history is an array
      player.history = player.history || [];

      // Create a new history entry
      const historyEntry = {
        date: currentPoke.date, // Store date in YYYY-MM-DD format
        pokeID: currentPoke._id,
        score: score,
        noOfGuesses: noOfGuesses, // Add other relevant data from currentPoke
        hintsRevealed: hintsRevealed,
        result: 'loss',
      };
      player.history.push(historyEntry);

      updatePlayer(player);
    } else {
      setWrongGuessVisible(true);
    }
  };

  //History screen
  const keyHandler = item => {
    return item.id;
  };

  const fetchNewPoke = date => {
    console.log('fetching new poke');
    console.log(date);
    pokeDate = date;
    fetchPoke();
  };

  const renderPoke = item => {
    return (
      <Pressable onPress={() => fetchNewPoke(item.item.date)}>
        <View style={styles.listItemStyle}>
          <Text>
            {' Date: '} {item.item.date}
            {' Name: '}
            {item.item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  //Menu
  const [themesVisible, setThemesVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const drawer = useRef(null);
  const navigationView = () => (
    <View style={[styles.container, {backgroundColor: activeTheme[1]}]}>
      <Pressable
        style={styles.menuButton}
        onPress={() => setThemesVisible(true)}>
        <Image
          source={require('./assets/paintBrush.png')}
          style={styles.menuImage}
        />
        <Text style={styles.menuText}>Themes</Text>
      </Pressable>
      <Pressable style={styles.menuButton} onPress={() => openHistory(true)}>
        <Image
          source={require('./assets/historyIcon.png')}
          style={styles.menuImage}
        />
        <Text style={styles.menuText}>Game History</Text>
      </Pressable>
      <Pressable
        style={styles.menuButton}
        onPress={() => setStatsVisible(true)}>
        <Image
          source={require('./assets/statsIcon.png')}
          style={styles.menuImage}
        />
        <Text style={styles.menuText}>Statistics</Text>
      </Pressable>
      <View style={{flex: 7}}></View>
    </View>
  );

  const openHistory = () => {
    setHistoryVisible(true);
  };

  return (
    //Side menu
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        {/* wrong guess modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={wrongGuessVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setWrongGuessVisible(!wrongGuessVisible);
          }}>
          <View style={styles.popUp}>
            <View style={styles.popUpWindow}>
              <Text style={styles.modalText}>Incorrect</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setWrongGuessVisible(!wrongGuessVisible)}>
                <Text style={styles.textStyle}>Keep playing</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Victory modal */}
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
        {/* Themes modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={themesVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setThemesVisible(!themesVisible);
          }}>
          <View style={styles.popUp}>
            <View style={[styles.popUpWindow, {backgroundColor: activeTheme[2]}]}>
              <Text style={styles.modalText}>Themes</Text>
              <Pressable
                style={[styles.button, styles.buttonClose, {backgroundColor: activeTheme[1]}]}
                onPress={() => setThemesVisible(!themesVisible)}>
                <Text style={styles.textStyle}>Back to Game</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* History modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={historyVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setHistoryVisible(!historyVisible);
          }}>
          <View style={styles.popUp}>
            <View style={[styles.popUpWindow, {backgroundColor: activeTheme[1]}]}>
              <Text style={styles.modalText}>History</Text>
              <View style={[styles.gameList, {backgroundColor: activeTheme[3]}]}>
                <FlatList
                  style={[styles.list, {backgroundColor: activeTheme[2]}]}
                  keyExtractor={keyHandler}
                  data={pokeList}
                  renderItem={renderPoke}
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose, {backgroundColor: activeTheme[2]}]}
                onPress={() => setHistoryVisible(!historyVisible)}>
                <Text style={styles.textStyle}>Back to Game</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Stats modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={statsVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setStatsVisible(!statsVisible);
          }}>
          <View style={styles.popUp}>
            <View style={[styles.popUpWindow, {backgroundColor: activeTheme[2]}]}>
              <Text style={styles.modalText}>Statistics</Text>
              <Pressable
                style={[styles.button, styles.buttonClose, {backgroundColor: activeTheme[1]}]}
                onPress={() => setStatsVisible(!statsVisible)}>
                <Text style={styles.textStyle}>Back to Game</Text>
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
        <Button onPress={() => console.log(pokeList)} title="readPoke" />
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
  menuButton: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 100,
    borderBottomWidth: 2,
    padding: 10,
    alignItems: 'center',
  },
  menuImage: {
    height: 60,
    width: 60,
  },
  menuText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  gameList: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    backgroundColor: '#abc',
    width: '80%',
    alignSelf: 'center',
  },
  list: {
    width: '80%',
    backgroundColor: 'blue',
  },
});

export default App;
