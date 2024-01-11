
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import { Grid, Typography, IconButton } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux/es/exports';
function IconShop() {
    const product = useSelector((reduxData) => reduxData.taskCardReducer);
    return (
        <Typography variant="h5" sx={{ flexGrow: 1, }}>
            <Grid>
                <IconButton href="/giohang">
                    <Badge badgeContent={product.length} sx={{alignItems: "center", width: "50px" , height: "40px"}} color="primary">
                        < AddShoppingCartSharpIcon sx={{ color: "#fffe00" ,width: "30px" , height: "30px" }} /> &nbsp;
                    </Badge>
                </IconButton>
                <IconButton sx={{alignItems: "center", width: "50px" , height: "40px"}} >
                < NotificationsSharpIcon sx={{ color: "#fffe00", width: "30px" , height: "30px" }} />&nbsp;
                </IconButton>
            </Grid>
        </Typography>
    )
}
export default IconShop