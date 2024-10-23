import React, {useRef, useState} from 'react';

import {StyleSheet, Text, View, Pressable} from 'react-native';

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['-', 'z', 'x', 'c', 'v', 'b', 'n', 'm', "'", 'X'],
];

const Input = props => {
  const [text, setText] = React.useState('');

  const inputHandler = char => {
    if (char === 'X') {
      setText(text.substring(0, text.length - 1));
    } else {
      setText(text + char);
    }
  };

  return (
    <View style={[styles.inputContainer, {backgroundColor: props.theme[4]}]}>
      <View style={styles.inputField}>
        <Text style={[styles.input, {color: props.theme[1]}]}>{text}</Text>
      </View>
      <View style={styles.keyboard}>
        {keys.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((key, j) => (
              <Pressable
                key={i * 20 + j}
                style={[styles.key, {backgroundColor: props.theme[1]}]}
                onPress={() => inputHandler({key}.key)}>
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
    // flexDirection: 'column',
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
    // alignSelf: 'flex-end',
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'blue',
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
