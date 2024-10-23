import React from 'react'

//Router

import { Routes, Route} from "react-router-dom";


//screens
import Example from '../UserComponents/Example.tsx'
import Login from '../UserComponents/Login.tsx'
import RestPage from '../RestPageComponents/RestPage.tsx';
import SettingsNav from '../SettingsPages/SettingsNavComponents/SettingsNav.tsx';
import Home from '../HomeComponents/Home.tsx';
import SuggPage from "../SettingsPages/SupportPages/SuggPage.tsx";
import RepBugPage from "../SettingsPages/SupportPages/RepBugPage.tsx";
import AccountPage from "../SettingsPages/AccountComponents/Account.tsx";
import SearchPage from '../SearchComponents/SearchPage.tsx';
import FAQPage from '../FAQComponents/FAQPage.tsx';
import Signup from '../UserComponents/SignUp.tsx';
import FollowUp from '../UserComponents/FollowUp.tsx';
import ChatSupport from '../SettingsPages/ChatComponents/ChatSupport.tsx';

import useRequireAuth from '../UserComponents/RequireAuth.tsx';

export default function FeastRoutes() {

    useRequireAuth();

    return(
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />}/>
          <Route path="/account/followup" element={<FollowUp />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Restaurant" element={<RestPage />}/>
          <Route path="/SettingsNavigation" element={<SettingsNav />}/>
          <Route path="/AccountPage" element={<AccountPage />}/>
          <Route path="/SuggestionPage" element={<SuggPage />}/>
          <Route path="/ReportBugPage" element={<RepBugPage />}/>
          <Route path="/Search" element={<SearchPage />}/>
          <Route path="/FAQPage" element={<FAQPage />}/>
        </Routes>
    )
}