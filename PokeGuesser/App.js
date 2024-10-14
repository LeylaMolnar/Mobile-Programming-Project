import React, {useRef, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Easing,
} from 'react-native';

const FadeAndScaleCard = ({text}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isFadedOut, setIsFadedOut] = useState(false);

  const handlePress = () => {
    if (isFadedOut) {
      fadeIn();
    } else {
      fadeOut();
    }
    setIsFadedOut(!isFadedOut); // Toggle state
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 1 second
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 1 second
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.cardContainer}>
      <Animated.View
        style={{opacity: fadeAnim, flex: 1, transform: [{scale: fadeAnim}]}}>
        <Pressable onPress={handlePress} style={styles.card}>
          <Text style={styles.cardText}>{text}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const FlipCard = ({text, textBack}) => {
  const flipAnim = useRef(new Animated.Value(1)).current;
  const frontOpacity = useRef(new Animated.Value(1)).current;
  const backOpacity = useRef(new Animated.Value(0)).current;
  const [currentSide, setSide] = useState(1);

  const handlePress = () => {
    const nextSide = currentSide === 1 ? 0 : 1;
    setSide(nextSide);
    const otherSide = 1 - nextSide;

    Animated.sequence([
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(frontOpacity, {
        toValue: nextSide,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(backOpacity, {
        toValue: otherSide,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={{flex: 1, transform: [{scaleX: flipAnim}]}}>
        <Animated.View style={[styles.card, {opacity: frontOpacity}]}>
          <Text style={styles.cardText}>{text}</Text>
        </Animated.View>
        <Animated.View style={[styles.cardBack, {opacity: backOpacity}]}>
          <Text style={styles.cardText}>{textBack}</Text>
        </Animated.View>
        <Pressable
          onPress={handlePress}
          style={{width: '100%', height: '100%'}}
        />
      </Animated.View>
    </View>
  );
};

const FlipYCard = ({text, textBack}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [currentSide, setSide] = useState(0);

  const handlePress = () => {
    const nextSide = currentSide === 0 ? 1 : 0;
    setSide(nextSide);
    Animated.timing(flipAnim, {
      toValue: nextSide,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
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
          <Text style={styles.cardText}>{text}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.cardBack,
            {opacity: backOpacity, transform: [{rotateY: '180deg'}]},
          ]}>
          <Text style={styles.cardText}>{textBack}</Text>
        </Animated.View>
        <Pressable
          onPress={handlePress}
          style={{width: '100%', height: '100%'}}
        />
      </Animated.View>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <Card text="lol" /> */}
        <FadeAndScaleCard text="Press to vanish/appear" />
        <FlipCard text="Press to flip card" textBack="Wow" />
        <FlipYCard text="Press to flip card" textBack="Woah" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    paddingBottom: 200,
    backgroundColor: 'grey',
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

export default App;
