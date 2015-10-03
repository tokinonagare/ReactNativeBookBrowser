'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text,
  TextInput,
  StyleSheet,
} = React;

var BookBrowser = React.createClass({
  render: function() {
    return (
      <View style={styles.container} >
        <Text style={styles.headline} >
          BookBrowser
        </Text>
        <Text style={styles.lable} >
          Find book containing:
        </Text>
        <TextInput style={styles.textInput}
         placeholder= "  e.g. JavaScript or Mobile" />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:  'column',
    justifyContent: 'center',
    alignItems:     'center',
    backgroundColor: '#b443d0',
  },
  headline: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 28,
  },
  lable: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#FFF',
    marginBottom: 8,
  },
  textInput: {
    borderColor: '#8E8E93',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
    height: 40,
    marginLeft:  60,
    marginRight: 60,
    padding: 8,
  },
});

AppRegistry.registerComponent('BookBrowser', () => BookBrowser);
