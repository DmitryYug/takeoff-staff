import {v1} from "uuid";
import {AppApi} from "../api/app-api";
import {Dispatch} from "redux";
import {
    addContactAC, editeEmailAc, editeNameAc, editePhoneAc, isCurrentDataValidAC, isFetchingAC,
    removeContactAc, removeUserDataAC, searchContactAC, setContactsAc, setUserDataAC
} from "./action";


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
    | ReturnType<typeof isCurrentDataValidAC>
    | ReturnType<typeof isFetchingAC>

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
    searchValue: string,
    isCurrentDataValid: boolean,
    isFetching: boolean
}
const initialState: StateType = {
    authData: {
        id: '',
        email: ''
    },
    contacts: [],
    searchValue: '',
    isCurrentDataValid: true,
    isFetching: false
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
        case "IS-CURRENT-DATA-VALID":
            return {
                ...state,
                isCurrentDataValid: action.value
            }
        case "IS-FETCHING":
            return {
                ...state,
                isFetching: action.value
            }
        default:
            return state
    }
}