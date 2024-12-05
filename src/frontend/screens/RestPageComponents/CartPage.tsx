import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { useCart } from './CartContext.tsx'; // Corrected path
import CoreBanner from '../CoreComponents/CoreBanner.tsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { CartEntry, CartItem, Option, OptionIndex } from '../../../types/Cart'; // Adjusted path
import { useAuth } from '../UserComponents/Authorizer.tsx'; // Authentication hook
import CorePopup from '../CoreComponents/CorePopup.tsx'; // Popup component for login
import { coreForm, ffColors } from '../CoreComponents/CoreStyles.tsx'; // Import colors for consistent styling
import { Button, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import OptionsPopup from './OptionsPopup.tsx';
import { API_BASE_URL } from '../../../config.js';
import CoreButton from "../CoreComponents/CoreButton.tsx";

const CartPage: React.FC = () => {
  const { cart, updateCart, clearCart } = useCart(); // Destructure clearCart from useCart
  const navigate = useNavigate();
  const { user } = useAuth(); // Authentication context

  //const [showSuccessModal, setShowSuccessModal] = useState(false);
  //const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const [cartPop, setCartPop] = useState<boolean>(false);
  const [popIndex, setPopIndex] =  useState<number>(-1);
  const [checkIndex, setCheckIndex] = useState<number>(-1);
  const [optionIndex, setOptionIndex] = useState<OptionIndex>({required: [], optional: []})
  const [priceChange, setPriceChange] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [popPrice, setPopPrice] = useState<number>(-1);

  const [errPop, setErrPop] = useState(false);
  const [errText, setErrText] = useState('Error Undefined');
  const [loginPop, setLoginPop] = useState(false);
  const [buttonService, setButtonService] = useState<string>('Error Undefined'); // Ensure it's string type
  const [holdCartData, setHoldCartData] = useState<any | null>(null); // Store cart data for later processing
  const [userValue, setUserValue] = useState(''); // Store username input
  const [passValue, setPassValue] = useState(''); // Store password input
  const [serviceTotal, setServiceTotal] = useState<{[key: string]: number|undefined}>({});
  const [discountTotal, setDiscountTotal] = useState<{[key: string]: number|undefined}>({});

  useEffect(() => {
    calcTotals();
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/home');
    }
  }, [cart, navigate]);

  const calculateServiceTotal = (service: string) => {
    return cart?.items.reduce((total: number, item: CartItem) => {
      console.log(service, cart.service)
      //const discount = cart.discount ?? 0;
      const price = item.prices[service.toLowerCase()] + item.priceChange;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateAfterDiscountTotal = (service: string) => {
    if (service.toLowerCase() !== cart?.service.toLowerCase()) return calculateServiceTotal(service);
    return cart?.items.reduce((total: number, item: CartItem) => {
      const discount = cart.discount ?? 0;
      const price = item.prices[service.toLowerCase()] + item.priceChange;
      return total + (price * item.quantity * (100 - discount) / 100);
    }, 0);
  };

  const calcTotals = () => {
    const newServiceTotal: { [key: string]: number | undefined } = {};
    const newDiscountTotal: { [key: string]: number | undefined } = {};
  
    ['doordash', 'ubereats', 'grubhub'].forEach((service) => {
      newServiceTotal[service] = calculateServiceTotal(service);
      newDiscountTotal[service] = calculateAfterDiscountTotal(service);
    
      console.log("serviceTotal: " + newServiceTotal[service])
      console.log("discountTotal: " + newDiscountTotal[service])
    });
  
    // Update state once with the full result
    setServiceTotal(newServiceTotal);
    setDiscountTotal(newDiscountTotal);
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
            setErrText("Internal Service Error\nDelivery Service not recognized");
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
      var fetchAddr = `${API_BASE_URL}/api/auth/app-login`;
      const response = await fetch(fetchAddr, {
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

      setLoginPop(false);
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

  const services = ['DoorDash', 'Uber Eats', 'Grubhub'];
  const sortedServices = services
    .map((service) => ({
      name: service,
      available: cart?.restaurant[`${(service.toLowerCase()).replace(" ", "")}Available`],
      total: calculateAfterDiscountTotal(service.replace(" ", "")),
    }))
    .sort((a, b) => {
      if (a.available && !b.available) return -1;
      if (!a.available && b.available) return 1;
      return (a.total || 0) - (b.total || 0);
    });

  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  const handleRemove = (index: number) => {
    const newItems = [...cart.items];
    newItems.splice(index,1);
    const newCart: CartEntry = {
      restaurant: cart.restaurant,
      items: newItems,
      service: cart.service,
      total: cart.total,
    }
    updateCart(newCart);
  }

  const handleEdit = (index: number, price: number) => {
    setCartPop(true);
    setCheckIndex(index);
    var actualIndex
    cart.restaurant.menu.forEach((item: string, i: number) => {
      if (item === cart.items[index].item) {
        actualIndex = i;
      }
    });
    setQuantity(cart.items[index].quantity)
    setPopIndex(actualIndex);
    setOptionIndex(cart.items[index].optionIndex);
    setPopPrice(price);
  }

  const handleClosePop = () => {
    setCartPop(false); 
    setPopIndex(-1);
    setPopPrice(-1);
    setOptionIndex({required: [], optional: []});
  }

  const handleEditSubmit = (index: number) => {
    const newItems = [...cart.items];

    var options: Option[] = []
    optionIndex.required.forEach((value: number, i: number) => {
      if (value !== -1) {
        const option = cart.restaurant.menuOptions[index][0].options[i].optionList[value]
        options.push({optionName: option.optionName, optionPrice: option.optionPrice});
      }
    });
    optionIndex.optional.forEach((value: number, i: number) => {
      if (value !== -1) {
        const option = cart.restaurant.menuOptions[index][1].options[i].optionList[value]
        options.push({optionName: option.optionName, optionPrice: option.optionPrice});
      }
    });
    newItems[checkIndex].quantity = quantity
    newItems[checkIndex].options = options
    newItems[checkIndex].optionIndex = optionIndex
    newItems[checkIndex].priceChange = priceChange
    const newCart: CartEntry = {
      restaurant: cart.restaurant,
      items: newItems,
      service: cart.service,
      total: cart.total,
    }
    updateCart(newCart);
    calcTotals();
    handleClosePop();
  }

  return (
    <div style={{ backgroundColor: ffColors.ffBackground, minHeight: '100vh', height: 'auto' }}>
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
        <div className="flex flex-col items-center">
          {sortedServices.map(({ name: service, available, total }) => (
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
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '100%',
                minWidth: '350px',
                height: 'auto',
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <img
                  src={`/images/services/${service.toLowerCase()}.png`}
                  alt={service}
                  style={{
                    width: '120px',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div className="flex items-center mb-4 pl-4">
                <h2 className="text-xl font-semibold" style={{ color: ffColors.ffHeading }}>
                  {service}
                </h2>
              </div>
              <div className="flex flex-col items-center">
                {available ? (
                  <div className="pl-8">
                    <ul className="mb-4">
                      {cart.items.map((item: CartItem, index: number) => (
                        <li key={index} className="flex justify-between mb-2">
                          <span>
                          <p
                            style={{color: ffColors.ffText}}
                          >
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <button onClick={(e)=>{handleEdit(index, item.prices[service.toLowerCase().replace(" ","")])}}>Edit</button>
                                  <br/>
                                  <button onClick={(e) => {handleRemove(index)}}>Remove</button>
                                </React.Fragment>
                              }
                            >
                              <Button
                                style={{textTransform: 'none', color: ffColors.ffText, font: 'inherit', fontSize: 16}}
                              >
                                {item.item} x {item.quantity}
                              </Button>
                            </HtmlTooltip>
                          </p>
                          <div
                            style={{paddingLeft: 16}}
                          >
                            {item.options.map((option: Option, index: number) => (
                              <div
                                key={index}
                                style={{color: ffColors.ffBody, fontSize: 12}}
                              >
                                {option.optionName}
                              </div>
                            ))}
                            {item.options.length > 0 ? 
                            <div
                              style={{color: ffColors.ffText, fontSize: 14}}
                            >
                              Subtotal:
                            </div>
                            :<></>}
                          </div>
                        </span>
                        <span
                          style={{justifyItems: 'right', marginBottom: 8, marginTop: 6}}
                        >
                          <div
                            style={item.options.length > 0 ? {color: ffColors.ffBody, marginBottom: 6} : {color: ffColors.ffText}}
                          >
                            ${(item.prices[service.toLowerCase().replace(" ","")] * item.quantity).toFixed(2)}
                          </div>
                          <div
                            style={{justifyItems: 'right'}}
                          >
                            {item.options.map((option: Option, index: number) => (
                              option.optionPrice !==0 ? <div
                                key={index}
                                style={{color: ffColors.ffBody, fontSize: 12}}
                              >
                                +${(option.optionPrice * item.quantity).toFixed(2)}
                              </div> 
                              :
                              <div
                                key={index}
                                style={{color: ffColors.ffBody, fontSize: 12}}
                              >
                                Free
                              </div>
                            ))}
                            {item.options.length > 0 ? 
                            <div
                              style={{color: ffColors.ffText}}
                            >
                              ${((item.prices[service.toLowerCase().replace(" ","")] + item.options.reduce((sum, option) => sum + option.optionPrice, 0)) * item.quantity).toFixed(2)}
                            </div>
                            :<></>}
                          </div>
                        </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between font-bold mt-4">
                      <p style={{ color: ffColors.ffHeading }}>Total:</p>
                      <div className="flex items-center">
                        {serviceTotal[service.toLowerCase().replace(" ","")]?.toFixed(2) !== discountTotal[service.toLowerCase().replace(" ","")]?.toFixed(2) && (
                          <p 
                            className="text-gray-500 line-through mr-2"
                          >
                            ${serviceTotal[service.toLowerCase().replace(" ","")]?.toFixed(2)}
                          </p>
                        )}
                        <p style={{ color: ffColors.ffHeading }}>
                          ${discountTotal[service.toLowerCase().replace(" ","")]?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCheckout(service.toLowerCase().replace(" ", ""))}
                      className="mt-4 px-6 py-2 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                      style={{
                        backgroundColor: ffColors.ffGreenL,
                        minWidth: '200px',
                        textAlign: 'center',
                      }}
                    >
                      Checkout with {service}
                    </button>
                  </div>
                ) : (
                  <p className="pl-8" style={{ color: ffColors.ffBody }}>Not Available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      <OptionsPopup
      cartPop={cartPop}
      restaurant={cart.restaurant}
      popIndex={popIndex}
      handleClosePop={handleClosePop}
      handleDishConfirm={handleEditSubmit}
      optionIndex={optionIndex}
      setOptionIndex={setOptionIndex}
      add={true}
      priceChange={priceChange}
      setPriceChange={setPriceChange}
      quantity={quantity}
      setQuantity={setQuantity}
      itemPrice={popPrice}
      />

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

const moreStyles = StyleSheet.create({
  buttonAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default CartPage;
