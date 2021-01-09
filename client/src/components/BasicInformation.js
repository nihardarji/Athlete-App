import React from 'react'
import { Box, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Sports } from '../utils/Sports';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    genderMargin:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
        width: '100%'
    }
}))
const BasicInformation = ({ athlete, val: [values, setValues] }) => {
    const classes = useStyles()

    const onSportsChange = (event, value) => {
        setValues({...values, sports: value})
    }
    const handleDateChange = (date) => {
        setValues({...values, dob: date})
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    return (
        <div>
            <Box my={2}>
                <TextField id="name" value={values.name} onChange={handleChange('name')} className={classes.margin} label="Name" fullWidth required />
                <TextField id="email" value={values.email} onChange={handleChange('email')} type='email' className={classes.margin} label="Email" fullWidth required />
                <Grid container spacing={0} className={classes.genderMargin}>
                    <Grid item xs={6}>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup value={values.gender} onChange={handleChange('gender')} aria-label="gender"  name="gender" >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                required
                                fullWidth
                                autoOk={true}
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-of-birth"
                                label="Date of Birth"
                                value={values.dob}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={Sports}
                    getOptionLabel={(option) => option.name}
                    className={classes.margin}
                    value={values.sports}
                    onChange={onSportsChange}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        // onChange={onSportsChange}
                        variant="standard"
                        label="Sports"
                    />
                    )}
                />
            </Box>
        </div>
    )
}

export default BasicInformation
