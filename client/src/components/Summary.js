import { Chip, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
}))
const Summary = ({ val : [ values, setValues]}) => {
    const classes = useStyles()
    return (
        <div>
            <Typography className={classes.root}>Name : {values.name}</Typography>
            <Typography className={classes.root}>Email : {values.email}</Typography>
            <Typography className={classes.root}>Gender : {values.gender}</Typography>
            <Typography className={classes.root}>Date of Birth : {new Date(values.dob).toDateString()}</Typography>
            <Typography className={classes.root}>Location : {values.location}</Typography>
            <Typography className={classes.root}>Team : {values.team}</Typography>
            
            <Typography className={classes.root}>
                Interests : { values.interests}
            </Typography>
            <Typography className={classes.root}>
                About : { values.about}
            </Typography>
            <Typography className={classes.root}>
                Sports : {values.sports.map(sport => <Chip size="small" label={sport.name} />)}
            </Typography>

        </div>
    )
}

export default Summary
