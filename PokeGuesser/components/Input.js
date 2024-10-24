import React, {useRef, useState} from 'react';

import {StyleSheet, Text, View, Pressable} from 'react-native';

//Array to hold the top 3 rows of the keyboard
const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['-', 'z', 'x', 'c', 'v', 'b', 'n', 'm', "'", 'X'],
];

const Input = props => {
  const [text, setText] = React.useState(''); //Variable for the entered text

  //'X' acts as our backspace key. All other keys just add their letter to the text
  const inputHandler = char => {
    if (char === 'X') {
      setText(text.substring(0, text.length - 1));
    } else {
      setText(text + char);
    }
  };

  return (
    <View style={[styles.inputContainer, {backgroundColor: props.theme[4]}]}>
      {/* Input field for the guess */}
      <View style={styles.inputField}>
        <Text style={[styles.input, {color: props.theme[1]}]}>{text}</Text>
      </View>
      {/* Keyboard */}
      <View style={styles.keyboard}>
        {/* First map creates top 3 rows of the keyboard, second map fills those rows with our keys from the previous variable */}
        {keys.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((key, j) => (
              <Pressable
                key={i * 20 + j}
                style={[styles.key, {backgroundColor: props.theme[1]}]}
                onPress={() => inputHandler({key}.key)}>
                {/* The backspace key should have a special character, all other keys just have their letter */}
                {key === 'X' ? (
                  <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
                    ⌫
                  </Text>
                ) : (
                  <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
                    {key.toUpperCase()}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        ))}
        {/* The keys in the final row are handled separately to allow for easier modification of key size and custom text */}
        <View style={[styles.row, {justifyContent: 'flex-end'}]}>
          <Pressable
            style={[styles.key, {backgroundColor: props.theme[1]}]}
            onPress={() => inputHandler('.')}>
            <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
              .
            </Text>
          </Pressable>
          <Pressable
            style={[styles.key, {backgroundColor: props.theme[1]}]}
            onPress={() => inputHandler(':')}>
            <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
              :
            </Text>
          </Pressable>
          <Pressable
            style={[styles.key, {width: 150, backgroundColor: props.theme[1]}]}
            onPress={() => inputHandler(' ')}>
            <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
              Space
            </Text>
          </Pressable>
          <Pressable
            style={[styles.key, {backgroundColor: props.theme[1]}]}
            onPress={() => inputHandler('2')}>
            <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
              2
            </Text>
          </Pressable>
          <Pressable
            style={[styles.key, {backgroundColor: props.theme[1]}]}
            onPress={() => inputHandler('é')}>
            <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
              é
            </Text>
          </Pressable>
          <Pressable
            style={[styles.key, {width: 60, backgroundColor: props.theme[1]}]}
            onPress={() => props.onMakeGuess(text)}>
            <Text style={[styles.keyCharacter, {color: props.theme[3]}]}>
              Guess
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputField: {
    flex: 1,
  },
  input: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'roboto',
    fontVariant: 'small-caps',
  },
  keyboard: {
    flex: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
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
