import React, { useEffect, useState } from 'react'
import CorePopup from '../CoreComponents/CorePopup.tsx'
import { coreForm, ffColors } from '../CoreComponents/CoreStyles.tsx'
import { OptionIndex } from '../../../types/Cart'
import CoreButton from '../CoreComponents/CoreButton.tsx'

interface OptionProps {
  cartPop: boolean,
  restaurant: any,
  popIndex: number,
  handleClosePop: ()=>void,
  handleDishConfirm: (index: number, quantity: number)=>void,
  optionIndex: OptionIndex,
  setOptionIndex: React.Dispatch<React.SetStateAction<OptionIndex>>,
  add: boolean,
  priceChange: number,
  setPriceChange: React.Dispatch<React.SetStateAction<number>>,
}

const OptionsPopup: React.FC<OptionProps> = ({cartPop, restaurant, popIndex, handleClosePop, handleDishConfirm, optionIndex, setOptionIndex, add, priceChange, setPriceChange}) => {
  const [checkboxesState, setCheckboxesState] = useState<{[key: number]: boolean}>({});

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
                onChange={(e)=>handleCheckboxChange(subIndex, e.target.checked)}
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
            buttonColor={i === optionIndex.required[subIndex] ? ffColors.ffGreenL : ffColors.ffGreyL}
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
            buttonColor={i === optionIndex.optional[subIndex] ? ffColors.ffGreenL: ffColors.ffGreyL}
            pressFunc={()=>{handleButtonChange(subIndex, i, false)}}
            />: 
            <CoreButton
            bText={option.optionName}
            buttonColor={ffColors.ffGreyXL}
            pressFunc={()=>{handleCheckboxChange(subIndex, true); handleButtonChange(subIndex, i, false)}}
            />
            }
          </div>
        ))}
      </div>
    )
  }

  const handleButtonChange = (index: number, value: number, required: boolean) => {
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

  const close = () => {
    setCheckboxesState({})
    setPriceChange(0)
  }
  
  const menuOptions = restaurant.menuOptions[popIndex] || []

  var titlePre = 'Add ';
  if (add) {
    titlePre = 'Edit ';
  }

  return (
    <CorePopup
    pop={cartPop}
    popTitle={titlePre + restaurant.menu[popIndex] + ' to cart'}
    popText={''}
    closeFunc={()=>{close(); handleClosePop()}}
    titleColor={ffColors.ffGreenL}
    buttons={
      [
        {
          bFunc: ()=>{close(); handleDishConfirm(popIndex, 1)},
          bText: 'Confirm',
          bColor: ffColors.ffGreenL
        },
        {
          bFunc: ()=>{close(); handleClosePop()},
          bText: 'Cancel',
          bColor: ffColors.ffRedL
        }
      ]
    }>
      <div
      style={{flexDirection: 'column', overflowY: 'scroll', maxHeight: '80vh'}}
      >
        <div>
          {priceChange !== 0 ? <div>
          + {priceChange.toFixed(2)}
          </div> : <></> }
        </div>
        {menuOptions.map((item, index) => optionMap(item, index))}
      </div>
    </CorePopup>
  )
}

export default OptionsPopup