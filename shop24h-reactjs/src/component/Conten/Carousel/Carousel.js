import Carousel from 'react-bootstrap/Carousel';
import anh1 from "../../../assets/image/1.jpg"
import anh2 from "../../../assets/image/2.jpg"
import anh3 from "../../../assets/image/3.jpg"
import anh4 from "../../../assets/image/4.jpg"

//Slide Header

function CarouselShop() {
  


  return (
    <div style={{ borderRadius: "60px"}}  className="container">
      <Carousel >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.dangquangwatch.vn/upload/slideshow/899349647_web1.jpg"
            alt="Second slide"
            sx={{ height: "300px" }}

          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={anh3}
            alt="Third slide"
            sx={{ height: "300px" }}
          />
          <Carousel.Caption>
          <img
            className="d-block w-100"
            src="https://cdn.shopdongho.com/2021/10/banner-shopdongho-t11-pc-1.jpg"
            alt="Third slide"
            sx={{ height: "400px" }}
          />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={anh4}
            alt="Third slide"
            sx={{ height: "300px" }} 
          />
        </Carousel.Item>
      </Carousel>
      
    </div>
  );
}

export default CarouselShop;