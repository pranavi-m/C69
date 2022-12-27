import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Permissions from 'expo-permissions' 
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class TransactionScreen extends Component{

    constructor(props){
        super(props);
     this.state={
        domState:'normal',
        hasCameraPermissions:'null',
        scanned:false,
        scannedData:''  
    }
    }

    getCameraPermissions=async(domState)=>{
     const {status} = await Permissions.askAsync(Permissions.CAMERA)
     this.setState({
        hasCameraPermissions:status==="granted",
        domState:domState,
        scanned:false
     })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            domState:'normal',
            scanned:true,
            scannedData:data
        })
    }

render()
{
    const {domState, hasCameraPermissions, scanned, scannedData}=this.state
    if(domState==="scanner")
    {
      return(
        <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}/>
      )
    }

    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.getCameraPermissions("scanner")}>
            <Text style = {styles.text}>Scan any QR code.</Text>
        </TouchableOpacity>
    </View>    
    )
}
}



const styles = StyleSheet.create({
    container:{
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#5653D4" 
    },
    text:{
        color: "#ffff", fontSize: 30 
    },
    button:{
        width: "43%", height: 55, justifyContent: "center", alignItems: "center", backgroundColor: "#F48D20", borderRadius: 15
    }
})