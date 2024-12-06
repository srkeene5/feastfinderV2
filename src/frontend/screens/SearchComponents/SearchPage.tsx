import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

// Components
import SearchCards from "./SearchCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";
import { useLocation } from "react-router-dom";
import MapComponent from "../MapComponents/MapComponent.tsx";
import CoreStyles from "../CoreComponents/CoreStyles.tsx";
import tw from 'twrnc';

export default function SearchPage() {
  const location = useLocation();
  const { search, results } = location.state;
  const { scrollableStyle } = CoreStyles();
  const styles = CoreStyles().searchPageStyles;
  const [width, setWidth] = useState<number>(Dimensions.get('window').width);

  useEffect(()=>{
    const onChange = ({window}) => {
      setWidth(window.width);
    }
    Dimensions.addEventListener('change', onChange);
  }, []);

  return (
    <View style={tw.style(styles.container)}>
      <CoreBanner searchVal={search} />
      <View style={tw.style(styles.searchPageContainer)}>
        {width > 750 && <View style={tw.style(styles.mapContainer)}>
          <MapComponent restaurants={results} />
        </View>}
        <View style={tw.style(styles.cardsContainer)}>
          <div style={{...scrollableStyle, padding: 8}}>
            {width <= 750 && <View style={tw.style(styles.mapContainerShrunk)}>
              <MapComponent restaurants={results} />
            </View>}
            <SearchCards />
          </div>
        </View>
      </View>
    </View>
  );
}