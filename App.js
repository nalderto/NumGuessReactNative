/**
 * Number Guessing Game
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Text, Alert, TextInput, Image } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

const Header = (props) => {
  return (
    <View>
      <Text style={styles.header}>{props.title}</Text>
    </View>
  );
}

class App extends Component {

  state = {
    guess: '',
    actual: 0,
    min: 1,
    max: 100,
    guessCount: 0,
  }

  componentDidMount() {
    this.generateNumber();
  }

  generateNumber = () => {
    let genActual = Math.floor(Math.random() * (this.state.max - this.state.min + 1) + this.state.min);
    this.setState({ actual: genActual });
  }

  handleGuess = (text) => {
    this.setState({ guess: text });
  }

  guessChecker = () => {
    // Check if guess is an integer
    let intGuess = parseInt(this.state.guess);
    if (isNaN(intGuess) || intGuess < this.state.min || intGuess > this.state.max) {
      Alert.alert('Please guess an integer within the given bounds');
      console.log(intGuess);
    }

    else if (intGuess > this.state.actual) {
      Alert.alert('Your guess is too big!');
      this.setState({guessCount: this.state.guessCount + 1});
    }

    else if (intGuess < this.state.actual) {
      Alert.alert('Your guess is too small!');
      this.setState({guessCount: this.state.guessCount + 1});
    }

    else if (intGuess === this.state.actual) {
      Alert.alert('That\'s right!  Nice job!  Play again!');
      this.setState({guessCount: 0});
      this.generateNumber();
    }
    this.setState({guess: ''});
  }

  render() {
    return(
      <SafeAreaView style = { styles.container } >
        <Image style={styles.reactLogo} source={require('./assets/react.png')}/>
        <Header title="NumGuess!" />
        <View>
          <Text style={styles.title}>
            I am thinking of an integer between 1 and 100.  Guess it below, and I will tell you if my number is higher or lower.
        </Text>
        </View>
        <Separator/>
        <View>
        <TextInput
            style={styles.numInput}
            placeholder="Type your guess..."
            onChangeText={this.handleGuess}
          />
        </View>
        <Separator />
        <TouchableOpacity
          style={styles.button}
          onPress={this.guessChecker}>
            <Text>Guess!</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Number of Guesses: {this.state.guessCount} </Text>
        </View>
        <View style={styles.fixToText}>

        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reactLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  header: {
    textAlign: "center",
    fontSize: 48,
  },
  numInput: {
    width: 200,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#f194ff",
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;