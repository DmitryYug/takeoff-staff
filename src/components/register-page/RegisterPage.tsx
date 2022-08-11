import React, {useEffect} from 'react'
import {Form} from "../Form";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {isCurrentDataValidAC, setUserDataAC} from "../../store/app-reducer";
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import appStyles from '../../App.module.css'


export const RegisterPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isCurrentDataValid = useAppSelector(state => state.appReducer.isCurrentDataValid)

    useEffect(() => {
        dispatch(isCurrentDataValidAC(true))
    }, [])

    const setNewUserData = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(setUserDataAC(res.user.uid, res.user.email))
                navigate('/')
            })
            .catch(() => dispatch(isCurrentDataValidAC(false)))
    }

    return (
        <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
            <h2>Register new user</h2>
            <Form
                btnTitle={'register'}
                handleClick={setNewUserData}
            />
            {
                !isCurrentDataValid
                    ? <div className={appStyles.redText}>
                        <ul> ! Make sure that:
                            <li>password more than 6 symbols</li>
                            <li>email is correct</li>
                            <li>user is not already registered</li>
                        </ul>
                    </div>
                    : null
            }
            <p>
                Already have an account?
                <Link className={appStyles.linkMargin} to={'/login'}>
                    login
                </Link>
            </p>
        </div>
    )
}
