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
            //sendEmail(body, subject)
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
          style={coreStyles.headingText}
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
          style={coreStyles.headingText}
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
      popText={"Email Sent!\nThank You for the Report!"}
      pop={sentPop}
      closeFunc={()=>{resetAll(); navigate('/Home');}}
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
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  reportBug: {
    alignItems: 'center'
  },
  repTextBox:{
    //height: 'auto',
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
    marginTop:10,
  },
  buttonContainer: {
    alignItems: 'center'
  },
})