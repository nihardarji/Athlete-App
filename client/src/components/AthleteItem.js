import React, { useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core'
import AddAthlete from './AddAthlete'
import { Edit } from '@material-ui/icons'
import { blue } from '@material-ui/core/colors'
import { setSportPlayer } from '../actions/athleteActions'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10
    },
    color:{
        border: '1px solid',
        margin: 10
    },
    content: {
        cursor: 'pointer'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: blue[500],
    },
    fab : {
        marginTop: 2,
        marginRight: 2
    }
}))

const AthleteItem = ({ athlete, ath, setSportPlayer }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [editType, setEditType] = useState(true)
    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true)
        setSportPlayer(ath)
    };

    const handleClose = () => {
        setOpen(false);
    }

    const onCardClick = (e) => {
        e.preventDefault()
        setSportPlayer(ath)
    }
    return (
        <Card className={athlete && ath._id === athlete._id ? classes.color : classes.root} variant="outlined">
            <CardHeader
                className={classes.content}
                onClick={onCardClick}
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {ath.name.charAt(0).toUpperCase()}
                </Avatar>
                }
                action={
                    <IconButton onClick={handleClickOpen} aria-label="settings">
                        <Edit />
                    </IconButton>
                }
                title= {ath.name}
                subheader= {ath.email}
            />
            <CardContent className={classes.content} onClick={onCardClick} >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Gender: {ath.gender}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                    Date of Birth: {new Date(ath.dob).toDateString()}
                </Typography>
            </CardContent>

            <AddAthlete open={open} handleClose={handleClose} editType={editType} athlete={ath}  />
        </Card>
    )
}

const mapStateToProps = state => ({
    athlete: state.athletes.athlete
})
export default connect(mapStateToProps, { setSportPlayer })(AthleteItem)
