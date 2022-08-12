import React from 'react';
import './App.module.css';
import {LoginPage} from "./pages/login-page/LoginPage";
import {Route, Routes} from 'react-router-dom';
import {ContactsPage} from "./pages/contacts-page/ContactsPage";
import {RegisterPage} from "./pages/register-page/RegisterPage";
import {WelcomePage} from "./pages/welcome-page/WelcomePage";

function Navigation() {
    return (
        <Routes>
            <Route path='/' element={<WelcomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/contacts' element={<ContactsPage/>}/>
        </Routes>
    );

}

export default Navigation;
