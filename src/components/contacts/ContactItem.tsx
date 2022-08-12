import React from 'react'

import {editeEmailAc, editeNameAc, editePhoneAc, removeContactAc} from "../../store/action";
import {useAppDispatch} from "../../hooks/redux-hooks";
import EditableSpan from "./EditableSpan";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../pages/contacts-page/ContactsPage.module.css'

import {ContactItem} from "../../store/app-reducer";


type ContactItemPropsType = {
    contact: ContactItem
}

export const ContactsItem: React.FC<ContactItemPropsType> = ({contact}) => {

    let dispatch = useAppDispatch()

    const editeName = (newName: string) => {
        dispatch(editeNameAc(contact.id, newName))
    }
    const editePhone = (newPhone: string) => {
        dispatch(editePhoneAc(contact.id, newPhone))
    }
    const editeEmail = (newEmail: string) => {
        dispatch(editeEmailAc(contact.id, newEmail))
    }
    const removeHandler = () => {
        dispatch(removeContactAc(contact.id))
    }


    return (
        <Paper
            className={`${styles.cardMargin} ${styles.cardItem}`}
            elevation={15}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        <EditableSpan title={contact.name} onChange={editeName}/>
                    </Typography>
                    <Typography color="text.secondary">
                        <EditableSpan title={contact.phone} onChange={editePhone}/>
                    </Typography>
                    <Typography color="text.secondary">
                        <EditableSpan title={contact.email} onChange={editeEmail}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={removeHandler}
                        size="small">
                        <DeleteIcon/>
                        Remove
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}

