import React, { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputTextComponent } from "../shared/InputTextComponent";
import { ButtonComponent } from "../shared/ButtonComponent";
import { commonStyles } from "../utlis/helpers";
import { useData } from "../context/DataContext";

export function ChangePassword(){
    const {password, setPassword} = useData('');
    const {confirmPassword, setConfirmPassword} = useData('');
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{}} behavior="position">
            <Image source={require('../images/background.png')} style={{position:'relative',top:-210,left:10} }/>
            <Image source={require('../images/password.png')} style={{position:'absolute',left:95,top:-100} }/>
            </KeyboardAvoidingView>
            <View style ={styles.view2}>
                <View><Text style={{color:'black',fontSize:30,fontWeight:'600'}}>Enter your Password</Text></View>
                <InputTextComponent TextUpper={"New Password"} placeHolder={"######"} value={password} onchange={setPassword}></InputTextComponent>
                <InputTextComponent TextUpper={"Confirm Password"} placeHolder={"######"} value={confirmPassword} onchange={setConfirmPassword}></InputTextComponent>
                <ButtonComponent title={"Done"} buttonStyle={styles.button} textStyle={commonStyles.textInButton}/>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor: 'white',
      },
      view2:{
        marginTop:-150,
        margin:15
      },
      button:{
        backgroundColor: '#2051E5',
        height: 55,
        width: '100%',
        borderRadius: 30,
        marginTop: 30,
      },
   
})