
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Grid, Typography } from "@mui/material"
import logo from '../../../assets/logo.png'
function LogoShop() {
    return (
        <Typography variant="h5" color="red">
            <Grid>
                <img width={100} height={40} src={logo}/>
            </Grid>
        </Typography>
    )
}
export default LogoShop