import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configAction } from '../../stores/config/configAction';
import { FlatList, Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { fontPrimaryColor, dark_blue, light_blue, toolbar_style, grey_700 } from '../../constants/colors';
import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class CurrencyTrade extends Component {
	constructor(props) {
		super(props);
		const { quotes } = props;

		this.state = {
			quotes,
			selectedPairCurrency: null,
			amount: '',
			isFinished: false,
		};

	}

	renderItem(name) {
		const { selectedPairCurrency } = this.state;

		const backgroundColor = selectedPairCurrency === name ? dark_blue : light_blue;

		return (
			<View style={[{ backgroundColor }, styles.tradeButton]}>
				<TouchableOpacity onPress={() => this.setState({ selectedPairCurrency: name })}>
					<Text style={styles.text}>{`SELL FOR ${name}`}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const { selectedCurrency } = this.props;
		const { quotes, amount, isFinished, selectedPairCurrency } = this.state;

		return (
			<View style={styles.root}>
				<Toolbar
					leftElement={'arrow-back'}
					onLeftElementPress={() => Actions.pop()}
					centerElement={`TRADE ${selectedCurrency}`}
					style={toolbar_style}
				/>
				<View style={styles.container}>
					<FlatList
						data={quotes}
						renderItem={({ item }) => this.renderItem(item)}
						keyExtractor={item => item} />
					{selectedPairCurrency && (
						<View>
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
							<View style={styles.submitTradeButton}>
								<TouchableOpacity onPress={() => this.setState({ isFinished: true })}>
									<Text style={styles.text}>{'TRADE NOW!'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					{isFinished && <Text style={styles.success}>{`Trade between ${selectedCurrency} and ${selectedPairCurrency} successful!`}</Text>}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		padding: 20
	},
	amountContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	tradeButton: {
		padding: 8,
		margin: 8,
		borderRadius: 8,
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: grey_700,
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
	submitTradeButton: {
		backgroundColor: dark_blue,
		padding: 8,
		margin: 8,
		borderRadius: 15,
		justifyContent: 'center',
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