import { Alert, Button, Modal, Snackbar, Typography, Box, Grid , TextField} from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import LinearProgress from '@mui/material/LinearProgress'


function ModalLogin({openModal, loginGoogle, CloseModal}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

    };
    const loginGoogleClick = ()=>{
        loginGoogle();
    }
    return (
        <Modal
            onClose={CloseModal}
            open = {openModal}
            aria-labelledby="modal-delete"
            aria-describedby="modal-delete-user"

        >
            <Box sx={style} style={{ width: "300px"}} textAlign="center">
                <Typography  >
                    <Button disableElevation style={{background :"red", color: "white" }} onClick ={loginGoogleClick} > <GoogleIcon /> Sign in With GooGle</Button>
                </Typography>
                < Typography mt={5}>
                    <LinearProgress />
                </Typography>
                <Typography mt={5}>
                    <TextField      
                        label="User Name"
                    />
                </Typography>
                <Typography mt={3}>
                    <TextField      
                        label="User Name" type="password"
                    />
                </Typography>
                <Typography  mt={3}>
                    <Button disableElevation style={{background :"red", color: "white" }} > Sign in </Button>
                </Typography>

            </Box>
        </Modal>

    )
}
export default ModalLogin;