import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateQuotes } from '../../stores/trade/updateQuotes';
import { updateCurrency } from '../../stores/trade/updateCurrency';
import { getCurrencyPairs } from '../../network/network-currency';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { light_grey, fontTitleColor, fontPrimaryColor, grey_700 } from '../../constants/colors';
import getUniqueElementsArray from '../../utils/getUniqueElementsArray';
import { Actions } from 'react-native-router-flux';
import getBaseAndQuoteArray from '../../utils/getBaseAndQuoteArray';
import getBaseArray from '../../utils/getBaseArray';

class CurrencyList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencyPairs: [],
			baseArray: [],
		};

		this.getCurrencyPairs();

		this.getRandomPairCurrencies = this.getRandomPairCurrencies.bind(this);
		console.disableYellowBox = true;
	}

	async getCurrencyPairs() {
		const { result } = await getCurrencyPairs();
	
		const baseArrayNotUnique = getBaseArray(result).sort();
		const baseArray = getUniqueElementsArray(baseArrayNotUnique);

		const currencyPairs = getBaseAndQuoteArray(result);

		this.setState({ currencyPairs, baseArray })
	}

	getRandomPairCurrencies(base) {
		const { currencyPairs } = this.state;

		let quotes = [];
		for (let index = 0; index < 3; index++) {
			const { quote } = currencyPairs.find(pair => pair.base === base && !quotes.includes(pair.quote));
			quote && quotes.push(quote);
		}

		this.props.updateQuotes(quotes);
		this.props.updateCurrency(base);

		Actions.push('tradeDetail')
	}

	renderItem(base) {
		return (
			<View key={base} style={styles.itemContainer}>
				<Text style={styles.title}>{base}</Text>
				<View style={styles.tradeButton}>
					<TouchableOpacity onPress={() => this.getRandomPairCurrencies(base)}>
						<Text style={styles.text}>{'TRADE'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	render() {
		const { baseArray } = this.state;

		return (
			<View style={styles.container}>
				<FlatList
					data={baseArray}
					renderItem={({ item }) => this.renderItem(item)}
					keyExtractor={item => item} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: light_grey,
		padding: 5,
		borderRadius: 2,
		marginBottom: 5,
		marginTop: 5,
		borderBottomWidth: 1,
		borderBottomColor: grey_700,
	},
	title: {
		fontSize: 25,
		color: fontTitleColor,
	},
	tradeButton: {
		backgroundColor: '#cee1f3',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 16,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: grey_700,
		justifyContent: 'flex-end',
		marginLeft: 'auto'
	},
	text: {
		textAlign: 'center',
		fontSize: 18,
		color: fontPrimaryColor,
		fontWeight: 'bold',
	},
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		updateQuotes,
		updateCurrency,
	}, dispatch)
);

const mapStateToProps = (state) => {
	const { trade } = state;
	return { trade };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);