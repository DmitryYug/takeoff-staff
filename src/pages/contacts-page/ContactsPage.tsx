import React, {useEffect} from 'react'
import {Navigate} from "react-router-dom";

import {addContactAC, getContactsTC, searchContactAC} from "../../store/action";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";

import {ContactsItem} from "../../components/contacts/ContactItem";
import {AddContact} from '../../components/contacts/AddContact';
import {SearchContact} from "../../components/contacts/SearchContact";

import {ContactItem} from "../../store/app-reducer";

import appStyles from '../../App.module.css'
import {CircularProgress} from "@mui/material";



export const ContactsPage = () => {

    let dispatch = useAppDispatch()
    const {isAuth} = useAuth()
    const isFetching = useAppSelector(state => state.appReducer.isFetching)

    useEffect(() => {
        dispatch(getContactsTC())
    }, [])

    const addContact = (newEmail: string, newName: string, newPhone: string) => {
        dispatch(addContactAC(newEmail, newName, newPhone))
    }

    const searchCb = (value: string) => {
        dispatch(searchContactAC(value))
    }

    const contacts: ContactItem[] = useAppSelector(state => state.appReducer.contacts)
    const searchValue: string = useAppSelector(state => state.appReducer.searchValue)

    let filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchValue.toLowerCase()))

    return isAuth
        ? <div className={`${appStyles.container} ${appStyles.flexColumn}`}>
            <div className={`${appStyles.flexColumn} ${appStyles.width50}`}>
                <SearchContact
                    value={searchValue}
                    labelText='search by name'
                    onChangeCallback={searchCb}
                />
                <AddContact addItem={addContact}/>
            </div>
            <div className={appStyles.container}>
                {isFetching
                    ? <CircularProgress/>
                    : filteredContacts.map(c => <ContactsItem key={c.id} contact={c}/>)}
            </div>
        </div>
        : <Navigate to={'/login'} replace/>


}