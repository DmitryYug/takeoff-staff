import React, {useEffect} from 'react'
import {Form} from "../Form";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {isCurrentDataValidAC, setUserDataAC} from "../../store/app-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import appStyles from '../../App.module.css'


export const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isCurrentDataValid = useAppSelector(state => state.appReducer.isCurrentDataValid)

    useEffect(() => {
        dispatch(isCurrentDataValidAC(true))
    }, [])

    const setAuthData = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(setUserDataAC(res.user.uid, res.user.email))
                navigate('/')
            })
            .catch(() => {dispatch(isCurrentDataValidAC(false))})
    }

    return (
        <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
            <h2>Login Page</h2>
            <Form
                btnTitle={'login'}
                handleClick={setAuthData}
            />
            {
                !isCurrentDataValid
                    ? <ul className={appStyles.redText}>
                        ! Make sure that:
                        <li>password and email are valid</li>
                        <li>user is registered</li>
                    </ul>
                    : null
            }
            <p>
                Don`t have an account?
                <Link className={appStyles.linkMargin} to={'/register'}>
                    register
                </Link>
            </p>
        </div>
    )
}
