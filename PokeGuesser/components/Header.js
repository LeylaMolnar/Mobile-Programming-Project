import React, {useRef, useState} from 'react';

import {StyleSheet, Text, View, Pressable, Image, Modal} from 'react-native';

const Header = props => {
  const [tutorialVisible, setTutorialVisible] = useState(false);

  return (
    <View style={[styles.headerContainer, {backgroundColor: props.theme[1]}]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={tutorialVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setTutorialVisible(!tutorialVisible);
        }}>
        <View style={styles.popUp}>
          <View style={[styles.popUpWindow, {backgroundColor: props.theme[2]}]}>
            <Text style={styles.modalText}>Tutorial</Text>
            <Text style={styles.infoText}>
              How to play: Flip a card to get a hint
            </Text>
            <Text style={styles.infoText}>
              You can guess as many times you want on each hint EXCEPT the last
              one!
            </Text>
            <Text style={styles.infoText}>
              The less cards you flip, the higher the score!
            </Text>
            <Text style={styles.infoText}>
              if you cannot guess the pokemon, you lose and your daily streak is
              reset!
            </Text>
            <Text style={styles.infoText}>
              Regions: this is the first area where the Pokémon appears in.
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={styles.tutorialImage}
                source={require('../assets/ThirdBranch.png')}></Image>
              <Text style={styles.treeInfo}>
                The evolution tree progresses from top to bottom. For example,
                in this tree the Pokémon is in one of its third evolutions. The
                desired Pokémon's evolution stage is shown with a red dot.
              </Text>
            </View>
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {backgroundColor: props.theme[1]},
              ]}
              onPress={() => setTutorialVisible(!tutorialVisible)}>
              <Text style={styles.textStyle}>Back to game</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.hamburger}>
        <Pressable style={styles.press} onPress={() => props.onMenuOpen()}>
          <Image
            source={require('../assets/burgerIcon.png')}
            style={styles.imageSize}
          />
        </Pressable>
      </View>
      <View style={styles.logIn}>
        <Pressable style={styles.press}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.imageSize}
          />
        </Pressable>
      </View>
      <View style={styles.logo}>
        <Image
          source={require('../assets/logoIcon.png')}
          style={styles.imageSize}
        />
      </View>
      <View style={styles.streak}>
        <Image
          source={require('../assets/fire.png')}
          style={styles.imageSize}
        />
        <View>
          <Text>{props.streak}</Text>
        </View>
      </View>
      <View style={styles.tutorial}>
        <Pressable
          style={styles.press}
          onPress={() => setTutorialVisible(true)}>
          <Image
            source={require('../assets/infoIcon.png')}
            style={styles.imageSize}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'grey',
  },
  imageSize: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  tutorialImage: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginTop: 10,
  },
  press: {
    flex: 1,
    // backgroundColor: 'red',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  hamburger: {
    padding: 5,
    flex: 1,
  },
  logIn: {
    flex: 1,
  },
  logo: {
    flex: 1,
    paddingTop: 10,
    marginRight: 40,
    marginLeft: 40,
  },
  streak: {
    flex: 1,
  },
  tutorial: {
    // padding: 5,
    flex: 1,
  },
  popUp: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  popUpWindow: {
    width: '80%',
    height: '73%',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 10,
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
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  treeInfo: {
    marginTop: 5,
    textAlign: 'left',
    fontSize: 16,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
export default Header;
