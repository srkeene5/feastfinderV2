import React, { useEffect, useState } from 'react';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import { useNavigate } from 'react-router-dom';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { API_BASE_URL } from '../../../config.js';

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
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <CoreBanner />
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>Your Delivery Deals</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {deals && (
          <div style={styles.dealsCard}>
            <div style={styles.dealItem}>
              <h2 style={{ fontSize: 20, marginBottom: 5 }}>UberEats Deal</h2>
              <p style={{ fontSize: 18, color: '#2ecc71' }}>{deals.uberEats}% off</p>
            </div>
            <div style={styles.dealItem}>
              <h2 style={{ fontSize: 20, marginBottom: 5 }}>DoorDash Deal</h2>
              <p style={{ fontSize: 18, color: '#2ecc71' }}>{deals.doorDash}% off</p>
            </div>
            <div style={styles.dealItem}>
              <h2 style={{ fontSize: 20, marginBottom: 5 }}>GrubHub Deal</h2>
              <p style={{ fontSize: 18, color: '#2ecc71' }}>{deals.grubHub}% off</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dealsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    maxWidth: 600,
    margin: '0 auto'
  },
  dealItem: {
    marginBottom: 20,
    padding: 15,
    borderBottom: '1px solid #eee'
  }
};

export default DealsPage;