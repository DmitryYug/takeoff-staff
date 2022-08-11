import React from 'react'
import {ContactItem, editeEmailAc, editeNameAc, editePhoneAc, removeContactAc} from "../../store/app-reducer";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditableSpan from "./EditableSpan";
import {useAppDispatch} from "../../hooks/redux-hooks";
import styles from './ContactsPage.module.css'


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
            className={styles.cardMargin}
            elevation={15}>
            <Card className={styles.cardItem}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        <EditableSpan
                            propId={'name'}
                            title={contact.name}
                            onChange={editeName}
                        />

                    </Typography>
                    <Typography color="text.secondary">
                        <EditableSpan
                            propId={'phone'}
                            title={contact.phone}
                            onChange={editePhone}
                        />
                    </Typography>
                    <Typography color="text.secondary">
                        <EditableSpan
                            propId={'email'}
                            title={contact.email}
                            onChange={editeEmail}
                        />
                    </Typography>
                </CardContent>
                <CardActions>
                    <DeleteIcon/>
                    <Button
                        onClick={removeHandler}
                        size="small"
                    >
                        Remove contact
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}

