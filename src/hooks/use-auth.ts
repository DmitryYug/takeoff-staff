import {useAppSelector} from "./redux-hooks";


export function useAuth () {
    const {id, email} = useAppSelector(state => state.appReducer.authData)
    return {
        isAuth: !!email,
        email,
        id
    }
}