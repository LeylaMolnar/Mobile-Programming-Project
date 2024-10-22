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
          <View style={styles.popUpWindow}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setTutorialVisible(!tutorialVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.hamburger}>
        <Pressable style={styles.press} onPress={() => props.onMenuOpen()}>
          <Image
            source={require('../assets/circle.png')}
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
          source={require('../assets/circle.png')}
          style={styles.imageSize}
        />
      </View>
      <View style={styles.streak}>
        <Image
          source={require('../assets/fire.png')}
          style={styles.imageSize}
        />
      </View>
      <View style={styles.tutorial}>
        <Pressable
          style={styles.press}
          onPress={() => setTutorialVisible(true)}>
          <Image
            source={require('../assets/circle.png')}
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
    width: 60,
    height: 60,
  },
  press: {
    flex: 1,
    // backgroundColor: 'red',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  hamburger: {
    flex: 1,
  },
  logIn: {
    flex: 1,
  },
  logo: {
    flex: 1,
    marginRight: 40,
    marginLeft: 40,
  },
  streak: {
    flex: 1,
  },
  tutorial: {
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
