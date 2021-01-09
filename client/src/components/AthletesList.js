
import { Box } from '@material-ui/core'
import React from 'react'
import AthleteItem from './AthleteItem'

const AthletesList = ({ athletesList }) => {



    return (
        <div >
            <Box mt={2} mb={1} style={{fontSize: 25 , color:'#2F3F6B'}} display="flex" justifyContent="center">Athlete List</Box>
            <Box style={{maxHeight: '90vh' , overflow:'auto'}}>
            {athletesList.map(ath => <AthleteItem key={ath._id} ath={ath}/>)}
            </Box>
        </div>
    )
}

export default AthletesList
