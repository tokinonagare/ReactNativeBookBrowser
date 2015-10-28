'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text,
  TextInput,
  StyleSheet,
} = React;

var ResultsScreen = require('./ResultsScreen');

var SearchScreen = React.createClass({

  gotoResultsScreen: function(searchPhrase) { 
      this.props.navigator.push({
      title: 'Results',
      component: ResultsScreen,
      passProps: { 'searchPhrase': searchPhrase },
    }); 
  },

  render: function() {
    return (
      <View style={styles.container} >
        <Text style={styles.headline} >
          BookBrowser
        </Text>
        <Text style={styles.lable} >
          Find books containing:
        </Text>
        <TextInput style= {styles.textInput}
         placeholder= {this.props.placeholder}
         returnKeyType= "search"
         enablesReturnKeyAutomatically= {true}
         onEndEditing= { event => this.gotoResultsScreen(event.nativeEvent.text) } />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:  'column',
    justifyContent: 'flex-start',
    alignItems:     'center',
    backgroundColor: Math.random() > 0.5 ? '#b443d0' : '#000000',
  },
  headline: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 160,
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
  }
});

module.exports = SearchScreen;