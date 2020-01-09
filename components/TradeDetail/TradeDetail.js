import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlatList, Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { fontPrimaryColor, dark_blue, light_blue, toolbar_style, grey_700 } from '../../constants/colors';
import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class TradeDetail extends Component {
	constructor(props) {
		super(props);
		const { quotes } = props;

		this.state = {
			quotes,
			selectedPairCurrency: null,
			amount: '',
			isFinished: false,
		};

		console.disableYellowBox = true;
	}

	renderItem(name) {
		const { selectedPairCurrency } = this.state;

		const backgroundColor = selectedPairCurrency === name ? dark_blue : light_blue;

		return (
			<View style={[{ backgroundColor }, styles.button]}>
				<TouchableOpacity onPress={() => this.setState({ selectedPairCurrency: name })}>
					<Text style={styles.text}>{`SELL FOR ${name}`}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const { trade: { quotes, currency } } = this.props;
		const { amount, isFinished, selectedPairCurrency } = this.state;

		return (
			<View style={styles.root}>
				<Toolbar
					leftElement={'arrow-back'}
					onLeftElementPress={() => Actions.pop()}
					centerElement={`Trade ${currency}`}
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
							<View style={[{ backgroundColor: dark_blue }, styles.button]}>
								<TouchableOpacity onPress={() => this.setState({ isFinished: true })}>
									<Text style={styles.text}>{'TRADE NOW!'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					{isFinished && <Text style={styles.successText}>{`Trade between ${currency} and ${selectedPairCurrency} successful!`}</Text>}
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
		marginLeft: 8,
		marginRight: 8,
		marginTop: 50,
		marginBottom: 20
	},
	button: {
		height: 50,
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
		fontWeight: 'bold'
	},
	amountLabel: {
		textAlign: 'center',
		fontSize: 15,
		color: fontPrimaryColor,
		marginRight: 'auto'
	},
	amountText: {
		backgroundColor: '#f3f3f3',
		borderWidth: 1,
		borderColor: '#000',
		textAlign: 'right',
		fontSize: 15,
		color: fontPrimaryColor,
		width: '100%'
	},
	successText: {
		textAlign: 'center',
		fontSize: 15,
		color: 'green',
	}
});

const mapStateToProps = (state) => {
	const { trade } = state;
	return { trade };
};

export default connect(mapStateToProps)(TradeDetail);