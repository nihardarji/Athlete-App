import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { createAthlete, updateAthelete } from '../actions/athleteActions';
import BasicInformation from './BasicInformation';
import About from './About';
import Summary from './Summary';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
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

function getSteps() {
    return ['Basic Information', 'About you', 'Summary'];
}

function getStepContent(step, athlete, val) {
    switch (step) {
        case 0:
            return <BasicInformation athlete={athlete} val={val} />;
        case 1:
            return <About val={val}/>;
        case 2:
            return <Summary val={val} />;
        default:
            return 'Unknown step';
    }
}


const AthleteForm = ({ handleClose, athlete, createAthlete, editType, updateAthelete }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const val = useState({
        name: athlete ? athlete.name : null,
        email: athlete ? athlete.email : null,
        dob: athlete ? athlete.dob : null,
        gender: athlete ? athlete.gender : null,
        sports: athlete ? athlete.sports : [],
        location: athlete ? athlete.location : null,
        team: athlete ? athlete.team : null,
        interests: athlete ? athlete.interests : null,
        about: athlete ? athlete.about : null
    })
    const steps = getSteps();
    const myForm = useRef(null)
    const handleNext = () => {
        if (!myForm.current.checkValidity()) {
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const onFormSubmit = () => {
        console.log('updateAthelete', editType)
        if(editType){
            updateAthelete(athlete._id, val[0])
        } else {
            createAthlete(val[0])
        }
        
        handleClose()
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            <form ref={myForm} onSubmit={e => e.preventDefault()}>
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep, athlete, val)}</Typography>
                    <Box mt={3} mb={2} display="flex" justifyContent="flex-end" >
                        <Box>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === steps.length - 1 ? onFormSubmit : handleNext}
                                type='submit'
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                            </Button>
                        </Box>
                    </Box>
                </div>
            </form>
        </div>
    );
}

export default connect(null, { createAthlete, updateAthelete })(AthleteForm)