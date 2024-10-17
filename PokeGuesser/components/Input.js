import React, {useRef, useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Pressable,
  Easing,
} from 'react-native';

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['-', 'z', 'x', 'c', 'v', 'b', 'n', 'm', "'", 'X'],
];

const Input = () => {
  const [text, onChangeText] = React.useState('Guess goes here');

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputField}>
        <Text style={styles.input}>{text}</Text>
      </View>
      <View style={styles.keyboard}>
        {keys.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((key, j) => (
              <Pressable
                key={i * 20 + j}
                style={styles.key}
                onPress={() => console.log({key})}>
                <Text style={styles.keyCharacter}>{key}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        <View style={[styles.row, {justifyContent: 'flex-end'}]}>
          <Pressable style={styles.key}>
            <Text style={styles.keyCharacter}>.</Text>
          </Pressable>
          <Pressable style={styles.key}>
            <Text style={styles.keyCharacter}>:</Text>
          </Pressable>
          <Pressable style={[styles.key, {width: 150}]}>
            <Text style={styles.keyCharacter}>Space</Text>
          </Pressable>
          <Pressable style={styles.key}>
            <Text style={styles.keyCharacter}>2</Text>
          </Pressable>
          <Pressable style={styles.key}>
            <Text style={styles.keyCharacter}>é</Text>
          </Pressable>
          <Pressable style={[styles.key, {width: 60}]}>
            <Text style={styles.keyCharacter}>Enter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  input: {
    textAlign: 'center',
  },
  keyboard: {
    flex: 1,
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
    justifyContent: 'center',
    // marginTop: 5,
  },
  key: {
    width: 37,
    height: 47,
    margin: 2,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 7,
  },
  keyCharacter: {
    textAlign: 'center',
  },
});
export default Input;
