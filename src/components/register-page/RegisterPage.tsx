import React from 'react'
import {Form} from "../Form";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {setUserDataAC} from "../../store/app-reducer";
import {useAppDispatch} from '../../hooks/redux-hooks';
import appStyles from '../../App.module.css'


export const RegisterPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const setNewUserData = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(setUserDataAC(res.user.uid, res.user.email))
                navigate('/')
            })
            .catch(console.error)
    }

    return (
        <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
            <h2>Register new user</h2>
            <Form
                btnTitle={'register'}
                handleClick={setNewUserData}
            />

            <p>
                Already have an account?
                <Link className={appStyles.linkMargin} to={'/login'}>
                    login
                </Link>
            </p>

        </div>
    )
}
