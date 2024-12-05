import { Pressable, Text, ViewStyle } from 'react-native'
import React from 'react'
import CoreStyles from './CoreStyles.tsx'

interface ButtonProps {
    pressFunc: ()=>void
    bText: string
    buttonColor: string
    textColor?: string
}

const CoreButton: React.FC<ButtonProps> = ({pressFunc, bText, buttonColor, textColor}) => {
    const { buttonStyles, ffColors } = CoreStyles();
    var darkB = false;
    return (
        <Pressable
        onPress={()=>pressFunc()}
        style={[buttonStyles.popupButton, {backgroundColor: buttonColor}]}
        >
            <Text
            style={[buttonStyles.buttonText, textColor && {color: textColor}]}
            >
                {bText}
            </Text>
        </Pressable>
    )
}

export default CoreButton