'use strict';

var React = require('react-native');
var {
	View,
	ListView,
	Text,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	StyleSheet,
} = React;

var BookDetails = require('./BookDetails');

var buildUrl = function(q) {
  return 'https://www.googleapis.com/books/v1/volumes?q='
  + encodeURIComponent(q)
  + '&langRestrict=en&maxResults=40';
};

var ResultsScreen = React.createClass({
	getInitialState: function() {
		return {
			isLoading: true,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};
	},

	componentDidMount: function() {
    this.fetchResults(this.props.searchPhrase);
  },

  fetchResults: function(searchPhrase) {
    fetch(buildUrl(searchPhrase))
    .then(response => response.json())
    .then(jsonData => {
    	this.setState({
    		isLoading: false,
    		dataSource: this.state.dataSource.cloneWithRows(jsonData.items)
    	});
    })
    .catch(error   => console.dir(error));
  },

  goBack: function() {
  	this.props.navigator.pop();
  },

  retry: function() {
  	this.fetchResults();
  },

  render: function() {
  	if (this.state.isLoading) {
  		return this.renderLoadingMessage();
  	} else {
  		return this.renderResults();
  	}
  },

	renderLoadingMessage: function() {
		return (
			<View   style = {styles.container}>
				<View style = {styles.loadingInfoContainer}>
					<Text style = {styles.label}>
						Searching for "{this.props.searchPhrase}".
					</Text>
					<Text style = {styles.label}>
						Please wait...
					</Text>
				</View>

				<View style = {styles.modalButtonsContainer}>
					<TouchableOpacity onPress = {this.goBack}>
						<View   style = {styles.modalButon}>
							<Text style = {styles.modalButonText}>&lt; Go back</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress = {this.retry}>
						<View   style = {styles.modalButon}>
							<Text style = {styles.modalButtonText}>&#8635; Retry</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	},

	renderResults: function() {
		return(
			<ListView
				dataSource = {this.state.dataSource}
				renderRow  = {this.renderBook}
				style 		 = {styles.listView}
			/>
		);
	},

	renderBook: function(book) {
		return (
			<TouchableHighlight onPress = {() => this.showBookDetails(book)}>
				<View   style = {styles.row}>
					<Image
						style  = {styles.thumbnail}
						source = {{uri: book.volumeInfo.imageLinks.smallThumbnail}}
						/>
					<View   style = {styles.rightContainer}>
						<Text style = {styles.title}>
							{book.volumeInfo.title}
						</Text>
						<Text style = {styles.subtitle}>
							{book.volumeInfo.subtitle}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	},

	showBookDetails: function(book) {
  	this.props.navigator.push({
  		title: book.volumeInfo.title,
  		component: BookDetails,
  		passProps: {book}
  	});
  }
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 	 'column',
		backgroundColor: '#b443d0',
	},
	label: {
		fontSize: 	24,
		fontWeight: 'normal',
		color: 			'#fff',
	},
	listView: {
	},

	rightContainer: {
		flex: 1,
	},

	row: {
		flex: 1,
		flexDirection:  'row',
		justifyContent: 'center',
		alignItems: 		'center',
		backgroundColor:'#b443d0',
		paddingRight:  20,
		marginTop: 		 1,
	},

	title: {
		fontSize: 	20,
		fontWeight: 'bold',
		color: 			'#fff'
	},

	subtitle: {
		fontSize: 	16,
		fontWeight: 'normal',
		color: 			'#fff',
	},

	thumbnail: {
		width: 			 70,
		height: 	   108,
		marginRight: 16,
	},

	loadingInfoContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent:'flex-end',
    alignItems: 	 'center',
	},

	modalButtonsContainer: {
	  flex: 1,
	  flexDirection: 'row',
	 	justifyContent:'center',
		alignItems: 	 'flex-start',
		top: 60,
  },

	modalButon: {
		borderColor: '#ffffff',
		borderRadius:   4,
		borderWidth: 		1,
		marginLeft: 	 20,
		marginRight: 	 20,
		paddingLeft: 	 20,
		paddingRight:  20,
		paddingTop: 	 10,
		paddingBottom: 10,
	},

	modalButonText: {
		fontSize: 18,
		color: '#ffffff',
	}
});

module.exports = ResultsScreen;