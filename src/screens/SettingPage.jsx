import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./UserManagement";


export function SettingPage(){
    return(
        <SafeAreaView style={style.Container}>
            <View >
                <Text style={style.header}>Settings</Text>
            </View>
            <View style={{margin:10}}>
                <TouchableOpacity><Text style={[styles.text,{color:'black'}]}>Profile</Text></TouchableOpacity>
                <TouchableOpacity><Text style={[styles.text,{color:'black'}]}>Change Password</Text></TouchableOpacity>
                <TouchableOpacity><Text style={[styles.text,{color:'red'}]}>Logout</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:20,
        marginVertical:5
    }
})