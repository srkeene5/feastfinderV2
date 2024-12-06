import React, { useEffect, useState } from 'react';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import { useNavigate } from 'react-router-dom';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { API_BASE_URL } from '../../../config.js';
import CoreStyles from '../CoreComponents/CoreStyles.tsx';

interface Deals {
  uberEats: number;
  doorDash: number;
  grubHub: number;
}

const DealsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deals, setDeals] = useState<Deals | null>(null);
  const { ffColors } = CoreStyles();
  const styles = CoreStyles().dealsPageStyles

  useEffect(() => {
    if (!user) {
      navigate('/account/login');
      return;
    }

    const fetchDeals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/deals/userDeals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token,
          },
        });
        
        const data = await response.json();
        if (response.ok) {
          setDeals(data.deals);
        } else {
          setError(data.message || 'Failed to fetch deals');
        }
      } catch (err) {
        setError('Error fetching deals');
        console.error('Error fetching deals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [user, navigate]);

  return (
    <div style={{ backgroundColor: ffColors.ffBackground, minHeight: '100vh' }}>
      <CoreBanner />
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, marginBottom: 20, color: ffColors.ffHeading }}>Your Delivery Deals</h1>
        {loading && <p style={{color: ffColors.ffHeading}}>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {deals && (
          <div style={styles.dealsCard}>
            <div style={styles.dealItem}>
              <h2 style={{ fontSize: 20, marginBottom: 5, color: ffColors.ffHeading }}>UberEats Deal</h2>
              <p style={{ fontSize: 18, color: ffColors.ffBody }}>{deals.uberEats}% off</p>
            </div>
            <div style={styles.dealItem}>
              <h2 style={{ fontSize: 20, marginBottom: 5, color: ffColors.ffHeading }}>DoorDash Deal</h2>
              <p style={{ fontSize: 18, color: ffColors.ffBody }}>{deals.doorDash}% off</p>
            </div>
            <div style={styles.dealItem}>
              <h2 style={{ fontSize: 20, marginBottom: 5, color: ffColors.ffHeading }}>GrubHub Deal</h2>
              <p style={{ fontSize: 18, color: ffColors.ffBody }}>{deals.grubHub}% off</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsPage;