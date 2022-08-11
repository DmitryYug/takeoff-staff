import React, {ChangeEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type AddContactProps = {
   addItem: (newEmail: string, newName: string, newPhone: string) => void
}

export const AddContact: React.FC<AddContactProps> = ({addItem}) => {

    let [newEmail, setNewEmail] = useState('')
    let [newName, setNewName] = useState('')
    let [newPhone, setNewPhone] = useState('')
    let [error, setError] = useState<boolean>(false)

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewEmail(e.currentTarget.value)
    }
    const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewName(e.currentTarget.value)
    }
    const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewPhone(e.currentTarget.value)
    }


    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         if (newEmail.trim() === '' || newName.trim() === '' || newPhone.trim() === '') {
    //             setError(true)
    //             return
    //         } else {
    //             setError(false)
    //         }
    //
    //         addItem(newItemValue)
    //         setNewItem('')
    //     }
    // }
    const addItemOnclickHandler = () => {
        if (newEmail.trim() === '' || newPhone.trim() === '' || newName.trim() === '') {
            setError(true)
            return
        } else {
            setError(false)
        }
        addItem(newEmail, newPhone, newName)
        setNewEmail('')
        setNewName('')
        setNewPhone('')
    }


    return (
        <div style={{margin: '10px 0 10px 0'}}>
            <h2>Add new contact</h2>
            <TextField
                error={error}
                label='name'
                id={error ? "outlined-error" : "outlined"}
                value={newName}
                onChange={nameHandler}
                size='small'
            />
            <TextField
                error={error}
                label='phone number'
                id={error ? "outlined-error" : "outlined"}
                value={newPhone}
                onChange={phoneHandler}
                size='small'
            />
            <TextField
                error={error}
                label='email'
                id={error ? "outlined-error" : "outlined"}
                value={newEmail}
                onChange={emailHandler}
                size='small'
            />
            <Button onClick={addItemOnclickHandler} variant="contained"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
                <AddIcon fontSize='small'/>
            </Button>
            <div>{error}</div>
        </div>
    )
}

