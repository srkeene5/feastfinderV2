import { Text, View } from 'react-native'
import React from 'react'
import 'reactjs-popup/dist/index.css'
import tw from 'twrnc';

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { sendEmail } from './Email.tsx';

//navigation
import { useNavigate } from 'react-router-dom';

import CorePopup from '../../CoreComponents/CorePopup.tsx';
import CoreStyles from '../../CoreComponents/CoreStyles.tsx';
import CoreButton from '../../CoreComponents/CoreButton.tsx';
import { useAuth } from '../../UserComponents/Authorizer.tsx';

export default function SuggPage() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const { ffColors, coreForm } = CoreStyles()

  const [suggTextValue, setSuggValue] = React.useState('')
  const [emailValue, setEmail] = React.useState('')
  const [errPop, setErrPop] = React.useState(false)
  const [errText, setErrText] = React.useState('Error Undefined')
  const [sentPop, setSentPop] = React.useState(false)

  const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|gov|edu)$");

  const resetAll = () => {
    setSuggValue('');
    setEmail('');
    setErrPop(false);
    setErrText('Error Undefined');
    setSentPop(false);
  }

  const subButtonPress = async () => {
    if (suggTextValue !== '') {
      if (emailValue !== '') {
        if (!validEmail.test(emailValue)) {
          console.log('invalidEmail: ' + emailValue);
          setErrText("Invalid Email Address.\nDouble check that you entered it correctly.");
          setErrPop(true);
          return;
        }
      }
      try{
        let subject = "Suggestion from User: " + user.email
        let body = "Suggestion: " + suggTextValue
        console.log(subject + "\n" + body);
        //sendEmail(body, subject)
        console.log('Success!', 'Thank you for your feedback!');
        setSentPop(true);
      } catch (err) {
        console.log(err);
        console.log('Oops!', 'Something went wrong..');
        setErrText(
          "Suggestion failed to send.\n"
          +"Check internet connection.\n"
          +"Otherwise, it may be a server issue.\n\n"
          +"You can reach us at:\n"
          +"\tFeastFinderDev@gmail.com\n\n"
          +"We appologize for the inconvenience"
        );
        setErrPop(true);
      }
    }
    else {
      setErrText('Suggestion must contain text.');
      setErrPop(true);
    }
  }

  return (
    <div style={coreForm.container}>
      <CoreBanner />
      <div style={tw.style(coreForm.innerContainer)}>
        <div style={coreForm.headerContainer}>
          <h2 style={coreForm.title}>FeastFinder</h2>
          <h2 style={coreForm.subtitle}>Help Us Improve</h2>
        </div>
        <View style={tw.style(coreForm.content)}>
          <div style={coreForm.card}>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.header)}>
                Suggestion:
              </Text>
              <View style={tw.style(coreForm.body)}>
                <Text style={tw.style(coreForm.text)}>
                  Suggestions will be sent to developer team for review. User details will be attached.
                </Text>
                <textarea
                autoComplete='on'
                autoCorrect='on'
                autoCapitalize='on'
                style={tw.style(coreForm.textInputBox)}
                onChange={(event)=>{setSuggValue(event.target.value)}}
                value = {suggTextValue}
                placeholder='Enter Suggestion...'
                rows={8}
                />
              </View>
            </View>
            <View
            style={tw.style(coreForm.formItem)}
            >
              <Text
              style={tw.style(coreForm.header)}
              >
                Email (Optional):
              </Text>
              <View style={tw.style(coreForm.body)}>
                <Text
                style={tw.style(coreForm.text)}
                >
                  The dev team may wish to reach out to you for a follow-up for more information about the idea.
                  Include your email so the dev team can more effectively implement your idea.
                </Text>
                <input
                style={coreForm.textInputSingle}
                onChange={(event)=>{setEmail(event.target.value)}}
                value = {emailValue}
                placeholder='Email...'
                />
              </View>
            </View>
            <View style={tw.style(coreForm.buttonContainer)}>
              <CoreButton 
              pressFunc={()=>subButtonPress()}
              bText={'Submit'}
              buttonColor={ffColors.ffGreenL}
              />
            </View>
          </div>
        </View>
      </div>

      <CorePopup 
      popTitle={"Error:"}
      popText={errText}
      closeFunc={()=>{setErrPop(false); setErrText('Error Undefined')}}
      pop={errPop}
      titleColor={ffColors.ffRedL}
      buttons={[
        {
          bText: 'Close',
          bColor: ffColors.ffRedL,
          bFunc: ()=>{setErrPop(false); setErrText('Error Undefined')}
        }
      ]}
      />

      <CorePopup 
      popTitle={"Success:"}
      popText={"Email Sent!\nThank You for the suggestion!"}
      closeFunc={()=>{resetAll(); navigate('/Home');}}
      pop={sentPop}
      titleColor={ffColors.ffGreenL}
      buttons={[
        {
          bText: 'Close',
          bColor: ffColors.ffGreenL,
          bFunc: ()=>{resetAll(); navigate('/Home');}
        }
      ]}
      />
    </div>
  )
}