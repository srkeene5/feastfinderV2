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

export default function RepBPage() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const { coreForm, ffColors } = CoreStyles();

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
            console.log(user.email);
            let subject = severity +" "+ bugType + " Bug Report from User: " + user.email
            let body = "Bug Report: " + reportTextEmail;
            console.log(subject + "\n" + body);
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
    <div
    style={coreForm.container}
    >
      <CoreBanner />
      <div style={tw.style(coreForm.innerContainer)}>
        <div style={coreForm.headerContainer}>
          <h2 style={coreForm.title}>FeastFinder</h2>
          <h2 style={coreForm.subtitle}>Report Bugs or Issues</h2>
        </div>
        <View style={tw.style(coreForm.content)}>
          <div style={coreForm.card}>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.header)}>
                Report:
              </Text>
              <View style={tw.style(coreForm.body)}>
                <Text style={tw.style(coreForm.text)}>
                  Reports will be sent to developer team for review. User details will be attached.
                </Text>
                <textarea
                autoComplete='on'
                autoCorrect='on'
                autoCapitalize='on'
                style={tw.style(coreForm.textInputBox)}
                onChange={(event)=>{setRepValue(event.target.value)}}
                value = {reportTextValue}
                placeholder='Report Bug...'
                rows={8}
                />
              </View>
            </View>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.subheader)}>
                Severity:
              </Text>
              <View style={tw.style(coreForm.body)}>
                <select
                value={severity}
                onChange={(event)=>{setSeverity(event.target.value)}}
                style={coreForm.dropdown}
                >
                  <option value="select">Select Severity...</option>
                  <option value="Minor">Minor</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Major">Major</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </View>
            </View>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.subheader)}>
                Type:
              </Text>
              <View style={tw.style(coreForm.body)}>
                <select
                value={bugType}
                onChange={(event)=>{setBugType(event.target.value)}}
                style={coreForm.dropdown}
                >
                  <option value="select">Select Type...</option>
                  <option value="Usability">Usability</option>
                  <option value="Vulnerability">Vulnerability</option>
                  <option value="Financial">Financial Security</option>
                  <option value="Menu Entry">Menu Entry</option>
                </select>
              </View>
            </View>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.header)}>
                Email (Optional):
              </Text>
              <View style={tw.style(coreForm.body)}>
                <Text style={tw.style(coreForm.text)}>
                  The dev team may wish to reach out to you for a follow-up for more information about the error.
                  Include your email so the dev team can effectively identify and resovle the issue.
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
    </div>
  )
}