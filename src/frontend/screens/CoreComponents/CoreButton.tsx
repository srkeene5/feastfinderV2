import { Pressable, Text } from 'react-native'
import React from 'react'
import { buttonStyles, ffColors } from './CoreStyles.tsx'

const CoreButton = ({pressFunc, bText, buttonColor}) => {
    var darkB = false;
    if (buttonColor === ffColors.ffGreyL 
            || buttonColor === ffColors.ffGreyD){
        darkB = true;
    }
    return (
        <Pressable
        onPress={()=>pressFunc()}
        style={[buttonStyles.popupButton, {backgroundColor: buttonColor}]}
        >
            <Text
            style={[buttonStyles.buttonText, darkB ? {color: 'black'} : {color: 'white'}]}
            >
                {bText}
            </Text>
        </Pressable>
    )
}

export default CoreButton