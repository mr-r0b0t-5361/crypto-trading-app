import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configAction } from '../../stores/config/configAction';
import { getCurrencyPairs } from '../../network/network-currency';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { light_grey, fontTitleColor } from '../../constants/colors';
import getUniqueElementsArray from '../../utils/getUniqueElementsArray';
import getBaseArray from '../../utils/objectToArray';

class CurrencyList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencyNames: []
		};

		this.getCurrencyPairs();
	}

	async getCurrencyPairs() {
		const { result } = await getCurrencyPairs();
		const resultArray = getBaseArray(result).sort();
		const filteredArray = getUniqueElementsArray(resultArray);

		this.setState({ currencyNames: filteredArray })
	}

	renderItem(name) {
		return (
			<View key={name} style={styles.itemContainer}>
				<Text style={styles.title}>{name}</Text>
				<View style={styles.tradeButton}>
					<TouchableOpacity onPress={()=>{}}>
						<Text style={styles.text}>{'TRADE'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	render() {
		const { currencyNames } = this.state;

		return (
			<View style={styles.container}>
				<FlatList
					data={currencyNames}
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
		borderRadius: 8,
		marginBottom: 5,
		marginTop: 5,
	},
	title: {
		fontSize: 25,
		color: fontTitleColor,
	},
	tradeButton: {
		backgroundColor: '#cee1f3',
		padding: 8,
		margin: 16,
		borderRadius: 15,
		justifyContent: 'flex-end',
		marginLeft: 'auto'
	}
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		configAction,
	}, dispatch)
);

const mapStateToProps = (state) => {
	const { config, map } = state;
	return { config, map };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);