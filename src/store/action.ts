import {Dispatch} from "redux";
import {AppApi} from "../api/app-api";
import {ContactItem} from "./app-reducer";

export const setUserDataAC = (id: string, email: string | null) => ({
    type: 'SET-USER-DATA', id, email
} as const)
export const removeUserDataAC = () => ({
    type: 'REMOVE-USER-DATA',
} as const)
export const setContactsAc = (contacts: ContactItem[]) => ({
    type: 'SET-CONTACTS', contacts
} as const)
export const editeNameAc = (contactId: string, newName: string) => ({
    type: 'EDIT-NAME', contactId, newName
} as const)
export const editePhoneAc = (contactId: string, newPhone: string) => ({
    type: 'EDIT-PHONE', contactId, newPhone
} as const)
export const editeEmailAc = (contactId: string, newEmail: string) => ({
    type: 'EDIT-EMAIL', contactId, newEmail
} as const)
export const addContactAC = (newEmail: string, newName: string, newPhone: string) => ({
    type: 'ADD-CONTACT', newEmail, newName, newPhone
} as const)
export const searchContactAC = (value: string) => ({
    type: 'SEARCH-CONTACT', value
} as const)
export const removeContactAc = (contactId: string) => ({
    type: 'REMOVE-CONTACT', contactId
} as const)
export const isCurrentDataValidAC = (value: boolean) => ({
    type: 'IS-CURRENT-DATA-VALID', value
} as const)
export const isFetchingAC = (value: boolean) => ({
    type: 'IS-FETCHING', value
} as const)


export const getContactsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(isFetchingAC(true))
        AppApi.getContacts().then(res => {
            dispatch(isFetchingAC(false))
            dispatch(setContactsAc(res))
        })
    }
}