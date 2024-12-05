import { Text, View } from 'react-native'
import React from 'react'
import 'reactjs-popup/dist/index.css'
import tw from 'twrnc';

import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { sendEmail } from './Email.tsx';
import { useNavigate } from 'react-router-dom';
import CorePopup from '../../CoreComponents/CorePopup.tsx';
import { coreForm, ffColors } from '../../CoreComponents/CoreStyles.tsx';
import CoreButton from '../../CoreComponents/CoreButton.tsx';
import { useAuth } from '../../UserComponents/Authorizer.tsx';

export default function FeedbackPage() {
  const navigate = useNavigate();
  const {user} = useAuth();

  const [feedbackText, setFeedbackText] = React.useState('')
  const [emailValue, setEmail] = React.useState('')
  const [rating, setRating] = React.useState('select')
  const [feedbackType, setFeedbackType] = React.useState('select')
  const [errPop, setErrPop] = React.useState(false)
  const [errText, setErrText] = React.useState('Error Undefined')
  const [sentPop, setSentPop] = React.useState(false)

  const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|gov|edu)$");

  const resetAll = () => {
    setFeedbackText('');
    setEmail('');
    setRating('select');
    setFeedbackType('select');
    setErrPop(false);
    setErrText('Error Undefined');
    setSentPop(false);
  }

  const subButtonPress = async () => {
    if (feedbackText !== '') {
      var feedbackEmail = feedbackText;
      if (rating !== 'select') {
        if (feedbackType !== 'select') {
          if (emailValue !== '') {
            if (!validEmail.test(emailValue)) {
              setErrText("Invalid Email Address");
              setErrPop(true);
              return;
            } else {
              feedbackEmail += "\n\nUser Email: " + emailValue
            }
          }
          try{
            let subject = `FeastFinder Feedback - ${rating} - ${feedbackType} from User: ${user.email}`
            let body = "Feedback: " + feedbackEmail;
            console.log(subject + "\n" + body);
            //sendEmail(body, subject)
            setSentPop(true);
          } catch (err) {
            console.log(err);
            setErrText("Failed to send feedback. Please try again later or email us at FeastFinderDev@gmail.com");
            setErrPop(true);
          }
        }
        else {
          setErrText("Please select feedback type")
          setErrPop(true);
        }
      }
      else {
        setErrText("Please select a rating");
        setErrPop(true);
      }
    }
    else {
      setErrText('Please provide feedback text');
      setErrPop(true);
    }
  }

  return (
    <div style={coreForm.container}>
      <CoreBanner />
      <div style={tw.style(coreForm.innerContainer)}>
        <div style={coreForm.headerContainer}>
          <h2 style={coreForm.title}>FeastFinder</h2>
          <h2 style={coreForm.subtitle}>Service Feedback</h2>
        </div>
        <View style={tw.style(coreForm.content)}>
          <div style={coreForm.card}>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.header)}>Feedback:</Text>
              <textarea
                style={tw.style(coreForm.textInputBox)}
                onChange={(event)=>{setFeedbackText(event.target.value)}}
                value={feedbackText}
                placeholder='Share your experience with FeastFinder...'
                rows={8}
              />
            </View>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.subheader)}>Rating:</Text>
              <select
                value={rating}
                onChange={(event)=>{setRating(event.target.value)}}
                style={coreForm.dropdown}
              >
                <option value="select">Select Rating...</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </View>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.subheader)}>Feedback Type:</Text>
              <select
                value={feedbackType}
                onChange={(event)=>{setFeedbackType(event.target.value)}}
                style={coreForm.dropdown}
              >
                <option value="select">Select Type...</option>
                <option value="App Experience">App Experience</option>
                <option value="Delivery Service">Delivery Service</option>
                <option value="Restaurant Selection">Restaurant Selection</option>
                <option value="Pricing">Pricing</option>
                <option value="Other">Other</option>
              </select>
            </View>
            <View style={tw.style(coreForm.formItem)}>
              <Text style={tw.style(coreForm.header)}>Email (Optional):</Text>
              <Text style={tw.style(coreForm.text)}>
                For follow-up questions about your feedback
              </Text>
              <input
                style={coreForm.textInputSingle}
                onChange={(event)=>{setEmail(event.target.value)}}
                value={emailValue}
                placeholder='Email...'
              />
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
        popTitle={"Error"}
        popText={errText}
        closeFunc={()=>{setErrPop(false)}}
        pop={errPop}
        titleColor={ffColors.ffRedL}
        buttons={[
          {
            bText: 'Close',
            bColor: ffColors.ffRedL,
            bFunc: ()=>{setErrPop(false)}
          }
        ]}
      />

      <CorePopup 
        popTitle={"Success"}
        popText={"Thank you for your feedback!"}
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