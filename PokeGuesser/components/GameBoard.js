import React, {useRef, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Easing,
} from 'react-native';

let nextCard = 1;

const FlipYCard = ({textFront, textBack, cardID, theme}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [currentSide, setSide] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    if (nextCard == cardID) {
      setIsDisabled(true);
      nextCard++;
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
          <Text style={styles.cardText}>{textBack}</Text>
        </Animated.View>
        <Pressable
          disabled={isDisabled}
          onPress={handlePress}
          style={{width: '100%', height: '100%'}}
        />
      </Animated.View>
    </View>
  );
};

const GameBoard = props => {
  return (
    <View style={[styles.gameBoard, {backgroundColor: props.theme[4]}]}>
      <View>
        <Text>PokeGuesser #8</Text>
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
                theme={props.theme}
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
    // backgroundColor: 'green',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
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
    borderRadius: 10,
    borderWidth: 5,
  },
  cardText: {
    textAlign: 'center',
  },
});

export default GameBoard;
