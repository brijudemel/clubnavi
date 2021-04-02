import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


const homeScreen=({navigation})=>{
    navigation.setOptions({
        headerRight:()=>(
            <Button
            title="Save"
            onPress={()=>{
                navigation.replace('Home');
            }}
            />
        )
    })
    return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>Home Screen</Text>
        <Button title="Goto Details" onPress={()=>{navigation.navigate('Details')}} />
    </View>
}

export default homeScreen;