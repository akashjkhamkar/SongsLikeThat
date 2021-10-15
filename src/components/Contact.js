import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
    return (
        <div className="contact">
            connect with me !
            <IconButton href="https://github.com/akashjkhamkar/">
                <GitHubIcon style={{fill: "white"}}></GitHubIcon>
            </IconButton>

            <IconButton href="https://www.linkedin.com/in/akash-khamkar-378518191/">
                <LinkedInIcon style={{fill: "white"}}></LinkedInIcon>
            </IconButton>
            <IconButton href="mailto:akash.khamkar40@gmail.com">
                <EmailIcon style={{fill: "white"}}></EmailIcon>
            </IconButton>

        </div>
    )
}

export default Contact;