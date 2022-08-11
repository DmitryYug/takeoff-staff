import React, {useEffect} from 'react'
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import {addContactAC, ContactItem, searchContactAC, setContactsAc} from "../../store/app-reducer";
import {AppApi} from "../../api/app-api";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {ContactsItem} from "./ContactItem";
import {AddContact} from '../add-contact/AddContact';
import {SearchContact} from "../search-contact/SearchContact";
import appStyles from '../../App.module.css'
import styles from './ContactsPage.module.css'


export const ContactsPage = () => {

    let dispatch = useAppDispatch()
    const {isAuth} = useAuth()

    useEffect(() => {
        AppApi.getContacts()
            .then(res => dispatch(setContactsAc(res)))
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

    return (
        isAuth
            ?
            <div className={appStyles.container}>
                <div className={appStyles.flexColumn}>
                    <SearchContact
                        value={searchValue}
                        labelText='search by name'
                        onChangeCallback={searchCb}
                    />
                    <AddContact addItem={addContact}/>
                </div>
                <div className={appStyles.container}>
                    {filteredContacts.map(c => <ContactsItem key={c.id} contact={c}/>)}
                </div>
            </div>
            : <Navigate to={'/login'} replace/>
    )

}