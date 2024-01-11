import '../../App.css'
import { Grid } from '@mui/material';
import Row from 'reactstrap'
import LinearProgress from '@mui/material/LinearProgress';
function Sanphamyeuthich() {

    return (
        <>

            <div class="container">
                <Grid  container style = {{ display: "flex", alignItems: "center"}}>
                    <Grid className="col-3">
                        <LinearProgress color="success" />
                    </Grid>
                    <Grid className="col-6">
                        <h2 className='text-center border-warning text-danger'>
                            Sản phẩm yếu thích nhất
                        </h2></Grid>
                    <Grid className="col-3"><LinearProgress color="success" /> </Grid>

                </Grid>
                <div class="cards-list">
                    <div class="card 1">
                        <div class="card_image">
                            <a href={"/product/" + "62f5055ef9e82d7a04ce60bd"} class="card_image">
                                <img src="https://donghohungthinhphat.com/uploads/noidung/images/sanpham/b5-huong-dan-cach-phan-biet-dong-ho-seiko-chinh-hang-1.jpg" />
                            </a>
                        </div>
                        <div class="card_title title-white">
                            <p></p>
                        </div>
                    </div>


                    <div class="card 2">
                        <div class="card_image">
                            <a href={"/product/" + "62f50634f9e82d7a04ce60c1"} class="card_image">
                                <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/hinh-anh-dong-ho-dep-chat-nhat.jpg" />
                            </a>
                        </div>
                        <div class="card_title title-white">

                        </div>
                    </div>

                    <div class="card 3">
                        <div class="card_image">
                            <a href={"/product/" + "62f5069af9e82d7a04ce60c9"} class="card_image">
                                <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/hinh-anh-dong-ho-dep-va-phong-cach.jpg" />
                            </a>
                        </div>
                        <div class="card_title">

                        </div>
                    </div>

                    <div class="card 4">
                        <div class="card_image">
                            <a href={"/product/" + "62f5069af9e82d7a04ce60c9"} class="card_image">
                                <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/hinh-anh-dong-ho-dep-danh-cho-nu.jpg" />
                            </a>

                        </div>
                        <div class="card_title title-black">

                        </div>
                    </div>

                </div>
            </div>
        </>


    )
}
export default Sanphamyeuthich