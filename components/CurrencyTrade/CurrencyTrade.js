import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configAction } from '../../stores/config/configAction';
import { FlatList, Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { fontPrimaryColor } from '../../constants/colors';

class CurrencyTrade extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pairCurrencies: ['ETH', 'XRP', 'XLM'],
			amount: '',
			isFinished: false,
		};

	}

	renderItem(name) {
		return (
			<View style={styles.tradeButton}>
				<TouchableOpacity onPress={() => { }}>
					<Text style={styles.text}>{`SELL FOR ${name}`}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const { pairCurrencies, amount, isFinished } = this.state;

		return (
			<View style={styles.container}>
				<FlatList
					data={pairCurrencies}
					renderItem={({ item }) => this.renderItem(item)}
					keyExtractor={item => item} />
				<View style={styles.amountContainer}>
					<Text style={styles.amountLabel}>{'Amount'}</Text>
					<TextInput
						keyboardType={'numeric'}
						placeholderTextColor={fontPrimaryColor}
						style={styles.amountText}
						onChangeText={amount => this.setState({ amount })}
						value={amount}
					/>
				</View>
				<View style={styles.tradeButton}>
					<TouchableOpacity onPress={() => this.setState({ isFinished: true })}>
						<Text style={styles.text}>{'TRADE NOW!'}</Text>
					</TouchableOpacity>
				</View>
				{isFinished && <Text style={styles.success}>{'Trade between BTC and XLM successful!'}</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	amountContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	tradeButton: {
		backgroundColor: '#cee1f3',
		padding: 8,
		margin: 8,
		borderRadius: 15,
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 15,
		color: fontPrimaryColor,
	},
	amountLabel: {
		textAlign: 'center',
		fontSize: 15,
		color: fontPrimaryColor,
		marginRight: 'auto'
	},
	amountText: {
		borderWidth: 1,
		borderColor: '#000',
		textAlign: 'right',
		fontSize: 15,
		color: fontPrimaryColor,
		width: '100%'
	},
	success: {
		textAlign: 'center',
		fontSize: 15,
		color: 'green',
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTrade);