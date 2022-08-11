import {AppDispatch} from "./redux-store";
import {AppApi} from "../api/app-api";
import {EditableFieldType} from "../components/contacts-page/EditableSpan";
import {v1} from "uuid";

type AppReducerType =
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof removeUserDataAC>
    | ReturnType<typeof setContactsAc>
    | ReturnType<typeof editeNameAc>
    | ReturnType<typeof editePhoneAc>
    | ReturnType<typeof editeEmailAc>
    | ReturnType<typeof addContactAC>
    | ReturnType<typeof searchContactAC>
    | ReturnType<typeof removeContactAc>

export type ContactItem = {
    id: string,
    name: string,
    phone: string,
    email: string
}
export type AuthDataType = {
    id: string | null
    email: string | null
}
export type StateType = {
    authData: AuthDataType,
    contacts: ContactItem[],
    searchValue: string
}
const initialState: StateType = {
    authData: {
        id: '',
        email: ''
    },
    contacts: [],
    searchValue: ''
}


export const appReducer = (state = initialState, action: AppReducerType): StateType => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {
                ...state,
                authData: {
                    id: action.id,
                    email: action.email
                }
            }
        case "REMOVE-USER-DATA":
            return {
                ...state,
                authData: {
                    id: null,
                    email: null
                }
            }
        case "SET-CONTACTS":
            return {
                ...state,
                contacts: action.contacts
            }
        case "EDIT-EMAIL":
            return {
                ...state,
                contacts: state.contacts.map(c => c.id === action.contactId
                    ? {...c, email: action.newEmail}
                    : c
                )
            }
        case "EDIT-NAME":
            return {
                ...state,
                contacts: state.contacts.map(c => c.id === action.contactId
                    ? {...c, name: action.newName}
                    : c
                )
            }
        case "EDIT-PHONE":
            return {
                ...state,
                contacts: state.contacts.map(c => c.id === action.contactId
                    ? {...c, phone: action.newPhone}
                    : c
                )
            }
        case "ADD-CONTACT":
            return {
                ...state,
                contacts: [
                    {id: v1(), name: action.newName, phone: action.newPhone, email: action.newEmail},
                    ...state.contacts
                ]
            }
        case "REMOVE-CONTACT":
            return {
                ...state,
                contacts: [...state.contacts.filter(c => c.id !== action.contactId)]
            }
        case "SEARCH-CONTACT":
            return {
                ...state,
                searchValue: action.value,
            }
        default:
            return state
    }
}

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



