import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
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
  const [errPop, setErrPop] = React.useState(false)
  const [errText, setErrText] = React.useState('Error Undefined')
  const [sentPop, setSentPop] = React.useState(false)

  const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|gov|edu)$");

  const resetAll = () => {
    setRepValue('');
    setEmail('');
    setSeverity('select');
    setBugType('select');
    setErrPop(false);
    setErrText('Error Undefined');
    setSentPop(false);
  }

  const subButtonPress = async () => {
    if (reportTextValue !== '') {
      var reportTextEmail = reportTextValue;
      if (severity !== 'select') {
        if (bugType !== 'select') {
          if (emailValue !== '') {
            if (!validEmail.test(emailValue)) {
              console.log('invalidEmail: ' + emailValue);
              setErrText("Invalid Email Address.\nDouble check that you entered it correctly.");
              setErrPop(true);
              return;
            } else {
              reportTextEmail += "\n\nUser Response Email included: " + emailValue
            }
          }
          try{
            let subject = severity +" "+ bugType + " Bug Report from User:" + uid
            let body = severity +" "+ bugType + " Bug Report: " + reportTextEmail;
            console.log(uid + "\n" + subject + "\n" + body);
            sendEmail(body, subject)
            console.log('Success!', 'Thank you for your feedback!');
            setSentPop(true);
          } catch (err) {
            console.log(err);
            console.log('Oops!', 'Something went wrong..');
            setErrText(
              "Report failed to send.\n"
              +"Check internet connection.\n"
              +"Otherwise, it may be a server issue.\n\n"
              +"You can reach us at:\n"
              +"   FeastFinderDev@gmail.com\n\n"
              +"We appologize for the inconvenience"
            );
            setErrPop(true);
          }
        }
        else {
          setErrText("Select Report Type.")
          setErrPop(true);
        }
      }
      else {
        setErrText("Select Report Severity.");
        setErrPop(true);
      }
    }
    else {
      setErrText('Bug report must contain text.');
      setErrPop(true);

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
            style={styles.repEmailInput}
            onChange={(event)=>{setEmail(event.target.value)}}
            value = {emailValue}
            placeholder='Email...'
            />
          </View>
          <View
          style={styles.buttonContainer}
          >
            <Pressable
            style={styles.submitButton}
            onPress={()=>{subButtonPress()}}
            >
              <Text
              style={styles.buttonText}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

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
          <Pressable
          onPress={()=>{resetAll(); navigate('/Home');}}
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