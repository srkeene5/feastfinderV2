import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";

//Authenticator
import { AuthContextProvider } from './screens/UserComponents/Authorizer.tsx';

//screens
import FeastRoutes from './screens/Routes/FeastRoutes.tsx'; 

function App(): JSX.Element {

  return (
    
    <Router>
      <AuthContextProvider>
        <FeastRoutes />
      </AuthContextProvider>
    </Router>
    
  );
}

export default App;