Icefire13498
icefire13498
Online

Brian — 11/23/2024 8:04 PM
its literally due right after thxgiving break...
an assignment to do over break
Icefire13498 — 11/23/2024 9:15 PM
It's ok
It looks short
And we prolly have the answers... Right?
Brian — 11/23/2024 9:24 PM
😦
Brian — 11/25/2024 3:10 PM
What time r u gonna arrive? My class ended early
Icefire13498 — 11/25/2024 3:10 PM
Oh
I was gonna take the 3:30 bus
Brian — 11/25/2024 3:11 PM
That’s fine
They have the chicken thighs at Wiley again :0
Icefire13498 — 11/25/2024 3:12 PM
Oh shi
Time to go lol
Brian — 11/25/2024 3:12 PM
Ye
Maybe grab Carry out after bton tho
Icefire13498 — 11/25/2024 3:13 PM
Ok
Gonna come a bit later, Henry gonna take a shower and he'll come too
Icefire13498 — 11/25/2024 3:22 PM
Wait nvm
I'll come now
Brian — 11/25/2024 3:27 PM
Ok
Yea don’t wait cuz Ian can only stay till like 4:20
Icefire13498 — 11/25/2024 3:27 PM
On the bus now 👍
Brian — 11/25/2024 3:29 PM
Also apparently u can use only 5 swipes a day
Good thing I caught that before spending them all at otg lol
Icefire13498 — 11/25/2024 3:38 PM
Bro wtf
The bus just passed the stop I was gonna get off at
Brian — 11/25/2024 3:39 PM
Huh
U could get off at the one near Wiley
If u didn’t think of that already lol
Icefire13498 — 11/25/2024 3:46 PM
Nah I just got off at the next one
Brian — 11/25/2024 3:46 PM
At physics? That’s like the furthest possible stop lol
Well Ian and I are on a court
Icefire13498 — 11/25/2024 8:35 PM
@Brian
join
in las chicas
Brian — 11/27/2024 4:18 PM
Courts are packed…
Icefire13498 — 11/27/2024 4:22 PM
Oh no...
Brian — 11/27/2024 4:22 PM
Packed is an overstatement but all the courts are taken
Icefire13498 — 11/27/2024 4:22 PM
I see
What about the volleyball/basketball area
Are there nets there?
Brian — 11/27/2024 4:23 PM
I think they might be setting up rn
There’s 1 pickleball there
Icefire13498 — 11/27/2024 4:23 PM
I see
Brian — 11/29/2024 4:32 AM
bro... the second half of my 471 essay says 100% ai generated 😭
Icefire13498 — 11/29/2024 9:58 AM
I'm sure yexiang will not notice...
Icefire13498 — 11/30/2024 12:13 PM
Wanna work on 471 tmmr?
Brian — 11/30/2024 2:49 PM
Sure
Brian — Today at 9:43 PM
wait nvm i have an issue with restpage
i wont touch cartpage
Icefire13498 — Today at 9:47 PM
Could you push the changes from your cart page to master
I tried fixing a merge conflict and I think I broke the checkout button or something
So on master the checkout doesn't work
If you could just overwrite my changes to cartpage that would be good
Brian — Today at 9:55 PM
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { useCart } from './CartContext.tsx'; // Corrected path
import CoreBanner from '../CoreComponents/CoreBanner.tsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../../types/Cart'; // Adjusted path
import { useAuth } from '../UserComponents/Authorizer.tsx'; // Authentication hook
import CorePopup from '../CoreComponents/CorePopup.tsx'; // Popup component for login
import { coreForm, ffColors } from '../CoreComponents/CoreStyles.tsx'; // Import colors for consistent styling
import { API_BASE_URL } from '../../../config.js';
import CoreButton from "../CoreComponents/CoreButton.tsx";

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
      console.log(service, cart.service)
      const price = item.prices[service.toLowerCase()]; // We still lower-case the key lookup here since the backend data uses lowercase keys
      return total + (price * item.quantity);
    }, 0);
  };

  // Function to calculate total for a specific service
  // use cart.service to see if the discount should be applied to this service or not.
  const calculateAfterDiscountTotal = (service: string) => {
    if (service.toLowerCase() !== cart?.service.toLowerCase()) return calculateServiceTotal(service);
    return cart?.items.reduce((total: number, item: CartItem) => {
      const discount = cart.discount ?? 0;
      const price = item.prices[service.toLowerCase()]; // We still lower-case the key lookup here since the backend data uses lowercase keys
      return total + (price * item.quantity * (100 - discount) / 100);
    }, 0);
  };

  const resetUserPass = () => {
    setUserValue('');
    setPassValue('');
  };

  const checkLogin = async (service: string) => {
    let fetchAddr = `${API_BASE_URL}/api/auth/app-status`;
    
    try {
      const res = await fetch(fetchAddr, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        let isStored;
        console.log(service + "Hello")
        switch (service) {
          case "doordash":
              isStored = data.doordash_logged_in;
              break;
          case "grubhub":
              isStored = data.grubhub_logged_in;
              break;
          case "ubereats":
              isStored = data.uber_logged_in;
              break;
          default:
            console.error("switchFailure");
            setErrText(
              "Internal Service Error\nDelivery Service not recognized"
            );
            setErrPop(true);
            return false;
        }

        if (isStored) {
          return true;
        } else {
          setButtonService(service);
          setHoldCartData(cart);
          setLoginPop(true);
          return false;
        }
... (342 lines left)
Collapse
message.txt
16 KB
﻿
Brian
pmano2
 
 
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { useCart } from './CartContext.tsx'; // Corrected path
import CoreBanner from '../CoreComponents/CoreBanner.tsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../../types/Cart'; // Adjusted path
import { useAuth } from '../UserComponents/Authorizer.tsx'; // Authentication hook
import CorePopup from '../CoreComponents/CorePopup.tsx'; // Popup component for login
import { coreForm, ffColors } from '../CoreComponents/CoreStyles.tsx'; // Import colors for consistent styling
import { API_BASE_URL } from '../../../config.js';
import CoreButton from "../CoreComponents/CoreButton.tsx";

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
      console.log(service, cart.service)
      const price = item.prices[service.toLowerCase()]; // We still lower-case the key lookup here since the backend data uses lowercase keys
      return total + (price * item.quantity);
    }, 0);
  };

  // Function to calculate total for a specific service
  // use cart.service to see if the discount should be applied to this service or not.
  const calculateAfterDiscountTotal = (service: string) => {
    if (service.toLowerCase() !== cart?.service.toLowerCase()) return calculateServiceTotal(service);
    return cart?.items.reduce((total: number, item: CartItem) => {
      const discount = cart.discount ?? 0;
      const price = item.prices[service.toLowerCase()]; // We still lower-case the key lookup here since the backend data uses lowercase keys
      return total + (price * item.quantity * (100 - discount) / 100);
    }, 0);
  };

  const resetUserPass = () => {
    setUserValue('');
    setPassValue('');
  };

  const checkLogin = async (service: string) => {
    let fetchAddr = `${API_BASE_URL}/api/auth/app-status`;
    
    try {
      const res = await fetch(fetchAddr, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        let isStored;
        console.log(service + "Hello")
        switch (service) {
          case "doordash":
              isStored = data.doordash_logged_in;
              break;
          case "grubhub":
              isStored = data.grubhub_logged_in;
              break;
          case "ubereats":
              isStored = data.uber_logged_in;
              break;
          default:
            console.error("switchFailure");
            setErrText(
              "Internal Service Error\nDelivery Service not recognized"
            );
            setErrPop(true);
            return false;
        }

        if (isStored) {
          return true;
        } else {
          setButtonService(service);
          setHoldCartData(cart);
          setLoginPop(true);
          return false;
        }
      } else {
        const errorData = await res.json();
        setErrText(errorData.msg);
        setErrPop(true);
        return false;
      }
    } catch (error) {
      setErrText("Network error\nCheck internet connection");
      setErrPop(true);
      return false;
    }
  };

  const popSubmitHandler = async () => {
    if (!userValue) {
      setErrText("Username Blank");
      setErrPop(true);
      return;
    } else if (!passValue) {
      setErrText("Password Blank");
      setErrPop(true);
      return;
    }

    try {
      let response;
      var fetchAddr = `${API_BASE_URL}/api/auth/app-login`;
      response = await fetch(fetchAddr, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({
          email: userValue,
          password: passValue,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to register");
      }
      console.log(buttonService)
      switch (buttonService) {
        case "doordash":
            localStorage.setItem("doordash_token", data.token);
            break;
        case "grubhub":
            localStorage.setItem("grubhub_token", data.token);
            break;
        case "ubereats":
            localStorage.setItem("ubereats_token", data.token);
            break;
        default:
            console.error('switchFailure');
            return;
    }

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to login');
      }

      setLoginPop(false);
      setButtonService('Error Undefined');
      resetUserPass();

      await proceedToCheckout(buttonService, holdCartData);
    } catch (err) {
      setErrText(err.message || 'Login failed');
      setErrPop(true);
    }
  };  

  const proceedToCheckout = async (serviceName: string, cartData: any) => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('You are not logged in. Please log in to proceed.');
        return;
      }

      const user = JSON.parse(userData);
      const token = user.token;

      const response = await fetch(`${API_BASE_URL}/api/cartroute/cart/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...cartData, service: serviceName }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response from server:', data);
        alert(`Error: ${data.message}`);
        return;
      }

      window.open(getServiceURL(serviceName), '_blank');
      clearCart();
      navigate('/home');
    } catch (error) {
      alert('An unexpected error occurred while saving the cart.');
    }
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
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <View style={moreStyles.buttonAndTextContainer}>
          <h1
            className="text-2xl font-bold mb-4 text-center"
            style={{ color: ffColors.ffText }}
          >
            Your Cart for {cart.restaurant.restaurantName}
          </h1>
          <CoreButton
            pressFunc={() => window.open(cart.restaurant.websiteURL, '_blank')}
            bText="Restaurant Website"
            buttonColor={ffColors.ffBlueD}
          />
        </View>
  
        <div className = "flex flex-col items-center">
          {['DoorDash', 'Uber Eats', 'Grubhub'].map((service) => {
            const serviceAvailable = cart.restaurant[`${service.toLowerCase()}Available`];
            const serviceTotal = calculateServiceTotal(service);
            const discountTotal = calculateAfterDiscountTotal(service);
            return (
              <div
                key={service}
                className="border rounded-lg shadow-lg mb-4 max-w-lg"
                style={{
                  backgroundColor: '#fff',
                  padding: '16px',
                  border: '1px solid #ddd',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'row', // Layout side by side
                  alignItems: 'flex-start', // Align items to the top of the card
                  width: '100%',  // Ensure full width within the parent container
                  minWidth: '350px',  // Limit max width
                  height: 'auto',  // Auto height based on content
                }}
              >
                {/* Image on the Left Side */}
                <div style={{ flexShrink: 0 }}>
                  <img
                    src={`/images/services/${service.toLowerCase()}.png`} // replace with actual logos
                    alt={service}
                    style={{
                      width: '120px', // Adjust width of the image
                      height: 'auto', // Let height scale automatically
                      objectFit: 'contain', // Ensures image is fully contained
                    }}
                  />
                </div>
  
                {/* Service Header with Icon */}
                <div className="flex items-center mb-4 pl-4">
                  <h2 className="text-xl font-semibold" style={{ color: ffColors.ffHeading }}>
                    {service}
                  </h2>
                </div>
  
                <div className="flex flex-col items-center">
                  {serviceAvailable ? (
                    <div className="pl-8">
                      {/* Cart Items List */}
                      <ul className="mb-4">
                        {cart.items.map((item: CartItem, index: number) => (
                          <li key={index} className="flex justify-between mb-2">
                            <span>
                              <p style={{ color: ffColors.ffBody }}>
                                {item.item} x {item.quantity}
                              </p>
                            </span>
                            <span>
                              <p style={{ color: ffColors.ffBody }}>
                                ${(item.prices[service.toLowerCase()] * item.quantity).toFixed(2)}
                              </p>
                            </span>
                          </li>
                        ))}
                      </ul>
  
                      {/* Price Details Section */}
                      <div className="flex justify-between font-bold mt-4">
                        <p style={{ color: ffColors.ffHeading }}>Total:</p>
                        <div className="flex items-center">
                          {serviceTotal !== discountTotal && (
                            <p className="text-gray-500 line-through mr-2" >
                              ${serviceTotal?.toFixed(2)}
                            </p>
                          )}
                          <p className ="font-bold text-lg" >${discountTotal?.toFixed(2)}</p>
                        </div>
                      </div>
  
                      {/* Checkout Button */}
                      <button
                        onClick={() => handleCheckout(service.toLowerCase())}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        style={{ backgroundColor: ffColors.ffGreenL }}
                      >
                        Checkout with {service}
                      </button>
                    </div>
                  ) : (
                    <p className="pl-8" style={{ color: ffColors.ffBody }}>Not Available</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
  
      <CorePopup
        pop={errPop}
        popTitle={"Error:"}
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
        popText={""}
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

// Adding styles for the CartPage login popup from SearchCards
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

const moreStyles = StyleSheet.create( {
  buttonAndTextContainer: {
    flexDirection: "row",
    alignItems: "center", // Aligns text and button vertically
    gap: 5, // Adds space between the text and button
    
  }
})

export default CartPage;
message.txt
16 KB