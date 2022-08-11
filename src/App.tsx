import React from 'react';
import './App.module.css';
import {LoginPage} from "./components/login-page/LoginPage";
import {Route, Routes} from 'react-router-dom';
import {ContactsPage} from "./components/contacts-page/ContactsPage";
import {RegisterPage} from "./components/register-page/RegisterPage";
import {WelcomePage} from "./components/welcome-page/WelcomePage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<WelcomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/contacts' element={<ContactsPage/>}/>
        </Routes>
    );

}

export default App;
