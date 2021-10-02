import Alert from '@mui/material/Alert';

const Notification = ({notification}) => {
    if(!notification){
        return null
    }

    return <Alert severity="info">{notification}</Alert>
}

export default Notification