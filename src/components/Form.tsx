import React, {ChangeEvent, useState} from 'react'
import {Button, TextField} from "@mui/material";
import appStyles from '../App.module.css'


type FormPropsType = {
    btnTitle: string
    handleClick: (email: string, pass: string) => void
}

export const Form: React.FC<FormPropsType> = ({btnTitle, handleClick}) => {

    let [email, setEmail] = useState<string>('')
    let [pass, setPass] = useState<string>('')

    const onClickHandler = () => {
        handleClick(email, pass)
    }
    const emailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const passOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPass(e.currentTarget.value)
    }

    return (
        <>
            <form className={appStyles.flexColumn}>
                <TextField
                    className={appStyles.formInput}
                    margin="dense"
                    id="standard-basic"
                    placeholder="email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={emailOnChange}
                />
                <TextField
                    className={appStyles.formInput}
                    margin="dense"
                    id="standard-basic"
                    placeholder="password"
                    variant="outlined"
                    type="password"
                    value={pass}
                    onChange={passOnChange}
                />
            </form>
            <Button
                className={appStyles.formBtn}
                variant="contained"
                onClick={onClickHandler}
            >
                {btnTitle}
            </Button>
        </>
    )
}