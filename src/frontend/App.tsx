import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import 'leaflet/dist/leaflet.css';
//Authenticator
import { AuthContextProvider } from './screens/UserComponents/Authorizer.tsx';
import { CartContextProvider } from './screens/RestPageComponents/CartContext.tsx';


//screens
import FeastRoutes from './screens/Routes/FeastRoutes.tsx'; 
import { DarkModeProvider } from './screens/CoreComponents/DarkModeContext.tsx';

function App(): JSX.Element {

  return (
    
    
      <AuthContextProvider>
        <CartContextProvider>
          <DarkModeProvider>
            <Router>
              <FeastRoutes />
            </Router>
          </DarkModeProvider>
        </CartContextProvider>
      </AuthContextProvider>
   
    
  );
}

export default App;