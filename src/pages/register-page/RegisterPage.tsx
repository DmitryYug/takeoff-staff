import React, {useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

import {isCurrentDataValidAC, isFetchingAC, setUserDataAC} from "../../store/action";
import {useAppDispatch} from '../../hooks/redux-hooks';
import {ValidationForm} from "../../components/ValidationForm";

import ReportIcon from "@mui/icons-material/Report";
import appStyles from '../../App.module.css'


export const RegisterPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isCurrentDataValidAC(true))
    }, [])

    const setNewUserData = (email: string, password: string) => {
        dispatch(isFetchingAC(true))
        dispatch(isCurrentDataValidAC(true))
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
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
            <div className={appStyles.redText}>
                <ul>
                    <ReportIcon/> Make sure that:
                    <li>password more than 6 symbols</li>
                    <li>email is correct</li>
                    <li>user is not already registered</li>
                </ul>
            </div>
        )
    }

    return (
        <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
            <h2>Register new user</h2>
            <ValidationForm
                onClick={setNewUserData}
                btnTitle='register'
                wrongLoginDataWarning={wrongLoginDataWarnings}/>
            <p>
                Already have an account?
                <Link className={appStyles.linkMargin} to={'/login'}>
                    login
                </Link>
            </p>
        </div>
    )
}
