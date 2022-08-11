import React from 'react'
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import {removeUserDataAC} from "../../store/app-reducer";
import {useAppDispatch} from "../../hooks/redux-hooks";
import appStyles from '../../App.module.css'
import {Button} from "@mui/material";

export const WelcomePage = () => {

    const dispatch = useAppDispatch()
    const {isAuth, email} = useAuth()
    const removeUserHandler = () => {
        dispatch(removeUserDataAC())
    }

    return isAuth
        ? (
            <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
                <h1>Welcome</h1>
                <h3>
                    Now you can go to
                <Link className={appStyles.linkMargin} to={'/contacts'}>contacts page</Link>
                </h3>
                <Button variant="outlined" onClick={removeUserHandler}>log out from {email}</Button>
            </div>
        )
        : (
            <Navigate to={'/login'} replace/>
        )
}
