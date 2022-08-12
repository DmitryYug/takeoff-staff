import React from 'react'

import {Form} from "./Form";
import {useAppSelector} from '../hooks/redux-hooks';

import appStyles from '../App.module.css'
import {LinearProgress} from "@mui/material";

type ValidationFormPropsType = {
    btnTitle: string
    onClick: (email: string, password: string) => void
    wrongLoginDataWarning: () => void
}

export const ValidationForm: React.FC<ValidationFormPropsType> = (
    {btnTitle, onClick, wrongLoginDataWarning}
) => {

    const isCurrentDataValid = useAppSelector(state => state.appReducer.isCurrentDataValid)
    const isFetching = useAppSelector(state => state.appReducer.isFetching)

    const onClickHandler = (email: string, password: string) => {
        onClick(email, password)
    }

    return (
        <>
            <Form btnTitle={btnTitle} handleClick={onClickHandler}/>

            {isFetching && <LinearProgress className={appStyles.width30}/>}
            {!isCurrentDataValid && wrongLoginDataWarning()}

        </>
    )
}
