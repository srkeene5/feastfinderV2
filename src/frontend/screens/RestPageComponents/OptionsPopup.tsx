import React, { useEffect, useState } from 'react'
import CorePopup from '../CoreComponents/CorePopup.tsx'
import CoreStyles from '../CoreComponents/CoreStyles.tsx'
import { OptionIndex } from '../../../types/Cart'
import CoreButton from '../CoreComponents/CoreButton.tsx'
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface OptionProps {
  cartPop: boolean,
  restaurant: any,
  popIndex: number,
  handleClosePop: ()=>void,
  handleDishConfirm: (index: number)=>void,
  optionIndex: OptionIndex,
  setOptionIndex: React.Dispatch<React.SetStateAction<OptionIndex>>,
  add: boolean,
  priceChange: number,
  setPriceChange: React.Dispatch<React.SetStateAction<number>>,
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>,
  itemPrice: number,
}

const OptionsPopup: React.FC<OptionProps> = ({cartPop, restaurant, popIndex, handleClosePop, handleDishConfirm, optionIndex, setOptionIndex, add, priceChange, setPriceChange, quantity, setQuantity, itemPrice}) => {
  const [checkboxesState, setCheckboxesState] = useState<{[key: number]: boolean}>({});
  const [errPop, setErrPop] = useState(false);
  const [errText, setErrText] = useState('Error Undefined');
  const { coreForm, ffColors, scrollableStyle } = CoreStyles();

  useEffect(()=>{
    const initialCheckboxesState: {[key: number]: boolean} = {};
    optionIndex.optional.forEach((value, i) => {
      if (value !== -1) {
        initialCheckboxesState[i] = true;
      }
    });

    setCheckboxesState(initialCheckboxesState);
  }, [optionIndex.optional]);

  const optionMap = (item, index) => {
    if (item.options && item.options.length > 0) {
      if (item.required) {
        return (
          <div 
          key={index}
          style={coreForm.formItem}
          >
            <div
            style={{...coreForm.subheader, paddingTop:12}}
            >
              Required:
            </div>
            {item.options.map((subItem, subIndex)=>(
              <div 
              key = {subIndex}
              style={{display: 'flex', flexDirection:'row', maxWidth: '80vh', flexWrap: 'wrap', marginTop: 16}}
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
            style={{...coreForm.subheader, paddingTop:12}}
            >
              Optional:
            </div>
            {item.options.map((subItem, subIndex)=>(
              <div 
              key = {subIndex}
              style={{display: 'flex', flexDirection:'row', maxWidth: '80vh', flexWrap: 'wrap', marginTop: 16}}
              >
                <TouchableOpacity
                  style={tw`flex-row items-center`}
                  onPress={() => handleCheckboxChange(subIndex, !checkboxesState[subIndex])}
                >
                  <Text style={tw`mr-2`}>
                    {checkboxesState[subIndex] ? (
                      <Text style={{color: ffColors.ffGreenL}}>✅</Text>
                    ) : (
                      <Text style={{ color: ffColors.ffRedL }}>❌</Text>
                    )}
                  </Text>
                </TouchableOpacity>
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
            buttonColor={i === optionIndex.required[subIndex] ? ffColors.ffGreenL : ffColors.ffDeadButton}
            pressFunc={()=>{handleButtonChange(subIndex, i, true)}}
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
            buttonColor={i === optionIndex.optional[subIndex] ? ffColors.ffGreenL: ffColors.ffDeadButton}
            pressFunc={()=>{handleButtonChange(subIndex, i, false)}}
            />: 
            <CoreButton
            bText={option.optionName}
            buttonColor={ffColors.ffGreyXL}
            pressFunc={()=>{handleCheckboxChange(subIndex, true); handleButtonChange(subIndex, i, false)}}
            textColor={ffColors.ffDeadButtonText}
            />
            }
          </div>
        ))}
      </div>
    )
  }

  const handleButtonChange = (index: number, value: number, required: boolean) => {
    setErrPop(false);
    if (required) {
      setOptionIndex(prevState=>({
        ...prevState,
        required: prevState.required.map((item, i) => 
          i === index ? value : item
        ),
      }));
      console.log("Required[index]: "+optionIndex.required[index] + ", val: "+value);
    } else {
      setOptionIndex(prevState=>({
        ...prevState,
        optional: prevState.optional.map((item, i) => 
          i === index ? value : item
        ),
      }));
      console.log("Optional[index]: "+optionIndex.optional[index] + ", val: "+value);
    }
  }
  useEffect(()=>{
    console.log("priceChange: "+priceChange)
    var newOptionPrice = optionIndex.required.reduce((total: number, value: number, i: number) => {
      if (value !== -1) {
        return total + restaurant.menuOptions[popIndex][0].options[i].optionList[value].optionPrice;
      }
      return total;
    }, 0);
    newOptionPrice += optionIndex.optional.reduce((total: number, value: number, i: number) => {
      if (value !== -1) {
        return total + restaurant.menuOptions[popIndex][1].options[i].optionList[value].optionPrice;
      }
      return total;
    }, 0);
    setPriceChange(newOptionPrice);
  }, [optionIndex])
    
  const handleCheckboxChange = (index: number, selected: boolean) => {
    setCheckboxesState((prevState)=>({
      ...prevState,
      [index]: selected,
    }));
    if (!selected) {
      handleButtonChange(index, -1, false)
    }
  }

  const checkSubmit = () => {
    var requiredSelected = true;
    optionIndex.required.forEach((value, i) => {
      if (value === -1) {
        requiredSelected = false;
      }
    });
    if (requiredSelected){
      close();
      handleDishConfirm(popIndex);
    } else {
      setErrPop(true);
      setErrText("Selections Must be made for all Required Options");
    }
  }

  const close = () => {
    setCheckboxesState({});
    setPriceChange(0);
    setQuantity(1);
    setErrPop(false);
    handleClosePop();
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }
  
  const menuOptions = restaurant.menuOptions[popIndex] || []

  var titlePre = 'Add ';
  var titlePost = ' to cart';
  var plural = '';
  if (add) {
    titlePre = 'Edit ';
    titlePost = ' in cart'
  }

  if (quantity > 1) {
    plural='s'
  }

  return (
    <CorePopup
    pop={cartPop}
    popTitle={titlePre + restaurant.menu[popIndex]+ plural + titlePost}
    popText={''}
    closeFunc={()=>{close()}}
    titleColor={ffColors.ffGreenL}
    buttons={
      [
        {
          bFunc: ()=>{checkSubmit()},
          bText: 'Confirm',
          bColor: ffColors.ffGreenL
        },
        {
          bFunc: ()=>{close()},
          bText: 'Cancel',
          bColor: ffColors.ffRedL
        }
      ]
    }>
      <div
      style={{flexDirection: 'column', maxHeight: '80vh', paddingBottom: 20}}
      >
        <div style={{paddingLeft:24, justifyContent: 'space-between'}}>
          {errPop ? (
            <div style={{color: ffColors.ffRedL, marginBottom: 12}}>
              {errText}
            </div>
          ):(<></>)}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 12}}>
            <div style={{...coreForm.subheader, paddingRight: 16}}>
              Price:
            </div>
            <div style={{color: ffColors.ffBody}}>
              {itemPrice} per {restaurant.menu[popIndex]}
            </div>
          </div>
          {priceChange !== 0 ? 
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 12}}>
            <div style={{...coreForm.subheader, paddingRight: 16}}>
              Optional Costs
            </div>
            <div style={{color: ffColors.ffBody}}>
              + {priceChange.toFixed(2)} per {restaurant.menu[popIndex]}
            </div>
          </div> : <></> }      
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 12}}>
            <div style={{...coreForm.subheader, paddingRight: 16}}>
            {"Quantity:"}
            </div>
            <button
              style={{
                backgroundColor: quantity === 1 ? ffColors.ffDeadButton : ffColors.ffRedL,
                color: quantity===1 ? ffColors.ffDeadButtonText : ffColors.ffActiveButtonText,
                border: 'none',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
                cursor: 'pointer',
              }}
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span style={{color: ffColors.ffBody}}>{quantity}</span>
            <button
              style={{
                backgroundColor: ffColors.ffGreenL,
                color: ffColors.ffActiveButtonText,
                border: 'none',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
                cursor: 'pointer',
              }}
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
        <div
        style={{...scrollableStyle, maxHeight: '65vh', backgroundColor: ffColors.ffBackground, paddingRight: 12, paddingLeft: 24}}
        >
          {menuOptions.map((item, index) => optionMap(item, index))}
        </div>
      </div>
    </CorePopup>
  )
}

export default OptionsPopup