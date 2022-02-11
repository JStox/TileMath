import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DroppableBox = ({value, spot}) => {
    return (
        <View style={styles.box}>
            <Text>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 50,
        width: 50,
        backgroundColor: 'hsl(200, 20%, 40%)',
        borderRadius: 5
    }
})

export default DroppableBox;
