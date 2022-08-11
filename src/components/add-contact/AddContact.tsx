import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from '../contacts-page/ContactsPage.module.css'
import appStyles from '../../App.module.css'



type AddContactProps = {
    addItem: (newEmail: string, newName: string, newPhone: string) => void
}

export const AddContact: React.FC<AddContactProps> = ({addItem}) => {

    let [newEmail, setNewEmail] = useState('')
    let [newName, setNewName] = useState('')
    let [newPhone, setNewPhone] = useState('')
    let [nameError, setNameError] = useState<boolean>(false)
    let [phoneError, setPhoneError] = useState<boolean>(false)
    let [emailError, setEmailError] = useState<boolean>(false)

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailError(false)
        setNewEmail(e.currentTarget.value)
    }
    const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameError(false)
        setNewName(e.currentTarget.value)
    }
    const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneError(false)
        setNewPhone(e.currentTarget.value)
    }

    const addItemValidation = () => {
        if (newEmail.trim() === '') {
            setEmailError(true)
            return
        }
        if (newName.trim() === '') {
            setNameError(true)
            return
        }
        if (newPhone.trim() === '') {
            setPhoneError(true)
            return
        } else {
            setEmailError(false)
            setNameError(false)
            setPhoneError(false)
        }
        addItem(newEmail, newPhone, newName)
        setNewEmail('')
        setNewName('')
        setNewPhone('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            addItemValidation()
        }
    }
    const addItemOnclickHandler = () => {
        addItemValidation()
    }


    return (
        <div
            // style={{margin: '10px 0 10px 0'}}
        >
            <h3>Add new contact</h3>
            <form
                className={styles.addForm}
                onKeyPress={onKeyPressHandler}>
                <TextField
                    error={nameError}
                    label='name'
                    id={nameError ? "outlined-error" : "outlined"}
                    value={newName}
                    onChange={nameHandler}
                    size='small'/>
                <TextField
                    type={'tel'}
                    error={phoneError}
                    label='phone number'
                    id={phoneError ? "outlined-error" : "outlined"}
                    value={newPhone}
                    onChange={phoneHandler}
                    size='small'/>
                <TextField
                    error={emailError}
                    label='email'
                    id={emailError ? "outlined-error" : "outlined"}
                    value={newEmail}
                    onChange={emailHandler}
                    size='small'/>
                <Button
                    className={styles.addContactBtn}
                    variant="contained"
                    onClick={addItemOnclickHandler}>
                    <AddIcon fontSize='small'/>
                </Button>
            <div>
                {
                    (nameError || phoneError || emailError)
                        ? <div className={appStyles.redText}>
                            Some input is empty
                         </div>
                        : null
                }
            </div>
            </form>
        </div>
    )
}

