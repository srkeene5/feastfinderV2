import express from 'express';
const router = express.Router();

// Simple rule-based chatbot responses
const responses = {
  'help with an order': {
    text: 'Which service are you using? DoorDash or Uber Eats?',
    nextStep: 'order_service'
  },
  'help with my account': {
    text: 'Do you need help with your login/password or with something else?',
    nextStep: 'account_issue'
  }
};

// Handle user selections for "help with an order"
function handleOrderHelp(service) {
  if (service.toLowerCase() === 'doordash') {
    return 'You can get help with your DoorDash order here: https://help.doordash.com/consumers/s/consumer-support?language=en_US';
  } else if (service.toLowerCase() === 'uber eats' || service.toLowerCase() === 'ubereats') {
    return 'You can get help with your Uber Eats order here: https://help.uber.com/en/ubereats/restaurants';
  } else {
    return 'Sorry, I didn’t recognize that service. Can you please specify either DoorDash or Uber Eats?';
  }
}

// Handle user selections for "help with my account"
function handleAccountHelp(issue) {
  if (issue.toLowerCase().includes('login') || issue.toLowerCase().includes('password')) {
    return 'You can reset your login or password on the account recovery page.';
  } else {
    return 'Can you tell me more about the issue you are having with your account?';
  }
}

// Chatbot route to handle user queries
router.post('/chat', (req, res) => {
  const userQuery = req.body.query.toLowerCase();
  
  // If the user is responding to a previous question
  const currentStep = req.body.currentStep || null;

  if (currentStep === 'order_service') {
    const reply = handleOrderHelp(userQuery);
    return res.json({ response: reply });
  }

  if (currentStep === 'account_issue') {
    const reply = handleAccountHelp(userQuery);
    return res.json({ response: reply });
  }

  // Otherwise, respond based on the predefined rules
  const replyData = responses[userQuery];
  if (replyData) {
    res.json({ response: replyData.text, nextStep: replyData.nextStep });
  } else {
    res.json({ response: 'Sorry, I didn’t understand that. Can you please try again?' });
  }
});

module.exports = router;
