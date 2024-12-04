import { StyleSheet } from "react-native";

export const ffColors = {
  ffBackground: '#f6f6f6',
  ffCard: '#ffffff',
  ffEdge: '#dddddd',
  ffHeading: '#111827',
  ffBody: '#6b7280',
  ffText: '#000000',
  ffRedL: '#b51536',
  ffGreenL: '#079373',
  ffGreyXL: '#cdcdd0',
  ffGreyL: '#8c8c9c',
  ffRedD: '#73142e',
  ffGreenD: '#184941',
  ffGreyD: '#41545b',
  ffBlueL: '#CCCCFF', //new
  ffBlueD: '#6666FF',
  ffPurpleL: '#E0BBE4',
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

export const coreForm = {
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
    marginTop: '0.5rem',
    borderRadius: 20,
    padding: 10,
    border: '1px solid',
    borderColor: ffColors.ffEdge,
  },
  textInputBox: {
    height: 'auto',
    marginTop: '0.5rem',
    borderRadius: 20,
    padding: 10,
    resize: 'none',
    border: '1px solid',
    borderColor: ffColors.ffEdge,
  },
  dropdown: {
    marginTop: '0.5rem',
    borderRadius: 20,
    padding: 10,
    border: '1px solid',
    borderColor: ffColors.ffEdge,
  },
  checkboxContainer: {
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
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
};