import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>

        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
        <View style={styles.card}>
          <Text>Card1</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'grey',
    height: 50,
    // width: 50,
  },
  card: {
    flex: 1,
    backgroundColor: 'green',
    margin: 10,
  },
});

export default App;
