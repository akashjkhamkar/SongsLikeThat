import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const Notification = () => {
    const notification = useSelector(state => state.notification)
    if(!notification){
        return null
    }

    return <Alert severity="info">{notification}</Alert>
}

export default Notification