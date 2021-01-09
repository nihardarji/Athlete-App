import React, { useEffect, useState } from 'react'
import { Container, Fab, Grid, makeStyles } from '@material-ui/core'
import AthletesList from './AthletesList'
import AthleteDetails from './AthleteDetails'
import { Add } from '@material-ui/icons'
import AddAthlete from './AddAthlete'
import { connect } from 'react-redux'
import { getAthletes } from '../actions/athleteActions'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    }
}))
const Home = ({ athletes, getAthletes }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [uploadImg, setUploadImg] = useState(false)

    const { athletesList } = athletes
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        getAthletes()
    }, [open, uploadImg])
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <AthletesList athletesList={athletesList} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AthleteDetails uploadImg={uploadImg} setUploadImg={setUploadImg} />
                </Grid>
                <Fab className={classes.fab} onClick={handleClickOpen} color="primary" aria-label="add">
                    <Add />
                </Fab>
                <AddAthlete open={open} handleClose={handleClose}/>
            </Grid>
        </Container>
    )
}

const mapStatesToProps = state => ({
    athletes: state.athletes
})

export default connect(mapStatesToProps, { getAthletes })(Home)
