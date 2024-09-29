import Mailer from 'react-native-mail';
import { Alert } from 'react-native';

export function sendEmail(body: string, subject: string, userID: number) {
    
    Mailer.mail({
        subject: subject,
        recipients: ["feastfinderdev@gmail.com"], // replace with your email
        body: `${body}\n\n Account Id: #${userID}`,
        isHTML: false,
    },
    (error, event) => {
        Alert.alert(
            error,
            event,
            [
                {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
        )
    });
}