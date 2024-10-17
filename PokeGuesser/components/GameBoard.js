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

const FlipYCard = ({textFront, textBack, cardID}) => {
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
        <Animated.View style={[styles.card, {opacity: frontOpacity}]}>
          <Text style={styles.cardText}>{textFront}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.cardBack,
            {opacity: backOpacity, transform: [{rotateY: '180deg'}]},
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
    <View style={styles.gameBoard}>
      <View style={styles.row}>
        <FlipYCard
          textFront={props.hints.hint1type}
          textBack={props.hints.hint1}
          cardID={1}
        />
        <FlipYCard
          textFront={props.hints.hint2type}
          textBack={props.hints.hint2}
          cardID={2}
        />
        <FlipYCard
          textFront={props.hints.hint3type}
          textBack={props.hints.hint3}
          cardID={3}
        />
      </View>
      <View style={styles.row}>
        <FlipYCard
          textFront={props.hints.hint4type}
          textBack={props.hints.hint4}
          cardID={4}
        />
        <FlipYCard
          textFront={props.hints.hint5type}
          textBack={props.hints.hint5}
          cardID={5}
        />
        <FlipYCard
          textFront={props.hints.hint6type}
          textBack={props.hints.hint6}
          cardID={6}
        />
      </View>
      <View style={styles.row}>
        <FlipYCard
          textFront={props.hints.hint7type}
          textBack={props.hints.hint7}
          cardID={7}
        />
        <FlipYCard
          textFront={props.hints.hint8type}
          textBack={props.hints.hint8}
          cardID={8}
        />
        <FlipYCard
          textFront={props.hints.hint9type}
          textBack={props.hints.hint9}
          cardID={9}
        />
      </View>
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
    backgroundColor: 'green',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 5,
  },
  cardBack: {
    flex: 1,
    backgroundColor: 'red',
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
