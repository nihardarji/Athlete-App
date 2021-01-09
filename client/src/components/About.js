import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}))
const About = ({ val: [values, setValues]}) => {
    const classes = useStyles()

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const onFileChange = event => {
        console.log('fileee', event.target.files[0])
        setValues({...values, profileImage: event.target.files[0]})
    }
    return (
        <div>
            <TextField className={classes.margin} id="location" value={values.location} onChange={handleChange('location')} label="Location" fullWidth />
            <TextField className={classes.margin} id="team" value={values.team} onChange={handleChange('team')} label="Team" fullWidth />
            <TextField className={classes.margin} id="interests" label="Interests" helperText="Enter comma(,) seperated" fullWidth value={values.interests} onChange={handleChange('interests')} />
            <TextField
                className={classes.margin}
                id="about"
                label="About"
                multiline
                rows={4}
                fullWidth
                value={values.about} onChange={handleChange('about')}
            />
        </div>
    )
}

export default About
