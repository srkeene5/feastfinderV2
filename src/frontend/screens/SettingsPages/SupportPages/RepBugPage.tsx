import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { sendEmail } from './Email.tsx';

//navigation
import { useLocation, useNavigate } from 'react-router-dom';

export default function RepBPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {uid} = location.state;

  const [reportTextValue, setRepValue] = React.useState('')
  const [emailValue, setEmail] = React.useState('')
  const [severity, setSeverity] = React.useState('select')
  const [bugType, setBugType] = React.useState('select')
  const [noTextPop, setNoTextPop] = React.useState(false)
  const [sentPop, setSentPop] = React.useState(false)
  const [invalidEmail, setInvalidEmail] = React.useState(false)
  const [emailFailure, setEmailFailure] = React.useState(false)
  const [noSeverity, setNoSeverity] = React.useState(false)
  const [noType, setNoType] = React.useState(false)

  const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|gov|edu)$");

  const resetAll = () => {
    setRepValue('');
    setEmail('');
    setSeverity('select');
    setBugType('select');
    setNoTextPop(false);
    setSentPop(false);
    setInvalidEmail(false);
    setEmailFailure(false);
    setNoSeverity(false);
    setNoType(false);
  }

  const subButtonPress = async () => {
    if (reportTextValue !== '') {
      if (severity !== 'select') {
        if (bugType !== 'select') {
          if (emailValue !== '') {
            if (!validEmail.test(emailValue)) {
              console.log('invalidEmail: ' + emailValue);
              setInvalidEmail(true);
              return;
            }
          }
          try{
            let subject = severity + bugType + " Bug Report: " + uid
            let body = severity + bugType + " Bug Report: " + reportTextValue
            console.log(uid + "\n" + subject + "\n" + body);
            sendEmail(body, subject, uid);
            console.log('Success!', 'Thank you for your feedback!');
            setSentPop(true);
            resetAll();
          } catch (err) {
            console.log(err);
            console.log('Oops!', 'Something went wrong..');
            setEmailFailure(true);
          }
        }
        else {
          setNoType(true);
        }
      }
      else {
        setNoSeverity(true);
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
      style={styles.reportBug}
      >
        <View
        style={styles.reportForm}
        >
          <Text
          style={styles.headingText}
          >
            Report:
          </Text>
          <View
          style={styles.reportSection}
          >
            <Text
            style={styles.reportInfo}
            >
              Reports will be sent to developer team for review. User details will be attached.
            </Text>
            
            <textarea
            autoComplete='on'
            autoCorrect='on'
            autoCapitalize='on'
            style={styles.repTextBox}
            onChange={(event)=>{setRepValue(event.target.value)}}
            value = {reportTextValue}
            placeholder='Report Bug...'
            rows={8}
            />
            <Text
            style={styles.subheading}
            >
              Severity:
            </Text>
            <View>
              <select
              value={severity}
              onChange={(event)=>{setSeverity(event.target.value)}}
              style={styles.dropdownForm}
              >
                <option value="select">Select Severity...</option>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Major">Major</option>
                <option value="Urgent">Urgent</option>
              </select>
            </View>
            <Text
            style={styles.subheading}
            >
              Type:
            </Text>
            <View>
              <select
              value={bugType}
              onChange={(event)=>{setBugType(event.target.value)}}
              style={styles.dropdownForm}
              >
                <option value="select">Select Type...</option>
                <option value="Usability">Usability</option>
                <option value="Vulnerability">Vulnerability</option>
                <option value="Financial">Financial Security</option>
                <option value="Menu Entry">Menu Entry</option>
              </select>
            </View>
          </View>
          <Text
          style={styles.headingText}
          >
            Email (Optional):
          </Text>
          <View
          style={styles.reportSection}
          >
            <Text
            style={styles.reportInfo}
            >
              The dev team may wish to reach out to you for a follow-up for more information about the error.
              Include your email so the dev team can effectively identify and resovle the issue.
            </Text>
            <input
            autoComplete='on'
            autoCorrect='on'
            autoCapitalize='on'
            style={styles.repEmailInput}
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
            Bug report must contain text.
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
            {"Report failed to send.\n"
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
      open={noSeverity} 
      onClose={()=>setNoSeverity(false)}
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
            Select Report Severity.
          </Text>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity
          onPress={()=>{setNoSeverity(false)}}
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
      open={noType
      } 
      onClose={()=>setNoType(false)}
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
            Select Report Type.
          </Text>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity
          onPress={()=>{setNoType(false)}}
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
            {"Email Sent!\nThank You for the Report!"}
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
  subheading: {
    fontSize: 18,
    //fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  reportBug: {
    alignItems: 'center'
  },
  repTextBox:{
    height: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    resize: 'none',
  },
  repEmailInput:{
    height: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  reportForm: {
    //alignItems: 'center',
    margin: 30,
    flexGrow: 1,
    backgroundColor: '#dddddd',
    borderRadius: 30,
    padding: 20
  },
  dropdownForm: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  reportInfo: {
    marginBottom: 20,
  },
  reportSection: {
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