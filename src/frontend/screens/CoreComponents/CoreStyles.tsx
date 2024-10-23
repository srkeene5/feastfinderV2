import { StyleSheet } from "react-native";

export const ffColors = {
  ffRedL: '#b51536',
  ffGreenL: '#079373',
  ffGreyL: '#8c8c9c',
  ffRedD: '#73142e',
  ffGreenD: '#184941',
  ffGreyD: '#41545b',
}

export const coreStyles = StyleSheet.create({
  darkMText: {
    color: '#FFFFFF'
  },
  lightMText: {
    color: '#000000'
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    margin: 10,
  },
})

export const buttonStyles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
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

export const popStyles = StyleSheet.create({
  popup: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  popupText: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-evenly',
  },
  titleText: {
    margin: 10,
    marginRight: 140,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export const form = StyleSheet.create({
  form: {
    margin: 30,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
  },
})

const coreStyles = {
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: '#ffffff',
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
    color: '#fb923c',
  },
  subtitle: {
    marginTop: '1.5rem',
    textAlign: 'center' as 'center',
    fontSize: '1.875rem',
    fontWeight: 'bold' as 'bold',
    color: '#111827',
  },
  content: {
    marginTop: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '40rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem 1rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
  },
  faqItem: {
    marginBottom: '1.5rem',
  },
  question: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#111827',
  },
  answer: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
};

export default coreStyles;