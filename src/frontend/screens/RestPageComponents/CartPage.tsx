import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx'; // Corrected path
import CoreBanner from '../CoreComponents/CoreBanner.tsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../../types/Cart'; // Adjusted path
import { useAuth } from '../UserComponents/Authorizer.tsx'; // Authentication hook
import CorePopup from '../CoreComponents/CorePopup.tsx'; // Popup component for login
import { coreForm, ffColors } from '../CoreComponents/CoreStyles.tsx'; // Import colors for consistent styling
import { API_BASE_URL } from '../../../config.js';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart(); // Destructure clearCart from useCart
  const navigate = useNavigate();
  const { user } = useAuth(); // Authentication context

  const [errPop, setErrPop] = useState(false);
  const [errText, setErrText] = useState('Error Undefined');
  const [loginPop, setLoginPop] = useState(false);
  const [buttonService, setButtonService] = useState<string>('Error Undefined'); // Ensure it's string type
  const [holdCartData, setHoldCartData] = useState<any | null>(null); // Store cart data for later processing
  const [userValue, setUserValue] = useState(''); // Store username input
  const [passValue, setPassValue] = useState(''); // Store password input

  // Redirect to home if cart is empty
  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/home');
    }
  }, [cart, navigate]);

  // Function to calculate total for a specific service
  const calculateServiceTotal = (service: string) => {
    return cart?.items.reduce((total: number, item: CartItem) => {
      const price = item.prices[service.toLowerCase()];
      return total + price * item.quantity;
    }, 0);
  };

  // Function to calculate total after discount
  const calculateAfterDiscountTotal = (service: string) => {
    if (service.toLowerCase() !== cart?.service.toLowerCase()) {
      return calculateServiceTotal(service);
    }
    return cart?.items.reduce((total: number, item: CartItem) => {
      const discount = cart.discount ?? 0;
      const price = item.prices[service.toLowerCase()];
      return total + (price * item.quantity * (100 - discount)) / 100;
    }, 0);
  };

  // Sort services by price
  const sortedServices = ['DoorDash', 'UberEats', 'Grubhub']
    .map((service) => ({
      name: service,
      total: calculateAfterDiscountTotal(service),
    }))
    .sort((a, b) => a.total - b.total);

  const resetUserPass = () => {
    setUserValue('');
    setPassValue('');
  };

  const checkLogin = async (service: string) => {
    // Login check logic remains the same
  };

  const popSubmitHandler = async () => {
    // Login submission logic remains the same
  };

  const proceedToCheckout = async (serviceName: string, cartData: any) => {
    // Proceed to checkout logic remains the same
  };

  const handleCheckout = async (serviceName: string) => {
    const isLoggedIn = await checkLogin(serviceName);
    if (isLoggedIn) {
      window.open(getServiceURL(serviceName), '_blank');
      await proceedToCheckout(serviceName, cart);
    }
  };

  const getServiceURL = (serviceName: string) => {
    switch (serviceName) {
      case 'ubereats':
        return 'https://www.ubereats.com';
      case 'doordash':
        return 'https://www.doordash.com';
      case 'grubhub':
        return 'https://www.grubhub.com';
      default:
        return '#';
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  return (
    <div style={{ backgroundColor: ffColors.ffBackground, height: '100vh' }}>
      <CoreBanner />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: ffColors.ffText }}>
          Your Cart
        </h1>

        {sortedServices.map((service) => {
          const serviceAvailable = cart.restaurant[`${service.name.toLowerCase()}Available`];
          return (
            <div key={service.name} className="border p-4 mb-4" style={coreForm.card}>
              <h2 className="text-xl font-semibold mb-2" style={coreForm.header}>
                {service.name}
              </h2>
              {serviceAvailable ? (
                <div style={coreForm.body}>
                  <ul>
                    {cart.items.map((item: CartItem, index: number) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          <p style={{ color: ffColors.ffBody }}>
                            {item.item} x {item.quantity}
                          </p>
                        </span>
                        <span>
                          <p style={{ color: ffColors.ffBody }}>
                            ${(item.prices[service.name.toLowerCase()] * item.quantity).toFixed(2)}
                          </p>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-bold mt-2">
                    <p style={{ color: ffColors.ffHeading }}>Total:</p>
                    <p style={{ color: ffColors.ffHeading }}>${service.total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleCheckout(service.name.toLowerCase())}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    style={{ backgroundColor: ffColors.ffGreenL }}
                  >
                    Checkout with {service.name}
                  </button>
                </div>
              ) : (
                <p style={{ color: ffColors.ffBody }}>Not Available</p>
              )}
            </div>
          );
        })}
      </div>

      <CorePopup
        pop={errPop}
        popTitle={'Error:'}
        popText={errText}
        closeFunc={() => setErrPop(false)}
        titleColor={ffColors.ffRedL}
        buttons={[
          {
            bText: 'Close',
            bColor: ffColors.ffRedL,
            bFunc: () => setErrPop(false),
          },
        ]}
      />

      <CorePopup
        pop={loginPop}
        popTitle={`Not logged into ${buttonService}:`}
        popText={''}
        closeFunc={() => setLoginPop(false)}
        titleColor={ffColors.ffRedL}
        buttons={[
          {
            bText: 'Submit',
            bColor: ffColors.ffGreenL,
            bFunc: popSubmitHandler,
          },
          {
            bText: 'Close',
            bColor: ffColors.ffRedL,
            bFunc: () => {
              setLoginPop(false);
              resetUserPass();
            },
          },
        ]}
      >
        <div style={styles.loginContainer}>
          <div style={styles.popupText}>Login:</div>
          <input
            type="text"
            style={styles.popInput}
            value={userValue}
            onChange={(event) => setUserValue(event.target.value)}
            placeholder="Username..."
          />
          <input
            type="password"
            style={styles.popInput}
            value={passValue}
            onChange={(event) => setPassValue(event.target.value)}
            placeholder="Password..."
          />
        </div>
      </CorePopup>
    </div>
  );
};

const styles = {
  loginContainer: {
    marginTop: 0,
    margin: 20,
  },
  popupText: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  popInput: {
    height: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },
};

export default CartPage;
