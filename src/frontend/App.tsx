import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//shrey addition
import CoreBanner from './screens/CoreComponents/CoreBanner.tsx';
import PopularCards from './screens/HomeComponents/PopularCards.tsx';
//end of shrey addition

//screens
import Example from './screens/UserComponents/Example.tsx'
import Login from './screens/UserComponents/Login.tsx'
import RestPage from './screens/RestPageComponents/RestPage.tsx';
import SettingsNav from './screens/SettingsPages/SettingsNavComponents/SettingsNav.tsx';
import Home from './screens/HomeComponents/Home.tsx';
import SuggPage from "./screens/SettingsPages/SupportPages/SuggPage.tsx";
import RepBugPage from "./screens/SettingsPages/SupportPages/RepBugPage.tsx";
import AccountPage from "./screens/SettingsPages/AccountComponents/Account.tsx";
import SearchPage from './screens/SearchComponents/SearchPage.tsx';
import FAQPage from './screens/FAQComponents/FAQPage.tsx';
import Signup from './screens/UserComponents/SignUp.tsx';
/*
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Restaurant" element={<RestPage />}/>
        <Route path="/SettingsNavigation" element={<SettingsNav />}/>
        <Route path="/AccountPage" element={<AccountPage />}/>
        <Route path="/SuggestionPage" element={<SuggPage />}/>
        <Route path="/ReportBugPage" element={<RepBugPage />}/>
        <Route path="/Search" element={<SearchPage />}/>
        <Route path="/FAQPage" element={<FAQPage />}/>
      </Routes>
    </Router>
    
  );
}
*/

function App(): JSX.Element {
  const [searchResults, setSearchResults] = useState<any[]>([]);  // State for search results

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route 
          path="/" 
          element={
            <Home 
              setSearchResults={setSearchResults} 
              restaurants={searchResults.length > 0 ? searchResults : []} 
            />
          }
        />

        {/* Other Routes */}
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/restaurant/:id" element={<RestPage />} />
        <Route path="/SettingsNavigation" element={<SettingsNav />} />
        <Route path="/AccountPage" element={<AccountPage />} />
        <Route path="/SuggestionPage" element={<SuggPage />} />
        <Route path="/ReportBugPage" element={<RepBugPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/FAQPage" element={<FAQPage />} />
      </Routes>
    </Router>
  );
}

export default App;