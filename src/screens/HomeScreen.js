import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme";

const HomeScreen = () => {

    return(
        <SafeAreaView edges={["top"]} style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>Home Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.appColorDarkMain,
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 20
    }
})

export default HomeScreen;