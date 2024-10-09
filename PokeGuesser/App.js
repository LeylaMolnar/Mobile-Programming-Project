import React, {useRef, useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Easing,
  Modal,
} from 'react-native';

const Card = ({text}) => {
  return (
    <Animated.View style={{flex: 1}}>
      <Pressable style={styles.card}>
        <Text>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

const FadeCard = ({text}) => {
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
      <Animated.View style={{opacity: fadeAnim, flex: 1}}>
        <Pressable onPress={handlePress} style={styles.card}>
          <Text>{text}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

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
          <Text>{text}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const RotateCard = ({text}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [currentRotation, setRotation] = useState(0);

  const handlePress = () => {
    console.log('pressed');
    console.log(rotateAnim);
    const nextRotation = currentRotation === 0 ? 0.5 : 0;
    setRotation(nextRotation);
    Animated.timing(rotateAnim, {
      toValue: nextRotation,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={{flex: 1, transform: [{rotate: spin}]}}>
        <Pressable onPress={handlePress} style={styles.card}>
          <Text>{text}</Text>
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
    const otherSide = 1 - nextSide;
    setSide(nextSide);

    Animated.sequence([
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
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
        easing: Easing.linear,
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
    const nextSide = currentSide === 0 ? 0.5 : 0;
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
    outputRange: ['0deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.25, 0.251, 0.5],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.25, 0.251, 0.5],
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
      {/* <View style={styles.row}>
        <FadeCard text="Card 1" />
        <FadeAndScaleCard text="Card 2" />
        <RotateCard text="Card 3" />
      </View> */}
      {/* <Modal></Modal> */}
      <View style={styles.row}>
        <FlipCard text="Press to flip card" textBack="Wow" />
        <FlipYCard text="Press to flip card" textBack="Woah" />
        {/* <Card text="Card 6" /> */}
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
