import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../shared/CommonComponent";
import { style } from "./UserManagement";
import { InputTextComponent } from "../shared/InputTextComponent";
import { ButtonComponent } from "../shared/ButtonComponent";

export function EditProfile(){
    return(
        <SafeAreaView style={style.Container}>
            <Header header={'Edit Profile'}/>
            <ScrollView>
            <View style={{marginTop:10}}>
                <InputTextComponent upperFont={styles.fontStyle} TextUpper={'Name'} placeHolder={'Name'}/>
                <InputTextComponent upperFont={styles.fontStyle} TextUpper={'Phone'} placeHolder={'Name'}/>
                <InputTextComponent upperFont={styles.fontStyle} TextUpper={'Phone'} placeHolder={'Name'} isEditable={false}/>
                <InputTextComponent upperFont={styles.fontStyle} TextUpper={'Location'} placeHolder={'Name'} isEditable={false}/>
                <InputTextComponent upperFont={styles.fontStyle} TextUpper={'Role'} placeHolder={'Name'} isEditable={false}/>
               <ButtonComponent buttonStyle={styles.button} textStyle={styles.textLogin} title={'Save'}/>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    fontStyle:{
        margin: 10, 
        fontWeight: '600',
         color: 'black'
      },
      button: {
        backgroundColor: '#2051E5',
        height: 55,
        width: '97%',
        borderRadius: 30,
        marginVertical: 10,
        alignSelf:'center'
      },
      textLogin: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        textAlign:'center',
        color:'white',
        marginTop:10
      }
})