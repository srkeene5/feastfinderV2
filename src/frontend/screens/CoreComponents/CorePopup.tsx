import { View, Text } from 'react-native'
import React from 'react'
import Popup from 'reactjs-popup';
import CoreButton from './CoreButton.tsx';
import { popStyles } from './CoreStyles.tsx';

interface Props {
    children?: React.ReactNode;
    pop: boolean;
    popTitle: String,
    popText: String, 
    buttons: {bText: String, bColor: Object, bFunc: ()=>void}[]
    closeFunc: ()=>void, 
    titleColor,
}

const CorePopup: React.FC<Props> = ({children, pop, popTitle, popText, buttons, closeFunc, titleColor}) => {
    return (
        <Popup 
        open={pop} 
        onClose={()=>closeFunc()}
        contentStyle={popStyles.popup}
        >
            <View>
                <Text
                style={[popStyles.titleText, { color: titleColor }]}
                >
                    {popTitle} 
                </Text>
            </View>
            <View>
                <Text
                style={popStyles.popupText}
                >
                    {popText}
                </Text>
            </View>
            {children}
            <View
            style={popStyles.buttonContainer}
            >
                {buttons.map((item, index) =>(
                    <CoreButton
                    key={index}
                    pressFunc={item.bFunc}
                    bText={item.bText}
                    buttonColor={item.bColor}
                    />   
                ))}
            </View>
        </Popup>
    )
}

export default CorePopup