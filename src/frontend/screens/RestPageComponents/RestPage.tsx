// src/frontend/screens/RestPageComponents/RestPage.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal.tsx';
import { CartItem, CartEntry, Option, OptionIndex } from '../../../types/Cart';
import { ffColors } from '../CoreComponents/CoreStyles.tsx';
import CoreButton from '../CoreComponents/CoreButton.tsx';
import OptionsPopup from './OptionsPopup.tsx';
import { API_BASE_URL } from '../../../config.js';
import { useAuth } from '../UserComponents/Authorizer.tsx';

interface MenuItemProps {
  item: string;
  price: number;
  image: string;
  dietaryViolations: string[]
  userPreferences: string[]
  setCartPop: () => void;
  deal: number | null;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, price, image, dietaryViolations, userPreferences, setCartPop, deal }) => {
  // useEffect(() => {
  //   console.log("Deal: ", deal);
  // }, [deal]);

  // let currPrice = Number(price);
  // let oldPrice = Number(price);

  // if (deal !== undefined && deal !== null && deal > 0) {
  //   currPrice = currPrice * (100 - deal) / 100;
  // }
  
  return (
    <li 
      className="flex items-center justify-between p-4 mb-4 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md"
      style={{backgroundColor: ffColors.ffCard, borderColor: ffColors.ffEdge, borderWidth: 1}}
    >
      <div>
        <img
          src={image}
          alt="Dish"
          style={{
            height: 100,
            width: 150,
            borderRadius: 10,
            objectFit: 'contain',
          }}
          className="w-20 h-20 object-cover rounded shadow-sm"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 
          className="text-lg font-semibold"
          style={{color: ffColors.ffText}}
        >
          {item}
        </h3>
        <div className="flex items-center space-x-1 mt-1">
          {/* {(deal !== null && Number(deal) > 0) && (
            <p 
              className="text-sm font-medium text-gray-500 line-through"
              style={{color: ffColors.ffBody}}
            >
              ${oldPrice.toFixed(2)}
            </p>
          )} */}
          <p 
            className="text-lg font-bold text-green-600"
            style={{color: ffColors.ffGreenL}}
          >
            ${price.toFixed(2)}
          </p>
        </div>
        
      </div>
      <div className="flex items-left ml-2 mr-5">
        <ul>
          {dietaryViolations.map((violation, index) => (
            <li 
              key={index} 
              className={`text-md font-bold ${userPreferences.includes(violation) ? 'text-red-500' : 'text-gray-400'}`}
            >
              {`Not ${violation}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        {/*<button
          onClick={onRemove}
          disabled={quantity <= 0}
          className="w-8 h-8 flex items-center justify-center text-white rounded-full disabled:opacity-50 hover:bg-red-600 transition duration-200 ease-in-out"
          style={{backgroundColor: ffColors.ffRedL}}
        >
          -
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={onAdd}
          className="w-8 h-8 flex items-center justify-center text-white rounded-full hover:bg-green-600 transition duration-200 ease-in-out"
          style={{backgroundColor: ffColors.ffGreenL}}
        >
          +
        </button>*/}
        <CoreButton
        pressFunc={setCartPop}
        bText={'Add To Cart'}
        buttonColor={ffColors.ffGreenL}
        />
      </div>
    </li>
  );
};

export default function RestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurant, service } = location.state || {};
  const { cart, updateCart, clearCart } = useCart();

  //const [quantities, setQuantities] = useState<number[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const totalItems = restaurant?.menu?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [deal, setDeal] = useState<number>(0);
  const [preferences, setPreferences] = useState<string[]>([]);

  const { user } = useAuth();


  const [cartPop, setCartPop] = useState<boolean>(false);
  const [popIndex, setPopIndex] =  useState<number>(-1);
  const [optionIndex, setOptionIndex] = useState<OptionIndex>({required: [], optional: []})
  const [priceChange, setPriceChange] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [popPrice, setPopPrice] = useState<number>(-1);

  const handleClosePop = () => {
    setCartPop(false); 
    setPopIndex(-1);
    setPopPrice(-1);
    setOptionIndex({required: [], optional: []});
  }

  const handleDishConfirm = (index: number) => {
    var options: Option[] = []
    optionIndex.required.forEach((value: number, i: number) => {
      if (value !== -1) {
        const option = restaurant.menuOptions[index][0].options[i].optionList[value]
        options.push({optionName: option.optionName, optionPrice: option.optionPrice});
      }
    });
    optionIndex.optional.forEach((value: number, i: number) => {
      if (value !== -1) {
        const option = restaurant.menuOptions[index][1].options[i].optionList[value]
        options.push({optionName: option.optionName, optionPrice: option.optionPrice});
      }
    });

    const addedAmount = prices[index] + priceChange;

    var newCartEntry: CartEntry;

    if (cart) {
      newCartEntry = cart
      newCartEntry.total = cartTotal + prices[index] + priceChange;
    } else {
      newCartEntry = {
        restaurant: restaurant,
        service: service,
        items: [],
        total: prices[index] + priceChange,
        discount: deal
      };
    }
    setCartTotal((prevTotal) => prevTotal + addedAmount);

    const newCartItem: CartItem = {
      item: restaurant.menu[index],
      quantity: quantity,
      options: options,
      optionIndex: optionIndex,
      priceChange: priceChange,
      prices: {
        doordash: restaurant.doordashMenuPrice[index],
        ubereats: restaurant.ubereatsMenuPrice[index],
        grubhub: restaurant.grubhubMenuPrice[index],
      },
    }

    var found = false
    newCartEntry.items.map((item) => {
      if (item === newCartItem) {
        item.quantity += newCartItem.quantity;
        found = true;
      }
    });

    if (!found) {
      newCartEntry.items.push(newCartItem);
    }

    console.log('newCartEntry.total: '+ newCartEntry.total)

    updateCart(newCartEntry);
    handleClosePop();
  }

  const calculateServiceTotal = (service: string) => {
    return cart?.items.reduce((total: number, item: CartItem) => {
      console.log(service, cart.service)
      //const discount = cart.discount ?? 0;
      const price = item.prices[service.toLowerCase()] + item.priceChange; // We still lower-case the key lookup here since the backend data uses lowercase keys
      return total + (price * item.quantity);
    }, 0);
  };

  // Prices setup based on service
  let prices: number[] = [];
  const getPreferences = async () => {
    try {
      const preferenceResponse = await fetch(`${API_BASE_URL}/api/preferences/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token, // Add auth token
      },
      });
      if (!preferenceResponse.ok) {
        console.error('Failed to fetch deals:', preferenceResponse.statusText);
        return;
      }
      const preferenceData = await preferenceResponse.json()
      console.log(preferenceData)
      setPreferences(preferenceData.dietaryPreferences || [])
    }
    catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  const getDeals = async () => {
    let app_token;
    switch (service) {
      case "DoorDash":
        app_token = localStorage.getItem('doordash_token');
        break;
      case "GrubHub":
        app_token = localStorage.getItem('grubhub_token');
        break;
      case "UberEats":
        app_token = localStorage.getItem('ubereats_token');
        break;
      default:
        console.error('Invalid service');
        return;
    }

    try {
      const fetchAddr = `${API_BASE_URL}/api/auth/app-deal`;
      const response = await fetch(fetchAddr, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + app_token,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch deals:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Deals fetched: ", data);
      setDeal(data.deal || 0);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  useEffect(() => {
    getDeals();
    getPreferences();
  }, []);

  useEffect(() => {
    if (restaurant && restaurant.menu) {
      if (cart && cart.restaurant.restaurantID === restaurant.restaurantID) {
        //setQuantities(cart.quantities);
        setCartTotal(calculateServiceTotal(service) || 0);
      } else if (cart && cart.restaurant.restaurantID !== restaurant.restaurantID) {
        setShowModal(true);
      } else {
        //setQuantities(Array(restaurant.menu.length).fill(0));
        setCartTotal(0);
      }
    }
  }, [cart, restaurant]);

  if (!restaurant || !restaurant.menu) {
    return <div>Error: Restaurant data is missing!</div>;
  }

  const normalizedService = service.trim().toLowerCase();

  switch (normalizedService) {
    case 'doordash':
      prices = restaurant.doordashMenuPrice;
      break;
    case 'ubereats':
      prices = restaurant.ubereatsMenuPrice;
      break;
    case 'grubhub':
      prices = restaurant.grubhubMenuPrice;
      break;
    default:
      console.error("Invalid service or service's prices not available:", service);
      prices = Array(restaurant.menu.length).fill(0);
      break;
  }

  // Check if prices array is valid
  if (!prices || prices.length === 0) {
    console.error('Prices array is empty or undefined for the selected service:', service);
    prices = Array(restaurant.menu.length).fill(0);
  }

  // Page logic
  const handlePageChange = (direction: string) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages - 1) return prevPage + 1;
      if (direction === 'prev' && prevPage > 0) return prevPage - 1;
      return prevPage;
    });
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedMenuItems = restaurant.menu.slice(startIndex, startIndex + itemsPerPage);

  // Cart logic
  /*const handleAdd = (index: number) => {
    if (typeof prices[index] !== 'number') {
      console.error(`Price at index ${index} is undefined or not a number`);
      return;
    }
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    const addedAmount = prices[index];
    setCartTotal((prevTotal) => {
      const newTotal = prevTotal + addedAmount;
      console.log(`Added ${addedAmount} to cartTotal. New total: ${newTotal}`);
      return newTotal;
    });

    // Update the cart context
    const selectedItems: CartItem[] = restaurant.menu.map((item, idx) => ({
      item,
      quantity: newQuantities[idx],
      prices: {
        doordash: restaurant.doordashMenuPrice[idx],
        ubereats: restaurant.ubereatsMenuPrice[idx],
        grubhub: restaurant.grubhubMenuPrice[idx],
      },
    })).filter(item => item.quantity > 0);

    const total = selectedItems.reduce(
      (acc, item) => acc + item.prices[normalizedService] * item.quantity,
      0
    );

    const newCartEntry: CartEntry = {
      restaurant: restaurant,
      service: service,
      items: selectedItems,
      total: total,
      //quantities: newQuantities,
      discount: deal
    };

    updateCart(newCartEntry);
  };

  const handleRemove = (index: number) => {
    if (quantities[index] > 0 && typeof prices[index] === 'number') {
      const newQuantities = [...quantities];
      newQuantities[index]--;
      setQuantities(newQuantities);
      const removedAmount = prices[index];
      setCartTotal((prevTotal) => {
        const newTotal = prevTotal - removedAmount;
        console.log(`Removed ${removedAmount} from cartTotal. New total: ${newTotal}`);
        return newTotal;
      });

      // Update the cart context
      const selectedItems: CartItem[] = restaurant.menu.map((item, idx) => ({
        item,
        quantity: newQuantities[idx],
        prices: {
          doordash: restaurant.doordashMenuPrice[idx],
          ubereats: restaurant.ubereatsMenuPrice[idx],
          grubhub: restaurant.grubhubMenuPrice[idx],
        },
      })).filter(item => item.quantity > 0);

      const total = selectedItems.reduce(
        (acc, item) => acc + item.prices[normalizedService] * item.quantity,
        0
      );

      const newCartEntry: CartEntry = {
        restaurant: restaurant,
        service: service,
        items: selectedItems,
        total: total,
        //quantities: newQuantities,
        discount: deal
      };

      updateCart(newCartEntry);
    } else {
      console.error(`Cannot remove item at index ${index}`);
    }
  };*/

  const handleViewCart = () => {
    /*const selectedItems: CartItem[] = restaurant.menu
      .map((item: string, index: number) => ({
        item,
        //quantity: quantities[index],
        prices: {
          doordash: restaurant.doordashMenuPrice[index],
          ubereats: restaurant.ubereatsMenuPrice[index],
          grubhub: restaurant.grubhubMenuPrice[index],
        },
      }))
      .filter((item) => item.quantity > 0);

    const total = selectedItems.reduce(
      (acc, item) => acc + item.prices[normalizedService] * item.quantity,
      0
    );

    const newCartEntry: CartEntry = {
      restaurant: restaurant,
      service: service,
      items: selectedItems,
      total: total,
      //quantities: quantities,
      discount: deal
    };*/

    //updateCart(newCartEntry);
    navigate('/cart');
  };

  const popUp = (actualIndex: number)=>{
    setCartPop(true);
    setPopIndex(actualIndex);
    const itemOptions = restaurant.menuOptions[actualIndex];
    setPopPrice(prices[actualIndex]);
    var reqLen = 0;
    var optLen = 0;
    if (itemOptions[0] && itemOptions[0].options) {
      reqLen = itemOptions[0].options.length;
    }
    if (itemOptions[0] && itemOptions[1].options) {
      optLen = itemOptions[1].options.length;
    }
    setOptionIndex({
      required: new Array(reqLen).fill(-1),
      optional: new Array(optLen).fill(-1)
    });
  }

  const handleSwitchRestaurant = () => {
    clearCart();
    navigate('/home');
  };

  const handleConfirm = () => {
    clearCart();
    //setQuantities(Array(restaurant.menu.length).fill(0));
    setCartTotal(0);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate('/home');
  };

  const displayTotal = isNaN(cartTotal) || cartTotal === undefined ? 0 : cartTotal;

  return (
    <div style={{backgroundColor:ffColors.ffBackground}}>
      <CoreBanner />
      <div
        style={styles.account}
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6 mx-auto"
      >
        <h1 
          className="text-3xl font-bold text-gray-800 text-center"
          style={{color: ffColors.ffText}}
        >
          {restaurant.restaurantName} Menu
        </h1>

        {deal > 0 && (
          <p 
            className="text-center text-sm font-semibold p-2 rounded text-ffGreenL"
            // style={{
            //   color: ffColors.ffGreenD,
            //   backgroundColor: ffColors.ffGreenL,
            //   border: `1px solid ${ffColors.ffGreenD}`
            // }}
          >
            {deal}% discount applied at checkout!
          </p>
        )}
        <div 
          className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 overflow-y-auto"
          style={{backgroundColor: ffColors.ffCard}}
        >
          <ul 
            className="divide-y divide-gray-200"
            style={{backgroundColor: ffColors.ffCard, color: ffColors.ffText}}
          >
            {paginatedMenuItems.map((item: string, index: number) => {
              const actualIndex = currentPage * itemsPerPage + index;
              return (
                <MenuItem
                  key={actualIndex}
                  item={item}
                  price={prices[actualIndex]}
                  image={restaurant.menuItemImages[actualIndex]}
                  setCartPop={()=>{popUp(actualIndex)}}
                  dietaryViolations={restaurant.menuDietaryViolations[actualIndex]}
                  userPreferences={preferences}
                  deal={deal}
                />
              );
            })}
          </ul>
        </div>
        <div 
          className="flex justify-between items-center sticky bottom-0 w-full bg-white p-4 mt-6 border-t border-gray-200"
          style={{backgroundColor: ffColors.ffCard}}
        >
          {/* Checkout Button */}
          <div className="flex flex-col items-center">
            <h3 
              className="text-lg font-semibold text-gray-800"
              style={{color: ffColors.ffText}}
            >
              Total: ${displayTotal.toFixed(2)}
            </h3>
            <button
              onClick={handleViewCart}
              disabled={cartTotal === 0}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50 hover:bg-blue-600 transition duration-200 ease-in-out"
              style={{backgroundColor: ffColors.ffGreenL}}
            >
              View Cart
            </button>
          </div>
          {/* Vertical Line */}
          <div 
            className="h-20 border-l border-gray-300 mx-4"
            style={{borderColor: ffColors.ffEdge}}
          ></div>
          {/* Pagination Controls */}
          <div className="space-x-4 mt-4 mx-auto">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              Previous
            </button>
            <span 
              className="text-lg font-medium"
              style={{color: ffColors.ffText}}
            >
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              Next
            </button>
          </div>
          {/* Vertical Line */}
          <div 
            className="h-20 border-l mx-4"
            style={{borderColor: ffColors.ffEdge}}
          ></div>
          <button
            onClick={handleSwitchRestaurant}
            className="px-4 py-2 text-white rounded ml-4"
            style={{backgroundColor: ffColors.ffRedL}}
          >
            Switch Restaurant
          </button>
        </div>
        
      </div>

      {/* Add To Cart Popup */}
      <OptionsPopup
      cartPop={cartPop}
      restaurant={restaurant}
      popIndex={popIndex}
      handleClosePop={handleClosePop}
      handleDishConfirm={handleDishConfirm}
      optionIndex={optionIndex}
      setOptionIndex={setOptionIndex}
      add={false}
      priceChange={priceChange}
      setPriceChange={setPriceChange}
      quantity={quantity}
      setQuantity={setQuantity}
      itemPrice={popPrice}
      />
      {/*<CorePopup
      pop={cartPop}
      popTitle={'Add ' + restaurant.menu[popIndex] + ' to cart'}
      popText={''}
      closeFunc={handleClosePop}
      titleColor={ffColors.ffGreenL}
      buttons={
        [
          {
            bFunc: ()=>{handleDishConfirm(popIndex, 1)},
            bText: 'Confirm',
            bColor: ffColors.ffGreenL
          },
          {
            bFunc: handleClosePop,
            bText: 'Cancel',
            bColor: ffColors.ffRedL
          }
        ]
      }
      >
        <div
        style={{flexDirection: 'column', overflowY: 'scroll', maxHeight: '80vh'}}
        >
          <div>
            {priceChange !== 0 ? <div>
              + {priceChange}
            </div> : <></> }
          </div>
          {menuOptions.map((item, index) => optionMap(item, index))}
        </div>
      </CorePopup>*/}

      {/* Include the ConfirmModal */}
      <ConfirmModal
        isOpen={showModal}
        title="Switch Restaurants?"
        message={`You can only have items from one restaurant in your cart (currently from "${cart?.restaurant.restaurantName}"). Would you like to clear your cart to add items from "${restaurant.restaurantName}"?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      
    </div>
  );
}

const styles = {
  account: {
    padding: '16px',
    backgroundColor: ffColors.ffCard
  },
};
