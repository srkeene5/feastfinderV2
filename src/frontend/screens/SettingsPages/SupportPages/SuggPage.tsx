import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import 'reactjs-popup/dist/index.css'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { sendEmail } from './Email.tsx';

//navigation
import { useLocation, useNavigate } from 'react-router-dom';
import CorePopup from '../../CoreComponents/CorePopup.tsx';
import { coreStyles, ffColors } from '../../CoreComponents/CoreStyles.tsx';
import CoreButton from '../../CoreComponents/CoreButton.tsx';

export default function SuggPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {uid} = location.state;

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
        let subject = "Suggestion: " + uid
        let body = "Suggestion: " + suggTextValue
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
    <SafeAreaView>
      <CoreBanner />
      <View
      style={styles.suggestion}
      >
        <View
        style={styles.suggForm}
        >
          <Text
          style={coreStyles.headingText}
          >
            Suggestion:
          </Text>
          <View
          style={styles.suggSection}
          >
            <Text
            style={styles.suggInfo}
            >
              Suggestions will be sent to developer team for review. User details will be attached.
            </Text>
            <textarea
            autoComplete='on'
            autoCorrect='on'
            autoCapitalize='on'
            style={styles.suggTextBox}
            onChange={(event)=>{setSuggValue(event.target.value)}}
            value = {suggTextValue}
            placeholder='Enter Suggestion...'
            rows={8}
            />
          </View>
          <Text
          style={coreStyles.headingText}
          >
            Email (Optional):
          </Text>
          <View
          style={styles.suggSection}
          >
            <Text
            style={styles.suggInfo}
            >
              The dev team may wish to reach out to you for a follow-up for more information about the idea.
              Include your email so the dev team can more effectively implement your idea.
            </Text>
            <input
            style={styles.suggEmailInput}
            onChange={(event)=>{setEmail(event.target.value)}}
            value = {emailValue}
            placeholder='Email...'
            />
          </View>
          <View
          style={styles.buttonContainer}
          >
            <CoreButton 
            pressFunc={()=>subButtonPress()}
            bText={'Submit'}
            buttonColor={ffColors.ffGreenL}
            />
          </View>
        </View>
      </View>

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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  suggestion: {
    alignItems: 'center'
  },
  suggTextBox:{
    height: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    resize: 'none',
  },
  suggEmailInput:{
    height: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  suggForm: {
    //alignItems: 'center',
    margin: 30,
    flexGrow: 1,
    backgroundColor: '#dddddd',
    borderRadius: 30,
    padding: 20
  },
  suggInfo: {
    marginBottom: 20,
  },
  suggSection: {
    margin: 30,
    marginTop: 10
  },
  buttonContainer: {
    alignItems: 'center'
  },
})