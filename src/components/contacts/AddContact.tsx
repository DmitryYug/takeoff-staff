import React, {ChangeEvent, useState} from "react";

import {Button, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styles from '../../pages/contacts-page/ContactsPage.module.css'
import appStyles from '../../App.module.css'

type AddContactProps = {
    addItem: (newEmail: string, newName: string, newPhone: string) => void
}

export const AddContact: React.FC<AddContactProps> = ({addItem}) => {

    let [modalOpen, setModalOpen] = React.useState(false)
    let [newEmail, setNewEmail] = useState('')
    let [newName, setNewName] = useState('')
    let [newPhone, setNewPhone] = useState('')
    let [nameError, setNameError] = useState<boolean>(false)
    let [phoneError, setPhoneError] = useState<boolean>(false)
    let [emailError, setEmailError] = useState<boolean>(false)

    const openModalHandler = () => {
        setModalOpen(true)
    }

    const closeModalHandler = () => {
        setModalOpen(false)
    }

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
        }
        if (newName.trim() === '') {
            setNameError(true)
        }
        if (newPhone.trim() === '') {
            setPhoneError(true)
        }
        if (newEmail && newPhone && newName) {
            addItem(newEmail, newName, newPhone)
            setModalOpen(false)
            setNewPhone('')
            setNewName('')
            setNewEmail('')
        }
    }

    const addItemOnKeyPressHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            addItemValidation()
        }
    }

    const addItemOnclickHandler = () => {
        addItemValidation()
    }

    const addContactHelperText = () => {
        return (
        (nameError || phoneError || emailError)
            && <div className={appStyles.redText}>
                <p>{nameError && 'Name is empty'}</p>
                <p>{phoneError && 'Phone is empty'}</p>
                <p>{emailError && 'Email is empty'}</p>
            </div>
        )
    }

    return (
        <div>
            <Button
                className={styles.addContactBtn}
                variant='contained'
                onClick={openModalHandler}>
                <PersonAddIcon sx={marginRight}/>
                Add new contact
            </Button>
            <Modal
                open={modalOpen}
                onClose={closeModalHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <form
                        className={styles.addForm}
                        onKeyPress={addItemOnKeyPressHandler}>
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
                            disabled={nameError || phoneError || emailError}
                            className={styles.addContactModalBtn}
                            variant="contained"
                            onClick={addItemOnclickHandler}>
                            Add new contact
                        </Button>
                        <div>
                            {addContactHelperText()}
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const marginRight = {marginRight: '20px'}
