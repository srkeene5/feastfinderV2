import emailjs from 'emailjs-com'

export const sendEmail = (body: string, subject: string): boolean => {
    var templateParams = {
        subject: subject,
        body: body
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