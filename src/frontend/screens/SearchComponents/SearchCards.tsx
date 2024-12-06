import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  TextInput, // Add TextInput
  Dimensions,
} from "react-native";
import { API_BASE_URL } from '../../../config.js';
import { TouchableOpacity } from 'react-native';
import { useAuth } from "../UserComponents/Authorizer.tsx";
import CoreStyles from "../CoreComponents/CoreStyles.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import CorePopup from "../CoreComponents/CorePopup.tsx";
import CoreButton from "../CoreComponents/CoreButton.tsx";
import { Star } from "lucide-react";
// import { Restaurant } from "../CoreComponents/CoreTypes.tsx";

interface Review {
  reviewId: number;
  username: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface Restaurant {
  restaurantID: string;
  restaurantName: string;
  restaurantImage?: string;
  distance: number;
  restaurantAddress: string;
  doordashAvailable: boolean;
  grubhubAvailable: boolean;
  ubereatsAvailable: boolean;
  reviews: Review[];
  averageRating: number;
  websiteURL?: string;
}

export default function SearchCards() {
  const { ffColors, loginStyles } = CoreStyles();
  const styles = CoreStyles().searchCardsStyles;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    results = [],
    searchType,
    search,
    deliveryService,
    errorText,
  } = location.state;
  const [width, setWidth] = useState<number>(Dimensions.get('window').width);

  const [userValue, setuserValue] = React.useState("");
  const [passValue, setPassValue] = React.useState("");
  const [errPop, setErrPop] = React.useState(false);
  const [errText, setErrText] = React.useState("Error Undefined");
  const [loginPop, setLoginPop] = React.useState(false);
  const [buttonService, setButtonService] = React.useState("Error Undefined");
  const [holdItem, setHoldItem] = React.useState(null);
  const { user } = useAuth();
  const [isLoadingReviews, setIsLoadingReviews] = React.useState(false);

  // Modified review states to include all reviews
  const [reviewPop, setReviewPop] = React.useState(false);
  const [reviewsViewPop, setReviewsViewPop] = React.useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    React.useState<Restaurant | null>(null);
  const [selectedRestaurantReviews, setSelectedRestaurantReviews] =
    React.useState<Review[]>([]);
  const [reviewText, setReviewText] = React.useState("");
  const [rating, setRating] = React.useState<number>(0);
  const [hoveredRating, setHoveredRating] = React.useState<number>(0);
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  type SortOption = 'distance-asc' | 'distance-desc' | 'rating-asc' | 'rating-desc';
  const [sortOption, setSortOption] = React.useState<SortOption>('distance-asc');

  // Initialize restaurants state when results change
  React.useEffect(() => {
    const initializedRestaurants = results.map((restaurant) => ({
      ...restaurant,
      reviews: [],
      averageRating: 0,
    }));
    setRestaurants(initializedRestaurants);
    results.forEach((restaurant) => {
      fetchReviews(restaurant.restaurantID);
    });
  }, [results]);

  
  
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  const filterBySelectedService = (item) => {
    if (deliveryService === "UberEats") return item.ubereatsAvailable;
    if (deliveryService === "Grubhub") return item.grubhubAvailable;
    if (deliveryService === "DoorDash") return item.doordashAvailable;
    return true;
  };

  const filteredResults = restaurants.filter(filterBySelectedService);

  // Sorting function
  const sortRestaurants = (restaurantsList: Restaurant[]) => {
    return [...restaurantsList].sort((a, b) => {
      switch (sortOption) {
        case 'distance-asc':
          return a.distance - b.distance;
        case 'distance-desc':
          return b.distance - a.distance;
        case 'rating-asc':
          return a.averageRating - b.averageRating;
        case 'rating-desc':
          return b.averageRating - a.averageRating;
        default:
          return 0;
      }
    });
  };

