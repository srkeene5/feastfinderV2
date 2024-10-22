// coreStyles.tsx
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
