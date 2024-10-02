import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../UserComponents/Authorizer.tsx';
import Popup from 'reactjs-popup'

export default function AccountLinkedAPIs() {
    
    // User Token
    const { user } = useAuth();

    // Boolean Account Links
    const [doordashLink, setDoordashLink] = React.useState(false);
    const [grubhubLink, setGrubhubLink] = React.useState(false);
    const [uberLink, setUberLink] = React.useState(false);

    // PopUp variables
    const [userValue, setuserValue] = React.useState('');
    const [passValue, setPassValue] = React.useState('');
    const [buttonService, setButtonService] = React.useState('Error Undefined')
    const [loginPop, setLoginPop] = React.useState(false);
    const [logoutPop, setLogoutPop] = React.useState(false);
    const [errPop, setErrPop] = React.useState(false)
    const [errText, setErrText] = React.useState('Error Undefined')

    const resetUserPass = () => {
        setuserValue('');
        setPassValue('');
    }

    const checkLogin = async (service: string) => {
        var fetchAddr = 'http://localhost:5001/api/auth/'
        switch (service) {
            case "DoorDash":
                fetchAddr += 'doordash';
                break;
            case "GrubHub":
                fetchAddr += 'grubhub';
                break;
            case "UberEats":
                fetchAddr += 'uber';
                break;
            default:
                console.error('switchFailure');
                return;
        }
        fetchAddr += 'login/status';
        
        try {
            const res = await fetch(fetchAddr, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : "Bearer " + user.token
                },
            });
            if (res.ok) {
                const data = await res.json();
                var isStored
                switch (service) {
                    case "DoorDash":
                        setDoordashLink(data.doordash_stored);
                        break;
                    case "GrubHub":
                        setGrubhubLink(data.grubhub_stored);
                        break;
                    case "UberEats":
                        setUberLink(data.uber_stored);
                        break;
                    default:
                        console.error('switchFailure');
                        return;
                }
                console.log("LoggedIn to "+ service + ": "+(isStored))
            } else {
                const errorData = await res.json();
                console.error('Error during login:', errorData);
            }
        } catch(error){
            console.error('Network error:', error);
        }
    }

    const getLinked = (service: string) => {
        checkLogin(service);
        var linked;
        switch (service) {
            case "DoorDash":
                linked = doordashLink
                break;
            case "GrubHub":
                linked = grubhubLink;
                break;
            case "UberEats":
                linked = uberLink;
                break;
            default:
                console.error('switchFailure');
                return;
        }
        if (linked) {
            return (
                <View
                style={styles.linkedContainer}
                >
                    <Pressable
                    onPress={()=>{setButtonService(service); setLogoutPop(true)}}
                    style={[styles.buttonUnlink, styles.button]}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Unlink Account
                        </Text>
                    </Pressable>
                    <Text
                    style={[styles.serviceText, styles.text]}
                    >
                        {service + ": "} 
                    </Text>
                    <View>
                        <Text
                        style={[styles.textLinked, styles.text]}
                        >
                        Linked!
                        </Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View
                style={styles.linkedContainer}
                >
                    <Pressable
                    onPress={()=>{setButtonService(service); setLoginPop(true)}}
                    style={[styles.buttonLink, styles.button]}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Link Account
                        </Text>
                    </Pressable>
                    <Text
                    style={[styles.serviceText, styles.text]}
                    >
                        {"GrubHub: "} 
                    </Text>
                    <View>
                        <Text
                        style={[styles.textUnlinked, styles.text]}
                        >
                        Not Linked
                        </Text>
                    </View>
                </View>
            )
        }
    }

    const popLoginHandler = async () => {
        if (!userValue) {
            setErrText("Username Blank");
            setErrPop(true);
            return;
        } else if (!passValue) {
            setErrText("Password Blank");
            setErrPop(true);
            return;
        }

        try {
            var response
            var fetchAddr = 'http://localhost:5001/api/auth/'
            switch (buttonService) {
                case "DoorDash":
                    fetchAddr += 'doordashlogin';
                    response = await fetch(fetchAddr, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + user.token
                        },
                        body: JSON.stringify({
                            doordash_email: userValue,
                            doordash_password: passValue,
                        }),
                    });
                    break;
                case "GrubHub":
                    fetchAddr += 'grubhublogin';
                    response = await fetch(fetchAddr, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + user.token
                        },
                        body: JSON.stringify({
                            grubhub_email: userValue,
                            grubhub_password: passValue,
                        }),
                    });
                    break;
                case "UberEats":
                    fetchAddr += 'uberlogin';
                    response = await fetch(fetchAddr, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + user.token
                        },
                        body: JSON.stringify({
                            uber_email: userValue,
                            uber_password: passValue,
                        }),
                    });
                    break;
                default:
                    console.error('switchFailure');
                    setErrText("Internal Service Error\nDelivery Service not recognized");
                    setErrPop(true);
                    return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to register');
            }

            console.log('Registration successful:', data);
            setLoginPop(false); 
            setButtonService('Error Undefined');
            resetUserPass();
        } catch (err) {
            setErrText(err.message);
            setErrPop(true);
        }
    }

    const popLogoutHandler = async () => {
        try {
            var fetchAddr = 'http://localhost:5001/api/auth/'
            switch (buttonService) {
                case "DoorDash":
                    fetchAddr += 'doordashlogin';
                    break;
                case "GrubHub":
                    fetchAddr += 'grubhublogin';
                    break;
                case "UberEats":
                    fetchAddr += 'uberlogin';
                    break;
                default:
                    console.error('switchFailure');
                    setErrText("Internal Service Error\nDelivery Service not recognized");
                    setErrPop(true);
                    return;
            }
            const response = await fetch(fetchAddr, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : "Bearer " + user.token
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to register');
            }

            console.log('Registration successful:', data);
            setLogoutPop(false); 
            setButtonService('Error Undefined');
        } catch (err) {
            setErrText(err.message);
            setErrPop(true);
        }
    }
  
    return (
        <View>
            <View>
                {getLinked("DoorDash")}
                {getLinked("GrubHub")}
                {getLinked("UberEats")}
            </View>

            <Popup 
            open={loginPop} 
            onClose={()=>{setLoginPop(false); setButtonService('Error Undefined'); resetUserPass();}}
            contentStyle={styles.popup}
            >
                <View>
                    <Text
                    style={styles.promptText}
                    >
                        Enter {buttonService} Login to Link Account: 
                    </Text>
                </View>
                <View
                style={styles.loginContainer}
                >
                    <Text
                    style={styles.popupText}
                    >
                        Login:
                    </Text>
                    <input
                    style={styles.popInput}
                    onChange={(event)=>{setuserValue(event.target.value)}}
                    value = {userValue}
                    placeholder='Username...'
                    />
                    <input
                    style={styles.popInput}
                    onChange={(event)=>{setPassValue(event.target.value)}}
                    value = {passValue}
                    placeholder='Password...'
                    />
                </View>
                <View
                style={styles.buttonContainer}
                >
                    <Pressable
                    onPress={()=>{popLoginHandler()}}
                    style={styles.popupSubmitButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Submit
                        </Text>
                    </Pressable>
                    <Pressable
                    onPress={()=>{setLoginPop(false); setButtonService('Error Undefined'); resetUserPass()}}
                    style={styles.popupButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Close
                        </Text>
                    </Pressable>
                </View>
            </Popup>

            <Popup 
            open={logoutPop} 
            onClose={()=>{setLogoutPop(false); setButtonService('Error Undefined')}}
            contentStyle={styles.popup}
            >
                <View>
                    <Text
                    style={styles.errorText}
                    >
                        Confirm unlink {buttonService} Account:
                    </Text>
                </View>
                <View
                style={styles.loginContainer}
                >
                </View>
                <View
                style={styles.buttonContainer}
                >
                    <Pressable
                    onPress={()=>{popLogoutHandler()}}
                    style={styles.popupSubmitButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Confirm
                        </Text>
                    </Pressable>
                    <Pressable
                    onPress={()=>{setLogoutPop(false); setButtonService('Error Undefined')}}
                    style={styles.popupButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </Popup>

            <Popup 
            open={errPop} 
            onClose={()=>{setErrPop(false); setErrText('Error Undefined')}}
            contentStyle={styles.popup}
            >
                <View>
                    <Text
                    style={styles.errorText}
                    >
                        Error: 
                    </Text>
                </View>
                <View>
                    <Text
                    style={styles.popupText}
                    >
                        {errText}
                    </Text>
                </View>
                <View
                style={styles.buttonContainer}
                >
                    <Pressable
                    onPress={()=>{setErrPop(false); setErrText('Error Undefined')}}
                    style={styles.popupButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Close
                        </Text>
                    </Pressable>
                </View>
            </Popup>
        </View>
    )
}

const styles = StyleSheet.create({
    //Linked Account Styles
    textLinked: {
        color: 'green',
    },
    textUnlinked: {
        color: 'red',
    },
    buttonText: {
        fontWeight: 'bold',
    },
    text: {
        
    },
    linkedContainer: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    },
    serviceText: {
        fontWeight: 'bold',
    },
    buttonUnlink: {
        backgroundColor: '#bbbbbb',
    },
    buttonLink: {
        backgroundColor: '#449366',
    },
    button: {
        width: 130,
        height: 35,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 450,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        //backgroundColor: 'red'
    },
    popupText: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    promptText: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#449366'
    },
    errorText: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff3333'
    },
    popupButton: {
        backgroundColor: '#dd3333',
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    popupSubmitButton: {
        backgroundColor: '#33aa33',
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-evenly',
    },
    popInput:{
        height: 'auto',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    loginContainer: {
        margin: 20
    },
})