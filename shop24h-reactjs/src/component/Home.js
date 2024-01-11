import HeaderShop from "../component/Header/HeaderShop"
import Contenshop from "../component/Conten/ContenShop"
import Footer from "../component/Footer/Footer"
import ButtonBasejs from "./Header/ButtonBase"
import Sanphamyeuthich from "./Producet/Sanphamyeuthich"
import MageListShop from "./Header/Appbavsicon/imageListShop"


function Home() {
    
    return(
        <div>
        <HeaderShop/>
        <ButtonBasejs/>
        <Contenshop/>
        <Sanphamyeuthich/>
        <MageListShop/>
        <Footer/>
        </div>
    )
}
export default Home