import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { uploadImage } from '../actions/athleteActions';
const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 275,
      backgroundColor:'#DBE5F5',
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    margin: {
        margin: theme.spacing(1),
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
    center: {
        margin: 'auto',
    },
    large: {
        margin: 'auto',
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
  }));
  

const AthleteDetails = ({ athlete, uploadImage, setUploadImg, uploadImg}) => {
    const classes = useStyles();
    const handleChange = e => {
        if(e.target.files[0]){
            setUploadImg(!uploadImg)
            uploadImage(athlete._id, e.target.files[0])
        }
    }
    return (
        <div>
            <Box my={2} style={{fontSize: 25, color:'#2F3F6B'}} display="flex" justifyContent="center">Athlete Details</Box>
            <Card style={{ height:'89vh', overflow: 'auto', margin: 10}}>
                { athlete ?
                    <Container>
                        <Avatar className={classes.large} src={athlete.profileImage} /> 
                        <Box display='flex' justifyContent='center'><Button variant='contained'onChange={handleChange} component='label'>Edit Photo <input hidden type='file' /></Button></Box>
                        <Card className={classes.root}>
                            <CardContent>
                            <Typography className={classes.margin}>Name :{athlete.name}</Typography>
                            <Typography className={classes.margin}>Email : {athlete.email}</Typography>
                            <Typography className={classes.margin}>Gender : {athlete.gender}</Typography>
                            <Typography className={classes.margin}>Date of Birth : {new Date(athlete.dob).toDateString()}</Typography>
                            <Typography className={classes.margin}>Location : {athlete.location}</Typography>
                            <Typography className={classes.margin}>Team : {athlete.team}</Typography>
                            
                            <Typography className={classes.margin}>
                                Interests : { athlete.interests}
                            </Typography>
                            <Typography className={classes.margin}>
                                About : { athlete.about}
                            </Typography>
                            <Typography className={classes.margin}>
                                Sports : {athlete.sports.map(sport => <Chip className={classes.margin} color='primary' size="small" label={sport.name} />)}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Container> : 
                    <Box 
                        display="flex"
                        alignItems="center"
                        justifyContent='center'
                        mt={15}
                    >
                        <Box fontSize={20}> Click on the card to view Athlete Details </Box>
                    </Box>
                }
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    athlete: state.athletes.athlete
})
export default connect(mapStateToProps, { uploadImage })(AthleteDetails)
