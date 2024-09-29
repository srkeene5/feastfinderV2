import React from 'react';
import Banner from './FAQBanner.tsx';  // Import the Banner component

function FAQ() {
  const faqList = [
    {
      question: "What is FeastFinder?",
      answer: "FeastFinder is a platform designed to help you discover the best local dining experiences based on your preferences."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' link on the login page and filling out your personal details."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click 'Forgot your password?' on the login page, and we’ll send you instructions via email."
    },
    {
      question: "Can I change my email address?",
      answer: "Yes, you can update your email address by navigating to the account settings page and following the instructions."
    },
    {
      question: "Is FeastFinder free to use?",
      answer: "Yes, the basic version of FeastFinder is completely free, but premium features are available for a fee."
    }
  ];

  return (
    <div className="min-h-full flex flex-col bg-white">
      {/* Include the Banner component */}
      <Banner />

      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-orange-400">
            FeastFinder
          </h2>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {faqList.map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
