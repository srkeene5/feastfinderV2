import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { sendEmail } from './Email.tsx';

//navigation
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuggPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {uid} = location.state;

  const [suggTextValue, setSuggValue] = React.useState('')
  const [emailValue, setEmail] = React.useState('')
  const [noTextPop, setNoTextPop] = React.useState(false)
  const [sentPop, setSentPop] = React.useState(false)
  const [invalidEmail, setInvalidEmail] = React.useState(false)
  const [emailFailure, setEmailFailure] = React.useState(false)

  const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|gov|edu)$");

  const subButtonPress = async () => {
    if (suggTextValue !== '') {
      if (emailValue !== '') {
        if (!validEmail.test(emailValue)) {
          console.log('invalidEmail: ' + emailValue);
          setInvalidEmail(true);
          return;
        }
      }
      try{
        let subject = "Suggestion: " + uid
        let body = "Suggestion: " + suggTextValue
        sendEmail(body, subject, uid)
        console.log('Success!', 'Thank you for your feedback!');
        setSentPop(true);
        //setSuggValue('');
        //setEmail('');
      } catch (err) {
        console.log(err);
        console.log('Oops!', 'Something went wrong..');
        setEmailFailure(true);
      }
    }
    else {
      setNoTextPop(true);
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
          style={styles.headingText}
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
          style={styles.headingText}
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
            autoComplete='on'
            autoCorrect='on'
            autoCapitalize='on'
            style={styles.suggEmailInput}
            onChange={(event)=>{setEmail(event.target.value)}}
            value = {emailValue}
            placeholder='Email...'
            />
          </View>
          <View
          style={styles.buttonContainer}
          >
            <TouchableOpacity
            style={styles.submitButton}
            >
              <Text
              style={styles.buttonText}
              onPress={()=>{subButtonPress()}}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Popup 
      open={noTextPop} 
      onClose={()=>setNoTextPop(false)}
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
            Suggestion must contain text.
          </Text>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity
          onPress={()=>{setNoTextPop(false)}}
          style={styles.popupButton}
          >
            <Text
            style={styles.buttonText}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Popup>

      <Popup 
      open={invalidEmail} 
      onClose={()=>setInvalidEmail(false)}
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
            {"Invalid Email Address.\nDouble check that you entered it correctly."}
          </Text>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity
          onPress={()=>{setInvalidEmail(false)}}
          style={styles.popupButton}
          >
            <Text
            style={styles.buttonText}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Popup>

      <Popup 
      open={emailFailure} 
      onClose={()=>setEmailFailure(false)}
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
            {"Suggestion failed to send.\n"
            +"Check internet connection.\n"
            +"Otherwise, it may be a server issue.\n\n"
            +"You can reach us at:\n"
            +"   FeastFinderDev@gmail.com\n\n"
            +"We appologize for the inconvenience"}
          </Text>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity
          onPress={()=>{setEmailFailure(false)}}
          style={styles.popupButton}
          >
            <Text
            style={styles.buttonText}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Popup>

      <Popup 
      open={sentPop} 
      onClose={()=>{setSentPop(false); navigate('/Home');}}
      contentStyle={styles.popup}
      >
        <View>
          <Text
          style={styles.successText}
          >
            Success: 
          </Text>
        </View>
        <View>
          <Text
          style={styles.popupText}
          >
            {"Email Sent!\nThank You for the suggestion!"}
          </Text>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity
          onPress={()=>{setSentPop(false); navigate('/Home');}}
          style={styles.popupButton}
          >
            <Text
            style={styles.buttonText}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Popup>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 0,
  },
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
  },
  buttonContainer: {
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#dd3333',
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  popup: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    //backgroundColor: 'red'
  },
  popupText: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
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
  errorText: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff3333'
  },
  successText: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33ff33'
  },
})