import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme";

const HomeScreen = () => {

    const [text, setText] = useState("");
    const [isReady, setIsReady] = useState(false);

    return (
        <SafeAreaView edges={["top"]} style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>❂ POKEMON ❂</Text>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.text}>Are you ready to be a pokemon master?</Text>
                        <TextInput
                            style={styles.textField}
                            keyboardType="ascii-capable"
                            placeholder="Type 'Ready!' to start"
                            value={text}
                            onChange={(field) => {
                                setText(field?.nativeEvent?.text);
                                if (field?.nativeEvent?.text === 'Ready!') {
                                    setIsReady(true)
                                } else {
                                    setIsReady(false)
                                }
                            }}
                        />
                        {!isReady && (<Text style={styles.error}>I am not ready yet!</Text>)}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (isReady) {
                                    console.log('YOU ARE READY START')
                                }
                            }}
                        >
                            <Image style={[styles.image, { opacity: !isReady ? 0.5 : 1 }]} source={{ uri: 'https://www.freeiconspng.com/uploads/file-pokeball-png-0.png' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.appColorDarkMain,
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    textField: {
        height: 50,
        backgroundColor: Colors.appColorLightMain,
        color: Colors.appColorDarkMain,
        marginTop: 50,
        borderRadius: 30,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    textTitle: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 40,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 50,
    },
    image: {
        height: 100,
        aspectRatio: 1,
    },
    error: {
        color: Colors.white,
        fontSize: 18,
        color: Colors.red,
        marginTop: 5,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default HomeScreen;