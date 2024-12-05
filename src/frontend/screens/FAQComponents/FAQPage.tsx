import React from 'react';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import CoreStyles from '../CoreComponents/CoreStyles.tsx';

export default function FAQ() {
  const { coreForm } = CoreStyles();
  const faqList = [
    {
      question: 'What is FeastFinder?',
      answer: 'FeastFinder is a platform designed to help you discover the best local dining experiences based on your preferences.',
    },
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Sign Up" link on the login page and filling out your personal details.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click "Forgot your password?" on the login page, and we’ll send you instructions via email.',
    },
    {
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address by navigating to the account settings page and following the instructions.',
    },
    {
      question: 'Is FeastFinder free to use?',
      answer: 'Yes, the basic version of FeastFinder is completely free, but premium features are available for a fee.',
    },
  ];

  return (
    <div style={coreForm.container}>
      <CoreBanner />

      <div style={coreForm.innerContainer}>
        <div style={coreForm.headerContainer}>
          <h2 style={coreForm.title}>FeastFinder</h2>
          <h2 style={coreForm.subtitle}>Frequently Asked Questions</h2>
        </div>

        <div style={coreForm.content}>
          <div style={coreForm.card}>
            {faqList.map((faq, index) => (
              <div key={index} style={coreForm.formItem}>
                <h3 style={coreForm.subheader}>{faq.question}</h3>
                <div style={coreForm.body}>
                  <p style={coreForm.text}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
