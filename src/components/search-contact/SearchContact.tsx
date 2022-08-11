import React, {ChangeEvent, useEffect, useState} from "react";
import {TextField} from "@mui/material";
import styles from '../contacts-page/ContactsPage.module.css'

export type SearchContactPropsType = {
    value: string,
    labelText?: string,
    onChangeCallback: (currentValue: string) => void
}

export const SearchContact: React.FC<SearchContactPropsType> = (
    {value, labelText, onChangeCallback}
) => {

    let [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (value) {
            setError(false)
        }
    }, [value])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeCallback(e.currentTarget.value)
    }

    return (
        <TextField
            className={styles.searchStyles}
            value={value}
            label={labelText}
            error={error}
            onChange={onChangeHandler}
            id="outlined-basic"
            variant="outlined"
        />
    )
}