import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

import {isCurrentDataValidAC, isFetchingAC, setUserDataAC} from "../../store/action";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {ValidationForm} from "../../components/ValidationForm";

import {Button} from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import appStyles from '../../App.module.css'


export const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    let [isTestUserShowed, setIsTestUserShowed] = useState<boolean>(false)

    useEffect(() => {
        dispatch(isCurrentDataValidAC(true))
    }, [])

    const setAuthData = (email: string, password: string) => {
        dispatch(isFetchingAC(true))
        dispatch(isCurrentDataValidAC(true))
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(isFetchingAC(false))
                dispatch(isCurrentDataValidAC(true))
                dispatch(setUserDataAC(res.user.uid, res.user.email))
                navigate('/')
            })
            .catch(() => {
                dispatch(isFetchingAC(false))
                dispatch(isCurrentDataValidAC(false))
            })
    }

    const wrongLoginDataWarnings = () => {
        return (
            <ul className={appStyles.redText}>
                <ReportIcon/> Make sure that:
                <li>password and email are valid</li>
                <li>user is registered</li>
            </ul>
        )
    }

    const testUserShow = () => {
        isTestUserShowed ? setIsTestUserShowed(false) : setIsTestUserShowed(true)
    }

    return (
        <div className={`${appStyles.container} ${appStyles.flexColumn}`}>

            <h2>Login Page</h2>

            <ValidationForm
                onClick={setAuthData}
                btnTitle='login'
                wrongLoginDataWarning={wrongLoginDataWarnings}/>

            <p>
                Don`t have an account?
                <Link className={appStyles.linkMargin} to={'/register'}>
                    register
                </Link>
            </p>
            <Button
                onClick={testUserShow}
                variant={'outlined'}>
                Test user data
                {isTestUserShowed ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </Button>
            {isTestUserShowed &&
                <>
                    <span>user: test@user.com</span>
                    <span>password: 123456</span>
                </>}

        </div>
    )
}
