import React, { useState } from 'react';
import { sendNotificationEmail } from '../SettingsPages/SupportPages/Email.tsx';
import CoreStyles from '../CoreComponents/CoreStyles.tsx';

const NotificationFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { ffColors, coreForm } = CoreStyles();

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('notificationEmail');
    const savedSubscription = localStorage.getItem('isSubscribed');
    
    if (savedEmail && savedSubscription === 'true') {
      setEmail(savedEmail);
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      sendNotificationEmail(email, true);
      setIsSubscribed(true);
      setMessage('Successfully subscribed!');
      localStorage.setItem('notificationEmail', email);
      localStorage.setItem('isSubscribed', 'true');
    } catch (error) {
      console.error('Subscribe error:', error);
      setMessage('Error subscribing to notifications.');
    }
    
    setLoading(false);
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    
    try {
      sendNotificationEmail(email, false);
      setIsSubscribed(false);
      setEmail('');
      setMessage('Successfully unsubscribed.');
      localStorage.removeItem('notificationEmail');
      localStorage.removeItem('isSubscribed');
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setMessage('Error unsubscribing.');
    }
    
    setLoading(false);
  };

  return (
    <div className="border-t p-4" style={{backgroundColor: ffColors.ffCard, borderColor: ffColors.ffEdge}}>
      <div className="container mx-auto flex items-center justify-between">
        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="flex items-center gap-4 w-full justify-center">
            <input
              type="email"
              value={email}
              style={coreForm.textInputSingle}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for updates"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              style={{backgroundColor: ffColors.ffBlueD, color: ffColors.ffActiveButtonText}}
            >
              {loading ? 'Processing...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-4 w-full justify-center">
            <span style={{color: ffColors.ffHeading}}>Subscribed as: {email}</span>
            <button
              onClick={handleUnsubscribe}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              style={{backgroundColor: ffColors.ffRedL, color: ffColors.ffActiveButtonText}}
            >
              {loading ? 'Processing...' : 'Unsubscribe'}
            </button>
          </div>
        )}
      </div>
      {message && (
        <div className={`text-center mt-2`}
          style={{ color: message.includes('Error') ? ffColors.ffRedL : ffColors.ffGreenL }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default NotificationFooter;