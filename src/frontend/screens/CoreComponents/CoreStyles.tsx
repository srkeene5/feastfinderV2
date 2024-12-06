import { StyleSheet } from "react-native";
import { useDarkMode } from "./DarkModeContext.tsx";

export default function CoreStyles() {
  const { darkMode } = useDarkMode();

  const ffColors = darkMode ? {
    ffBackground: '#121212',  // Dark background for the overall page
    ffCard: '#1E1E1E',        // Dark card background
    ffEdge: '#3C3C3C',        // Slightly lighter edge for borders
    ffHeading: '#E5E5E5',      // Light text for headings
    ffBody: '#B0B0B0',         // Light grey body text
    ffText: '#FFFFFF',         // White text for general use
    ffInput: '#333333',
    ffDeadButton: '#555555',
    ffDeadButtonText: '#888888',
    ffActiveButtonText: '#eeeeee',
    ffRedL: '#b51536',         // Light red for error or highlights
    ffGreenL: '#079373',       // Bright green for success
    ffGreyXL: '#cdcdd0',       // Grey text for less important items
    ffGreyL: '#8c8c9c',        // Light grey for backgrounds
    ffRedD: '#73142e',         // Dark red for alerts
    ffGreenD: '#184941',       // Dark green for positive actions
    ffGreyD: '#41545b',        // Darker grey for edges or muted elements
    ffBlueL: '#9E9EFF',        // Light blue for links or accents
    ffBlueD: '#303F9F',        // Darker blue for buttons or selected items
    ffPurpleL: '#B39DDB',       // Light purple for soft highlights
    ffScrollbarTrack: '#2E2E2E', // Dark color for track
    ffScrollbarThumb: '#3F3F3F', // Darker color for thumb
  } : {
    ffBackground: '#f6f6f6',
    ffCard: '#ffffff',
    ffEdge: '#dddddd',
    ffHeading: '#111827',
    ffBody: '#6b7280',
    ffText: '#000000',
    ffInput: '#FFFFFF',
    ffDeadButton: '#808080',
    ffDeadButtonText: '#B0B0B0',
    ffActiveButtonText: '#FFFFFF',
    ffRedL: '#b51536',
    ffGreenL: '#079373',
    ffGreyXL: '#cdcdd0',
    ffGreyL: '#8c8c9c',
    ffRedD: '#73142e',
    ffGreenD: '#184941',
    ffGreyD: '#41545b',
    ffBlueL: '#CCCCFF',
    ffBlueD: '#6666FF',
    ffPurpleL: '#E0BBE4',
    ffScrollbarTrack: '#e0e0e0',
    ffScrollbarThumb: '#969696',
  }

  const coreStyles = StyleSheet.create({
    headingText: {
      color: ffColors.ffHeading,
      fontSize: 24,
      fontWeight: 'bold',
      paddingHorizontal: 8,
      margin: 10,
    },
  })

  const buttonStyles = StyleSheet.create({
    buttonText: {
      fontWeight: 'bold',
      color: ffColors.ffActiveButtonText,
      fontSize: 16,
    },
    popupButton: {
      backgroundColor: ffColors.ffGreyL,
      minWidth: 100,
      width: 'auto',
      padding: 15,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
  })

  const popStyles = StyleSheet.create({
    popup: {
      backgroundColor: ffColors.ffCard,
      borderColor: ffColors.ffEdge,
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    popupText: {
      color: ffColors.ffBody,
      marginBottom: 20,
      fontSize: 15,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    titleText: {
      margin: 10,
      marginRight: 140,
      fontSize: 20,
      fontWeight: 'bold',
    },
  })

  const coreForm = {
    container: {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column' as 'column',
      backgroundColor: ffColors.ffBackground,
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center',
      padding: '3rem 1rem',
    },
    headerContainer: {
      margin: '0 auto',
      width: '100%',
      maxWidth: '40rem',
    },
    title: {
      marginTop: '1.5rem',
      textAlign: 'center' as 'center',
      fontSize: '3rem',
      fontWeight: 'bold' as 'bold',
      color: ffColors.ffGreenL,
    },
    subtitle: {
      marginTop: '1.5rem',
      textAlign: 'center' as 'center',
      fontSize: '1.875rem',
      fontWeight: 'bold' as 'bold',
      color: ffColors.ffHeading,
    },
    content: {
      marginTop: '2rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      maxWidth: '40rem',
    },
    card: {
      backgroundColor: ffColors.ffCard,
      padding: '1.25rem 1rem 2rem 1rem',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
    },
    formItem: {
      marginBottom: '1.5rem',
    },
    header: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: ffColors.ffHeading,
    },
    subheader: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: ffColors.ffHeading,
    },
    body: {
      paddingLeft: '0.5rem'
    },
    text: {
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: ffColors.ffBody,
    },
    textInputSingle: {
      backgroundColor: ffColors.ffInput,
      color: ffColors.ffBody,
      marginTop: '0.5rem',
      borderRadius: 20,
      padding: 10,
      border: '1px solid',
      borderColor: ffColors.ffEdge,
    },
    textInputBox: {
      backgroundColor: ffColors.ffInput,
      color: ffColors.ffBody,
      height: 'auto',
      marginTop: '0.5rem',
      borderRadius: 20,
      padding: 10,
      resize: 'none',
      border: '1px solid',
      borderColor: ffColors.ffEdge,
    },
    dropdown: {
      backgroundColor: ffColors.ffInput,
      color: ffColors.ffBody,
      marginTop: '0.5rem',
      borderRadius: 20,
      padding: 10,
      border: '1px solid',
      borderColor: ffColors.ffEdge,
    },
    checkboxContainer: {
      backgroundColor: ffColors.ffCard,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
    },
    checkboxItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
    },
    checkboxLabel: {
      color: ffColors.ffBody,
      marginLeft: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  };
  const coreBannerStyles = StyleSheet.create({
    pageContainer: {
    },
    container: {
      width: '100%',
      height: '100%',
    },
    card: {
      width: '100%',
      backgroundColor: ffColors.ffGreenD,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardImageHolder: {
      height: 90,
      width: 120,
      margin: 5,
      borderRadius: 45,
    },
    cardImage: {
      height: 90,
      width: 120,
    },
    searchInput: {
      backgroundColor: ffColors.ffInput,
      color: ffColors.ffBody,
      borderColor:ffColors.ffEdge,
      height: 60,
      margin: 20,
      marginRight: 25,
      borderWidth: 1,
      flexGrow: 1,
      borderRadius: 20,
      padding: 10,
    },
    buttonGroup: {
      flexDirection: 'row',
      margin: 20,
    },
    searchTypeButton: {
      height: 40,
      width: 120,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    selectedButton: {
      backgroundColor: ffColors.ffGreenL,
    },
    unselectedButton: {
      backgroundColor: ffColors.ffDeadButton,
    },
    selectedText: {
      color: ffColors.ffActiveButtonText,
    },
    unselectedText: {
      color: ffColors.ffDeadButtonText,
    },
    filterButton: {
      backgroundColor: ffColors.ffGreenL,
      height: 60,
      margin: 20,
      padding: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterButtonText: {
      color: ffColors.ffActiveButtonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    filterButtonTextDisabled: {
      color: ffColors.ffDeadButtonText,
    },
    filterButtonDisabled: {
      backgroundColor: ffColors.ffDeadButton, // Grey out the filter button when disabled
    },
    popupOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
      width: '80%',
      backgroundColor: ffColors.ffBackground,
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    popupTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      color: ffColors.ffHeading,
    },
    popupLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
      color: ffColors.ffHeading,
    },
    checkboxContainer: {
      marginTop: 10,
    },
    checkboxItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkboxLabel: {
      marginLeft: 10,
      color: ffColors.ffBody,
    },
    popupButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    dropdown: {
      backgroundColor: ffColors.ffInput,
      color: ffColors.ffBody,
      height: 50,
      width: '100%',
      marginVertical: 10,
      padding: 10,
      borderRadius: 10,
      borderColor: ffColors.ffEdge,
      borderWidth: 1,
    },
    saveButton: {
      backgroundColor: ffColors.ffBlueD,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
    },
    buttonText: {
      color: ffColors.ffActiveButtonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  const coreDrawerStyles = StyleSheet.create({
    menuHeader: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderColor: 'lightgrey',
    },
    menuImage: {
      height: 40,
      width: 40,
      marginRight: 15,
    },
    navImage: {
      width: 30,
      height: 30,
      marginLeft: 20,
      marginRight: 40,
    },
    navTextContainer: {
      width: 180,
      paddingRight: 20,
    },
    navText: {
      fontSize: 20,
      color: ffColors.ffBody,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderColor: ffColors.ffEdge,
    },
    navContainer: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor:ffColors.ffBackground
    },
    logout: {
      backgroundColor: ffColors.ffRedL
    },
  });
  const chatSupportStyles = StyleSheet.create({
    chatBubble: {
      padding: 8,
      paddingTop: 6,
      borderRadius: 10,
      marginBottom: 4,
      maxWidth: 200,
    },
    userBubble: {
      backgroundColor: ffColors.ffGreenL,
      color: ffColors.ffActiveButtonText,
      alignSelf: 'flex-end',
    },
    otherBubble: {
      backgroundColor: ffColors.ffBackground,
      borderColor: ffColors.ffEdge,
      color: ffColors.ffText,
      alignSelf: 'flex-start',
    },
    chatContainer: {
      flex: 1,
      width: 300,
      height: '100%',
      display: 'flex',
      backgroundColor: ffColors.ffCard
    },
    header: {
      backgroundColor: ffColors.ffBackground,
      borderBottomColor: ffColors.ffEdge,
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    textInput: {
      backgroundColor: ffColors.ffBackground,
      padding: 10,
      paddingBottom: 15,
    },
    scroll: {
      flex: 1,
      padding: 10,
    },
    link: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });

  const accountStyles = StyleSheet.create({
    errorMessage: {
      color: ffColors.ffRedL,
      fontSize: 16,
    },
    currentAddressText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: ffColors.ffBody,
    },
    saveButton: {
      backgroundColor: ffColors.ffBlueD,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
    },
    buttonText: {
      color: ffColors.ffActiveButtonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const accountLinkedAPIsStyles = StyleSheet.create({
    //Linked Account Styles
    textLinked: {
      color: ffColors.ffGreenL,
    },
    textUnlinked: {
      color: ffColors.ffRedL,
    },
    text: {
      color: ffColors.ffHeading,
    },
    linkedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceText: {
      fontWeight: 'bold',
    },
  });

  const loginStyles = StyleSheet.create({
    popupText: {
      color: ffColors.ffBody,
      marginBottom: 10,
      fontSize: 15,
      fontWeight: 'bold',
    },
    popInput: {
      backgroundColor: ffColors.ffInput,
      color: ffColors.ffBody,
      height: 'auto',
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      width: '100%',
      fontSize: 14,
      borderColor: ffColors.ffEdge,
    },
    loginContainer: {
      margin: 20,
      marginTop: 0,
    },
  });

  const searchPageStyles = {
    container: {
      backgroundColor: ffColors.ffBackground,
      height: '100vh',
      flex: 1,
    },
    searchPageContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    mapContainer: {
      flex: 1,
      margin: 10,
      borderRadius: 20,
    },
    cardsContainer: {
      flex: 1.75,
      maxHeight: '100%',
    },
  };

  const searchCardsStyles = StyleSheet.create({
    container: {
      padding: 10,
    },
    card: {
      width: "100%",
      height: 300,
      borderRadius: 11,
      marginBottom: 10,
      elevation: 5,
      backgroundColor: ffColors.ffCard,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      flexDirection: "row",
    },
    cardImage: {
      aspectRatio: 1 / 1.2,
      height: "100%",
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    cardContent: {
      flex: 1,
      padding: 10,
    },
    restaurantName: {
      fontSize: 28,
      fontWeight: "bold",
      color: ffColors.ffHeading,
      overflow: "hidden",
      minWidth: 100,
      marginBottom: 8,
    },
    dishName: {
      fontSize: 24,
      fontWeight: "bold",
      color: ffColors.ffHeading,
      overflow: "hidden",
      minWidth: 100,
      marginBottom: 8,
    },
    cardDetails: {
      fontSize: 18,
      color: ffColors.ffBody,
      overflow: "hidden",
      minWidth: 100,
      marginTop: 8,
    },
    buttonDeactive: {
      backgroundColor: ffColors.ffDeadButton,
      width: 100,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
    },
    buttonTextDeactive: {
      color: ffColors.ffDeadButtonText,
      fontSize: 16,
      fontWeight: "bold",
    },
    buttonContent: {
      alignItems: "flex-end",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      paddingRight: 20,
    },
    errorPage: {
      width: "100%",
      paddingTop: 50,
      alignItems: "center",
    },
    errorMessage: {
      fontSize: 24,
      fontWeight: "bold",
      paddingHorizontal: 8,
      margin: 10,
      color: "red",
    },
    starContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
    },
    ratingText: {
      marginLeft: 5,
      fontSize: 16,
      color: ffColors.ffBody,
    },
    reviewContainer: {
      margin: 20,
    },
    reviewInput: {
      color: ffColors.ffBody,
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      width: '100%',
      minHeight: 100,
      borderColor: ffColors.ffEdge,
      fontSize: 14,
      textAlignVertical: 'top', // Ensures text starts at the top
    },
    reviewButtonsContainer: {
      flexDirection: "row",
      gap: 5,
      marginTop: 10,
    },
    buttonAndTextContainer: {
      flexDirection: "row",
      alignItems: "center", // Aligns text and button vertically
      gap: 5, // Adds space between the text and button
    },
    reviewsContainer: {
      maxHeight: 400,
      padding: 10,
    },
    reviewsSummary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: ffColors.ffEdge,
      marginBottom: 15,
    },
    reviewsCount: {
      marginLeft: 10,
      fontSize: 16,
      color: ffColors.ffBody,
    },
    reviewItem: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: ffColors.ffBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: ffColors.ffEdge,
    },
    reviewHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      flexWrap: "wrap",
      gap: 8,
    },
    reviewUsername: {
      fontWeight: "bold",
      fontSize: 16,
      color: ffColors.ffHeading,
    },
    reviewDate: {
      fontSize: 14,
      color: ffColors.ffBody,
    },
    reviewText: {
      fontSize: 14,
      color: ffColors.ffBody,
      lineHeight: 20,
    },
    sortingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    sortingLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: ffColors.ffHeading,
      marginRight: 10,
    },
    sortButton: {
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: ffColors.ffEdge,
      marginRight: 5,
    },
    sortButtonActive: {
      backgroundColor: ffColors.ffGreenL,
    },
    sortButtonText: {
      fontSize: 14,
      color: ffColors.ffText,
    },
  });

  const popularCardsStyles = StyleSheet.create({
    scrollCards: {
      display: 'flex',
      width: '100%',
      padding: 5
    },
    container: {
      display: 'flex',
      marginStart: 10,
      marginEnd: 10,
    },
    card: {
      backgroundColor: ffColors.ffCard,
      borderRadius: 5,
      padding: 20,
      width: 200,
      elevation: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    cardImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
  });

  const confirmModalStyles = {
    overlay: {
      position: 'fixed' as 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: ffColors.ffCard,
      padding: '24px',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '400px',
      textAlign: 'center' as 'center',
    },
    title: {
      margin: '0 0 16px',
      color: ffColors.ffHeading,
    },
    message: {
      margin: '0 0 24px',
      color: ffColors.ffBody,
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px',
    },
    cancelButton: {
      padding: '8px 16px',
      backgroundColor: ffColors.ffDeadButton,
      color: ffColors.ffActiveButtonText,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    confirmButton: {
      padding: '8px 16px',
      backgroundColor: ffColors.ffBlueD,
      color: ffColors.ffActiveButtonText,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  const pastOrderPageStyles = {
    orderCard: {
      backgroundColor: ffColors.ffCard,
      padding: 15,
      marginBottom: 15,
      borderRadius: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
  };
  
  const dealsPageStyles = {
    dealsCard: {
      backgroundColor: ffColors.ffCard,
      padding: 20,
      borderRadius: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      maxWidth: 600,
      margin: '0 auto'
    },
    dealItem: {
      marginBottom: 20,
      padding: 15,
      borderBottom: `1px solid ${ffColors.ffEdge}`
    }
  };

  const scrollableStyle: React.CSSProperties = {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '100vh',
    scrollbarColor: `${ffColors.ffScrollbarThumb} ${ffColors.ffScrollbarTrack}`,
  };

  const scrollableStyleX: React.CSSProperties = {
    overflowX: 'auto',
    overflowY: 'hidden',
    maxWidth: '100vw',
    scrollbarColor: `${ffColors.ffScrollbarThumb} ${ffColors.ffScrollbarTrack}`,
  };

  const scrollableStyleHidden: React.CSSProperties = {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '100vh',
    scrollbarWidth: 'none',
  };

  return {
    ffColors,
    coreStyles,
    buttonStyles,
    popStyles,
    coreForm,
    loginStyles,
    coreBannerStyles,
    coreDrawerStyles,
    chatSupportStyles,
    accountStyles,
    accountLinkedAPIsStyles,
    searchPageStyles,
    searchCardsStyles,
    popularCardsStyles,
    confirmModalStyles,
    pastOrderPageStyles,
    dealsPageStyles,
    scrollableStyle,
    scrollableStyleX,
    scrollableStyleHidden,
  }
}
