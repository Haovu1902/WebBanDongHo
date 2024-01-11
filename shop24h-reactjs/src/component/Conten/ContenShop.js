import  ButtonBasejs from "../Header/ButtonBase"
import CarouselShop from "../Conten/Carousel/Carousel"
import LastestProducts from "./LastestProducts/LastestProducts"

// sử dụng liên quan đến phần slide và sản phẩm bán chạy

function ContenShop(){
    return(
        <div>
            < CarouselShop/>
            <div>
            < LastestProducts/>
            </div>
        </div>
       
    )
}
export default ContenShop