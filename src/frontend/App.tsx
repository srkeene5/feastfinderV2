import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";

//Authenticator
import { AuthContextProvider } from './screens/UserComponents/Authorizer.tsx';
import { CartContextProvider } from './screens/RestPageComponents/CartContext.tsx';


//screens
import FeastRoutes from './screens/Routes/FeastRoutes.tsx'; 

function App(): JSX.Element {

  return (
    
    
      <AuthContextProvider>
      <CartContextProvider>
      <Router>
        <FeastRoutes />
        </Router>
        </CartContextProvider>
      </AuthContextProvider>
   
    
  );
}

export default App;