  //const sortedResults = sortRestaurants(filteredResults);
  const sortedResults = React.useMemo(() => sortRestaurants(filteredResults), [filteredResults, sortOption]);
  const resetUserPass = () => {
    setuserValue("");
    setPassValue("");
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

      switch (buttonService) {
        case "DoorDash":
            localStorage.setItem("doordash_token", data.token);
            break;
        case "GrubHub":
            localStorage.setItem("grubhub_token", data.token);
            break;
        case "UberEats":
            localStorage.setItem("ubereats_token", data.token);
            break;
        default:
            console.error('switchFailure');
            return;
    }

      setLoginPop(false);
      setButtonService("Error Undefined");
      resetUserPass();
      navigate("/restaurant", {
        state: { restaurant: holdItem, service: buttonService },
      });
    } catch (err) {
      setErrText(err.message);
      setErrPop(true);
    }
  };

  const checkLogin = async (service: string, item) => {
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
        // console.log(service)
        switch (service) {
          case "DoorDash":
              isStored = data.doordash_logged_in;
              break;
          case "GrubHub":
              isStored = data.grubhub_logged_in;
              break;
          case "UberEats":
              isStored = data.uber_logged_in;
              break;
          default:
            console.error("switchFailure");
            setErrText(
              "Internal Service Error\nDelivery Service not recognized"
            );
            setErrPop(true);
            return;
        }

        if (isStored) {
          navigate("/restaurant", {
            state: { restaurant: item, service: service },
          });
        } else {
          setHoldItem(item);
          setButtonService(service);
          setLoginPop(true);
        }
      } else {
        const errorData = await res.json();
        setErrText(errorData.msg);
        setErrPop(true);
      }
    } catch (error) {
      setErrText("Network error\nCheck internet connection");
      setErrPop(true);
    }
  };

  const APIButton = (service: string, available: boolean, item) => {
    if (available) {
      return (
        <CoreButton
          pressFunc={() => {
            checkLogin(service, item);
          }}
          bText={service}
          buttonColor={ffColors.ffGreenL}
        />
      );
    } else {
      return (
        <View style={styles.buttonDeactive}>
          <Text style={styles.buttonTextDeactive}>{service}</Text>
        </View>
      );
    }
  };

  const StarRating = ({
    rating,
    interactive = false,
    onRatingChange = () => {},
    hoverRating = null,
  }: {
    rating: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    hoverRating?: number | null;
  }) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            style={{
              cursor: interactive ? "pointer" : "default",
              marginRight: 4,
            }}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            onMouseEnter={
              interactive ? () => setHoveredRating(star) : undefined
            }
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
            fill={
              (interactive ? star <= (hoveredRating || rating) : star <= rating)
                ? "#FFD700"
                : "none"
            }
            color="#FFD700"
            size={interactive ? 32 : 20}
          />
        ))}
        {!interactive && (
          <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>
        )}
      </View>
    );
  };

  const handleReviewSubmit = async () => {
    console.log('=== Starting Review Submission ===');
    console.log('Review Data:', {
      restaurantID: selectedRestaurant?.restaurantID,
      username: user?.username,
      rating,
      reviewText,
      token: user?.token // Don't log full token in production!
    });
  
    if (rating === 0) {
      console.log('Validation failed: No rating selected');
      setErrText("Please select a rating");
      setErrPop(true);
      return;
    }
  
    if (!reviewText.trim()) {
      console.log('Validation failed: No review text');
      setErrText("Please write a review");
      setErrPop(true);
      return;
    }
  
    if (!selectedRestaurant) {
      console.log('Validation failed: No restaurant selected');
      setErrText("No restaurant selected");
      setErrPop(true);
      return;
    }
  
    try {
      console.log('Sending POST request to /api/reviews');
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token,
        },
        body: JSON.stringify({
          restaurantID: selectedRestaurant.restaurantID,
          username: user?.username || 'Anonymous',
          rating: rating,
          reviewText: reviewText,
        }),
      });
  
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server responded with error:', errorText);
        throw new Error(errorText);
      }
  
      const savedReview = await response.json();
      console.log('Successfully saved review:', savedReview);
  
      // Fetch updated reviews
      console.log('Fetching updated reviews for restaurant:', selectedRestaurant.restaurantID);
      await fetchReviews(selectedRestaurant.restaurantID);
  
      // Reset form and close popup
      console.log('Resetting form and closing popup');
      setReviewText("");
      setRating(0);
      setReviewPop(false);
      setSelectedRestaurant(null);
  
    } catch (error) {
      console.error('Error in handleReviewSubmit:', error);
      setErrText('Failed to submit review: ' + error.message);
      setErrPop(true);
    }
  };

  const fetchReviews = async (restaurantID: string) => {
    setIsLoadingReviews(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/restaurant/${restaurantID}`);
      if (response.ok) {
        const reviews = await response.json();
        // Update restaurants state with fetched reviews
        setRestaurants((prevRestaurants) => {
          return prevRestaurants.map((restaurant) => {
            if (restaurant.restaurantID === restaurantID) {
              const averageRating = calculateAverageRating(reviews);
              return {
                ...restaurant,
                reviews: reviews,
                averageRating: averageRating,
              };
            }
            return restaurant;
          });
        });
      } else {
        console.error(`Failed to fetch reviews for restaurantID: ${restaurantID}`);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setErrText('Failed to load reviews');
      setErrPop(true);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(()=>{
    const onChange = ({window}) => {
      setWidth(window.width);
    }
    Dimensions.addEventListener('change', onChange);
  }, []);

  const restItem = (item: Restaurant, index: number) => {
    const restaurantData =
      restaurants.find((r) => r.restaurantID === item.restaurantID) || item;
  
    return (
      <View key={restaurantData.restaurantID} style={styles.card}>
        {width > 1200 && (<Image
          source={{
            uri: restaurantData.restaurantImage
              ? String(restaurantData.restaurantImage)
              : "/images/testRest.png",
          }}
          style={styles.cardImage}
          resizeMode="contain"
        />)}
        <View style={styles.cardContent}>
        <View style={styles.buttonAndTextContainer}>
          {width <= 1200 && (<Image
            source={{
              uri: restaurantData.restaurantImage
                ? String(restaurantData.restaurantImage)
                : "/images/testRest.png",
            }}
            style={styles.cardImageSrunk}
            resizeMode="contain"
          />)}
          <Text numberOfLines={1} style={styles.restaurantName}>
            {restaurantData.restaurantName || "Unknown Restaurant"}
          </Text>
          {restaurantData.websiteURL && (
            <CoreButton
              pressFunc={() => window.open(restaurantData.websiteURL, '_blank')}
              bText="Website"
              buttonColor={ffColors.ffBlueD}
            />
          )}
          </View>
          <StarRating rating={restaurantData.averageRating || 0} />
          <Text numberOfLines={1} style={styles.cardDetails}>
            Distance: {restaurantData.distance?.toString() || "N/A"} Miles
          </Text>
          <Text numberOfLines={1} style={styles.cardDetails}>
            Address: {restaurantData.restaurantAddress || "Address not available"}
          </Text>
          <Text numberOfLines={5} style={styles.cardDetails}>
            Description: {restaurantData.restaurantName + " Description..."}
          </Text>
          <View style={styles.reviewButtonsContainer}>
            <CoreButton
              pressFunc={() => {
                setSelectedRestaurant(restaurantData);
                setReviewPop(true);
              }}
              bText="Leave a Review"
              buttonColor={ffColors.ffBlueL}
            />
            <CoreButton
              pressFunc={() => {
                setSelectedRestaurant(restaurantData);
                setSelectedRestaurantReviews(restaurantData.reviews || []);
                setReviewsViewPop(true);
              }}
              bText="View Reviews"
              buttonColor={ffColors.ffPurpleL}
            />
          </View>
        </View>
        <View style={styles.buttonContent}>
          {APIButton(
            "DoorDash",
            restaurantData.doordashAvailable ?? false,
            restaurantData
          )}
          {APIButton(
            "GrubHub",
            restaurantData.grubhubAvailable ?? false,
            restaurantData
          )}
          {APIButton(
            "UberEats",
            restaurantData.ubereatsAvailable ?? false,
            restaurantData
          )}
        </View>
      </View>
    );
  };

  const goToDishRestaurants = async (dishName) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/searchRestaurant?dish=${encodeURIComponent(
          dishName
        )}`
      );
      if (response.ok) {
        const restaurantResults = await response.json();
        navigate("/Search", {
          state: {
            search: dishName,
            results: restaurantResults,
            searchType: "restaurant",
            deliveryService,
          },
        });
      } else {
        console.log("No restaurants found for dish:", dishName);
        navigate("/Search", {
          state: {
            search: dishName,
            results: [],
            searchType: "restaurant",
            deliveryService,
            errorText: "No results found",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      navigate("/Search", {
        state: {
          search: dishName,
          results: [],
          searchType: "restaurant",
          deliveryService,
          errorText: "Error fetching restaurants",
        },
      });
    }
  };

  const dishItem = (item, index) => {
    return (
      <View key={index} style={styles.card}>
        <Image
          source={{
            uri: item.image ? String(item.image) : "/images/default_dish.png",
          }}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <View style={styles.cardContent}>
          <Text numberOfLines={1} style={styles.dishName}>
            {item.dishName}
          </Text>
          <Text numberOfLines={1} style={styles.cardDetails}>
            Available at: {item.restaurantNames[0]}
          </Text>
        </View>
        <View style={styles.buttonContent}>
          <CoreButton
            pressFunc={() => goToDishRestaurants(item.dishName)}
            bText="View Restaurants"
            buttonColor={ffColors.ffGreenL}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Sorting Controls */}
        {searchType === 'restaurant' && (
          <>
            <View style={styles.sortingContainer}>
              <Text style={styles.sortingLabel}>Sort by Distance:</Text>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'distance-asc' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('distance-asc')}
              >
                <Text style={styles.sortButtonText}>Closest First</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'distance-desc' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('distance-desc')}
              >
                <Text style={styles.sortButtonText}>Furthest First</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sortingContainer}>
              <Text style={styles.sortingLabel}>Sort by Rating:</Text>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'rating-desc' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('rating-desc')}
              >
                <Text style={styles.sortButtonText}>Highest First</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'rating-asc' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('rating-asc')}
              >
                <Text style={styles.sortButtonText}>Lowest First</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <View style={styles.cardContainer}>
          {sortedResults.length > 0 ? (
            searchType === "restaurant" ? (
              sortedResults.map((item, index) => restItem(item, index))
            ) : (
              sortedResults.map((item, index) => dishItem(item, index))
            )
          ) : (
            <View style={styles.errorPage}>
              <Text style={styles.errorMessage}>
                {errorText ||
                  `No results found for ${deliveryService || "all services"}.`}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Error Popup */}
      <CorePopup
        pop={errPop}
        popTitle={"Error:"}
        popText={errText}
        closeFunc={() => {
          setErrPop(false);
          setErrText("Error Undefined");
        }}
        titleColor={ffColors.ffRedL}
        buttons={[
          {
            bText: "Close",
            bColor: ffColors.ffRedL,
            bFunc: () => {
              setErrPop(false);
              setErrText("Error Undefined");
            },
          },
        ]}
      />

      {/* Login Popup */}
      <CorePopup
        popTitle={"Not logged into " + buttonService + ":"}
        popText={""}
        closeFunc={() => {
          setLoginPop(false);
          setButtonService("Error Undefined");
          resetUserPass();
        }}
        pop={loginPop}
        titleColor={ffColors.ffRedL}
        buttons={[
          {
            bText: "Submit",
            bColor: ffColors.ffGreenL,
            bFunc: () => {
              popSubmitHandler();
            },
          },
          {
            bText: "Close",
            bColor: ffColors.ffRedL,
            bFunc: () => {
              setLoginPop(false);
              setButtonService("Error Undefined");
              resetUserPass();
            },
          },
        ]}
      >
        <View style={loginStyles.loginContainer}>
          <Text style={loginStyles.popupText}>Login:</Text>
          <TextInput
            style={loginStyles.popInput}
            onChangeText={setuserValue}
            value={userValue}
            placeholder="Username..."
          />
          <TextInput
            style={loginStyles.popInput}
            onChangeText={setPassValue}
            value={passValue}
            placeholder="Password..."
            secureTextEntry={true}
          />
        </View>
      </CorePopup>

      {/* Review Popup */}
      <CorePopup
        popTitle={`Leave a Review for ${
          selectedRestaurant?.restaurantName || ""
        }`}
        popText={""}
        closeFunc={() => {
          setReviewPop(false);
          setSelectedRestaurant(null);
          setReviewText("");
          setRating(0);
          setHoveredRating(0);
        }}
        pop={reviewPop}
        titleColor={ffColors.ffBlueL}
        buttons={[
          {
            bText: "Submit",
            bColor: ffColors.ffGreenL,
            bFunc: handleReviewSubmit,
          },
          {
            bText: "Cancel",
            bColor: ffColors.ffRedL,
            bFunc: () => {
              setReviewPop(false);
              setSelectedRestaurant(null);
              setReviewText("");
              setRating(0);
              setHoveredRating(0);
            },
          },
        ]}
      >
        <View style={styles.reviewContainer}>
          <Text style={loginStyles.popupText}>Rate your experience:</Text>
          <StarRating
            rating={rating}
            interactive={true}
            onRatingChange={setRating}
            hoverRating={hoveredRating}
          />
          <Text style={loginStyles.popupText}>Your review:</Text>
          <TextInput
            style={styles.reviewInput}
            onChangeText={setReviewText}
            value={reviewText}
            placeholder="Write your review here..."
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </CorePopup>

      {/* Reviews View Popup */}
      <CorePopup
        popTitle={`Reviews for ${selectedRestaurant?.restaurantName || ""}`}
        popText={""}
        closeFunc={() => {
          setReviewsViewPop(false);
          setSelectedRestaurant(null);
          setSelectedRestaurantReviews([]);
        }}
        pop={reviewsViewPop}
        titleColor={ffColors.ffBlueL}
        buttons={[
          {
            bText: "Close",
            bColor: ffColors.ffRedL,
            bFunc: () => {
              setReviewsViewPop(false);
              setSelectedRestaurant(null);
              setSelectedRestaurantReviews([]);
            },
          },
        ]}
      >
        <ScrollView style={styles.reviewsContainer}>
          <View style={styles.reviewsSummary}>
            <StarRating rating={selectedRestaurant?.averageRating || 0} />
            <Text style={styles.reviewsCount}>
              {selectedRestaurantReviews.length} reviews
            </Text>
          </View>
          {selectedRestaurantReviews.map((review) => (
            <View key={review.reviewId} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUsername}>{review.username}</Text>
                <StarRating rating={review.rating} />
                <Text style={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.reviewText}>{review.reviewText}</Text>
            </View>
          ))}
        </ScrollView>
      </CorePopup>
    </SafeAreaView>
  );
}
