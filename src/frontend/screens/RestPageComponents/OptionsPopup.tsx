import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CorePopup from '../CoreComponents/CorePopup'
import { coreForm, ffColors } from '../CoreComponents/CoreStyles'
import { CartEntry, Option } from '../../../types/Cart'
import { useCart } from './CartContext'
import CoreButton from '../CoreComponents/CoreButton'

interface OptionProps {
    cartPop: boolean,
    restaurant: Restaurant,
    popIndex: number,
    handleClosePop: ()=>{},
}

const OptionsPopup: React.FC<OptionProps> = ({cartPop, restaurant, popIndex, handleClosePop }) => {
    const { cart, updateCart, clearCart } = useCart();
    const [menuOptions, setMenuOptions] = useState<Option[]>([]);
    const [checkboxesState, setCheckboxesState] = useState<{[key: number]: boolean}>({});
    const [requiredState, setRequiredState] = useState<{[key: number]: number}>({});
    const [optionalState, setOptionalState] = useState<{[key: number]: number}>({});
    const [options, setOptions] = useState<Set<Option>>(new Set());
    const [priceChange, setPriceChange] = useState<number>(0);
    
    const optionMap = (item, index) => {
        if (item.options && item.options.length > 0) {
          if (item.required) {
            return (
              <div 
              key={index}
              style={coreForm.formItem}
              >
                <div
                style={coreForm.subheader}
                >
                  Required:
                </div>
                {item.options.map((subItem, subIndex)=>(
                  <div 
                  key = {subIndex}
                  style={{display: 'flex', flexDirection:'row', maxWidth: '80vh', flexWrap: 'wrap'}}
                  >
                    {subItem.optionList ? requiredSet(subItem.optionList, subIndex): <div></div>}
                  </div>
                ))}
              </div>
            )
          } else {
            return (
              <div 
              key={index}
              style={coreForm.formItem}
              >
                <div
                style={coreForm.subheader}
                >
                  Optional:
                </div>
                {item.options.map((subItem, subIndex)=>(
                  <div 
                  key = {subIndex}
                  style={{display: 'flex', flexDirection:'row', maxWidth: '80vh', flexWrap: 'wrap'}}
                  >
                    <input 
                    type="checkbox" 
                    checked={checkboxesState[subIndex] || false}
                    onChange={(e)=>handleCheckboxChange(subIndex, -1, e.target.checked, subItem.optionList)}
                    />
                    {subItem.optionList ? optionalSet(subItem.optionList, subIndex): <div></div>}
                  </div>
                ))}
              </div>
            )
          }
        }
        return (
          <div key={index}>
      
          </div>
        )
      }
    
      const requiredSet = (optionList, subIndex) => {
        return (
          <div
          style={{}}
          >
            {optionList.map((option, i)=>(
              <div 
              key = {i}
              style={{marginLeft: 10, float: 'left'}}
              >
                <CoreButton
                bText={option.optionName}
                buttonColor={i === requiredState[subIndex] ? ffColors.ffGreenL : ffColors.ffGreyL}
                pressFunc={()=>{handleButtonChange(subIndex, i, true, optionList)}}
                />
              </div>
            ))}
          </div>
        )
      }
    
      const optionalSet = (optionList, subIndex) => {
        return (
          <div
          style={{}}
          >
            {optionList.map((option, i)=>(
              <div 
              key = {i}
              style={{marginLeft: 10, float: 'left'}}
              >
                {checkboxesState[subIndex] ? 
                <CoreButton
                bText={option.optionName}
                buttonColor={i === optionalState[subIndex] ? ffColors.ffGreenL: ffColors.ffGreyL}
                pressFunc={()=>{handleButtonChange(subIndex, i, false, optionList)}}
                />: 
                <CoreButton
                bText={option.optionName}
                buttonColor={ffColors.ffGreyXL}
                pressFunc={()=>{handleCheckboxChange(subIndex, i, true, optionList); handleButtonChange(subIndex, i, false, optionList)}}
                />
                }
              </div>
            ))}
          </div>
        )
      }

      const handleButtonChange = (index: number, value: number, required: boolean, optionList) => {
        if (required) {
          if (typeof value === 'number' && value !== -1) {
            optionChange(true, optionList[value]);
          }
          if (typeof requiredState[index] === 'number' && requiredState[index] !== -1) {
            optionChange(false, optionList[requiredState[index]]);
          }
          setRequiredState((prevState)=>({
            ...prevState,
            [index]: value,
          }));
        } else {
          if (typeof value === 'number' && value !== -1) {
            optionChange(true, optionList[value]);
          }
          if (typeof optionalState[index] === 'number' && optionalState[index] !== -1) {
            optionChange(false, optionList[optionalState[index]]);
          }
          setOptionalState((prevState)=>({
            ...prevState,
            [index]: value,
          }));
        }
      }
    
      const handleCheckboxChange = (index: number, value: number, selected: boolean, optionList) => {
        setCheckboxesState((prevState)=>({
          ...prevState,
          [index]: selected,
        }));
        if (!selected) {
          if (typeof value === 'number' && value !== -1) {
            optionChange(true, optionList[value]);
          }
          if (typeof optionalState[index] === 'number' && optionalState[index] !== -1) {
            optionChange(false, optionList[optionalState[index]]);
          }
          setOptionalState((prevState)=>({
            ...prevState,
            [index]: -1,
          }));
        }
      }
    
      const optionChange = (add: boolean, option: Option) => {
        if (add) {
          setOptions(prevOptions => new Set(prevOptions).add(option));
          setPriceChange((prevPrice) => Math.round((prevPrice + option.optionPrice)* 100)/100);
        } else {
          setOptions(prevOptions => {
            const updatedOptions = new Set(prevOptions);
            updatedOptions.delete(option);
            return updatedOptions;
          });
          setPriceChange((prevPrice) => Math.round((prevPrice - option.optionPrice)* 100)/100);
        }
      }

      const handleDishConfirm = (index: number, quantity: number) => {
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
    
    return (
        <CorePopup
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
        </CorePopup>
    )
}

export default OptionsPopup