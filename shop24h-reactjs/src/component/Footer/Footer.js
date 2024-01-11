import { Container, Grid, Typography, Link } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import logo from '../../assets/logo.png'

function Footer() {
  const title = [
    "Thời trang",
    "Đẳng cấp",
    "Thời thượng",
    "Phong cách",
    "Đỉnh cao",
  ];
  const LienHe = [
    "Bảo hành",
    "Tư vấn",
    "Kỹ thuật ",
    "Khuyến maị",
    "góp ý",
  ]; 
  const DiaChi = [
    "Cơ sở 1: số 8 Giang Chính, Biên giang",
    "Hà Đông, Hà Nội",
    "Cơ sở 2: số 8 Quang Trung, Thủ Đức",
    "Thành Phố HCM",

  ]; 
  return (
    // /* ///////           FOOTER     ///////// */
    <div style={{ marginTop: "80px", backgroundColor: "beige", textAlign: "center"}} >
      <Container className="pt-5 pb-5" sx={{ backgroundColor: "beige"}}>
        <Grid container>
          <Grid item xs={6} lg={3} md={3} sm={3}>
            <Typography variant="h6">
              <b>Sản phẩm</b>
            </Typography>
            {title.map(function (element, index) {
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant="h8" style={{textAlign: "center"}}>{element}</Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={6} lg={3} md={3} sm={3} >
            <Typography variant="h6">
              <b>Liên hệ</b>
            </Typography>
            {LienHe.map(function (element, index) {
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant="caption" >{element}</Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={6} lg={3} md={3} sm={3}>
            <Typography variant="h6">
              <b>Địa chỉ</b>
            </Typography>
            {DiaChi.map(function (element, index) {
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant="caption" style={{textAlign: "center"}}>{element}</Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={6} lg={3} md={3} sm={3} align="center" className="pt-4">
            <Typography variant="h4">
              <b><img src = {logo} alt = "logo" style={{background: "black"}}/></b>
            </Typography>
            <Grid container className="d-flex justify-content-center mt-3">
              <Link
                href="https://www.facebook.com/"
                sx={{ mr: 2, color: "black" }}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/"
                sx={{ mr: 2, color: "black" }}
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.youtube.com/"
                sx={{ mr: 2, color: "black" }}
              >
                <YouTubeIcon />
              </Link>
              <Link href="https://twitter.com/" sx={{ color: "black" }}>
                <TwitterIcon />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;

