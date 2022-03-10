import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Task = ({ message, selected, darkMode }) => {

	return (
		<View style={darkMode ? styles.itemDark : styles.itemLight}>
			<View style={styles.itemLeft}>
				<View style={styles.square}></View>
				<Text style={darkMode ? styles.itemTextDark : styles.itemTextLight}>{message}</Text>
			</View>
			<View style={selected ? styles.circularSelected : styles.circular}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	itemLight: {
		backgroundColor: '#FFF',
		padding: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#FFF',
	},
	itemDark: {
		backgroundColor: '#121212',
		padding: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#C0C0C0',
	},
	itemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	square: {
		width: 24,
		height: 24,
		backgroundColor: '#55BCF6',
		opacity: 0.4,
		borderRadius: 5,
		marginRight: 15,
	},
	itemTextLight: {
		maxWidth: '80%',
		color: '#000'
	},
	itemTextDark: {
		maxWidth: '80%',
		color: '#C0C0C0'
	},
	circular: {
		width: 12,
		height: 12,
		borderColor: '#55BCF6',
		borderWidth: 2,
		borderRadius: 5,
	},
	circularSelected: {
		width: 12,
		height: 12,
		borderColor: '#55BCF6',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#55BCF6',
	},
})

export default Task;