import emailjs from 'emailjs-com'

export const sendEmail = (body: string, subject: string): boolean => {
    var templateParams = {
        subject: subject,
        body: body,
        to_email: 'FeastFinderDev@gmail.com'
    }
    emailjs.send('service_oonflrq','template_nnlmodk',templateParams,'Ho_oAclYyi4QtI1o3')
        .then((result) => {
            //success
            console.log("Success\nResult: " + result);
            return true;
        }, (error) => {
            //error
            console.log("Error: " + error);
            return false;
        });
    return false;
}

export const sendSubscriberEmail = (body: string, subject: string, toEmail: string): boolean => {
    var templateParams = {
        to_email: toEmail,
        subject: subject,
        body: body
    }
    emailjs.send('service_oonflrq','template_nnlmodk',templateParams,'Ho_oAclYyi4QtI1o3')
        .then((result) => {
            console.log("Success\nResult: " + result);
            return true;
        }, (error) => {
            console.log("Error: " + error);
            return false;
        });
    return false;
}

export const sendNotificationEmail = (userEmail: string, isWelcome: boolean): boolean => {
    const subject = isWelcome ? 'Welcome to FeastFinder Updates!' : 'Farewell from FeastFinder Updates';
    const body = isWelcome ? 
        `Welcome to FeastFinder notifications! You'll receive updates about service changes and important announcements.` :
        `You have been unsubscribed from FeastFinder notifications. You can always resubscribe from our website.`;
    
    return sendSubscriberEmail(body, subject, userEmail);
}