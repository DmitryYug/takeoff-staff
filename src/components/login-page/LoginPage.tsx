import React from 'react'
import {Form} from "../Form";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {setUserDataAC} from "../../store/app-reducer";
import {useAppDispatch} from "../../hooks/redux-hooks";
import appStyles from '../../App.module.css'


export const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const setAuthData = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(setUserDataAC(res.user.uid, res.user.email))
                navigate('/')
            })
            .catch(console.error)
    }

    return (
        <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
            <h2>Login Page</h2>
            <Form
                btnTitle={'login'}
                handleClick={setAuthData}
            />
            <p>
                Don`t have an account?
                <Link className={appStyles.linkMargin} to={'/register'}>
                    register
                </Link>
            </p>
        </div>
    )
}
