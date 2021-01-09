import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import AthleteForm from './AthleteForm'

const AddAthlete = ({ open, handleClose, editType, athlete }) => {
    console.log('athlete')
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="athlete"
            aria-describedby="athlete"
            fullWidth
            >
            <DialogTitle id="athlete-dialog-title">{(editType ? 'Edit' : 'Add') + ' Athlete'}</DialogTitle>
            <DialogContent style={{marginBottom: 18}}>
                <AthleteForm handleClose={handleClose} athlete={athlete} editType={editType}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddAthlete
