import React, {useRef, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Easing,
  Image,
} from 'react-native';

let nextCard = 1;
const images = {
  snorlax: require('../assets/snorlaxShadow.png'),
  snorlaxEvo: require('../assets/SecondofTwo.png'),
  anorith: require('../assets/anorithShadow.png'),
  anorithEvo: require('../assets/FirstofTwo.png'),
  duosion: require('../assets/snorlaxShadow.png'),
  duosionEvo: require('../assets/SecondofThree.png'),
  gardevoir: require('../assets/gardevoirShadow.png'),
  gardevoirEvo: require('../assets/ThirdBranch.png'),
  gastly: require('../assets/gastlyShadow.png'),
  gastlyEvo: require('../assets/FirstofThree.png'),
  greninja: require('../assets/greninjaShadow.png'),
  greninjaEvo: require('../assets/ThirdofThree.png'),
  snom: require('../assets/snomShadow.png'),
  snomEvo: require('../assets/FirstofTwo.png'),
  wormadam: require('../assets/wormadamShadow.png'),
  wormadamEvo: require('../assets/FirstofTwo.png'),
};

const FlipYCard = ({
  textFront,
  textBack,
  cardID,
  pokemon,
  onHintsRevealed,
  theme,
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [currentSide, setSide] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    onHintsRevealed(nextCard);
    console.log(nextCard);

    if (nextCard == cardID) {
      setIsDisabled(true);
      nextCard++;
      // setNextCard(nextCard + 1);
      const nextSide = currentSide === 0 ? 1 : 0;
      setSide(nextSide);
      Animated.timing(flipAnim, {
        toValue: nextSide,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };
  const spin = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.51, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.51, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <View style={styles.cardContainer}>
      <Pressable disabled={isDisabled} onPress={handlePress} style={{flex: 1}}>
        <Animated.View style={{flex: 1, transform: [{rotateY: spin}]}}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity: frontOpacity,
                backgroundColor: theme[2],
                borderColor: theme[0],
              },
            ]}>
            <Text style={styles.cardText}>{textFront}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.cardBack,
              {
                opacity: backOpacity,
                transform: [{rotateY: '180deg'}],
                backgroundColor: theme[3],
                borderColor: theme[1],
              },
            ]}>
            {textBack === 'pic1' ? (
              <Image
                source={images[pokemon.toLowerCase() + 'Evo']} // Replace with the correct path for pic1
                style={styles.cardImage} // Add styling for the image
              />
            ) : textBack === 'pic2' ? (
              <Image
                source={images[pokemon.toLowerCase()]} // Replace with the correct path for pic2
                style={styles.cardImage}
              />
            ) : (
              <Text style={styles.cardText}>{textBack}</Text>
            )}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const GameBoard = props => {
  return (
    <View style={[styles.gameBoard, {backgroundColor: props.theme[4]}]}>
      <View>
        <Text style={[styles.title, {color: props.theme[1]}]}>PokeGuesser</Text>
      </View>
      {[0, 1, 2].map(row => (
        <View key={row} style={styles.row}>
          {[1, 2, 3].map(col => {
            const cardID = row * 3 + col;
            return (
              <FlipYCard
                key={cardID}
                textFront={props.hints[`hint${cardID}type`]}
                textBack={props.hints[`hint${cardID}`]}
                cardID={cardID}
                pokemon={props.hints.name}
                theme={props.theme}
                onHintsRevealed={() => props.onHintsRevealed(nextCard)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gameBoard: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'roboto',
    margin: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cardContainer: {
    flex: 1,
    padding: 5,
  },
  card: {
    flex: 1,
    // backgroundColor: 'green',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 5,
  },
  cardBack: {
    flex: 1,
    // backgroundColor: 'red',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 5,
  },
  cardText: {
    textAlign: 'center',
  },
  cardImage: {
    flex: 1,
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default GameBoard;
