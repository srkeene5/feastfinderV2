import React from 'react';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import coreStyles from '../CoreComponents/CoreStyles.tsx'; // Import the styles

export default function FAQ() {
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
    <div style={coreStyles.container}>
      <CoreBanner />

      <div style={coreStyles.innerContainer}>
        <div style={coreStyles.headerContainer}>
          <h2 style={coreStyles.title}>FeastFinder</h2>
          <h2 style={coreStyles.subtitle}>Frequently Asked Questions</h2>
        </div>

        <div style={coreStyles.content}>
          <div style={coreStyles.card}>
            {faqList.map((faq, index) => (
              <div key={index} style={coreStyles.faqItem}>
                <h3 style={coreStyles.question}>{faq.question}</h3>
                <p style={coreStyles.answer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
