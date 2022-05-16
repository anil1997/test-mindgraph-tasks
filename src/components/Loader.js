import React from 'react';
import { Modal, View } from 'react-native';
import { Colors } from '../theme'; 


const Loader = (props) => {

    return (
        props.loading && (
            <Modal
                animationType="none"
                transparent={true}
                visible={props.loading}>
                <View style={{ flex: 1 }}>
                  <ActivityIndicator size="large" color={Colors.appColorLightMain} />
                </View>
            </Modal>
        )
    );
}

export default Loader;