import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoShop from './Appbavsicon/Logo';
import IconShop from './Appbavsicon/IconNavBar';
import { Grid } from '@mui/material';
import ModalLogin from './ModalLogin';
import { auth, googleProvider } from "../../firebase"
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '@mui/icons-material/Logout';
import { useEffect } from 'react';

const pages = [
  {
    name: 'Home',
    route: '/'
  },
  {
    name: 'Danh mục',
    route: '/product'
  }
];
const settings = ['Đăng nhập'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false)

  const [user, setUser] = React.useState(null);
  const CloseModal = () => { setOpenModal(false) }

  // login google
  const loginGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result)
        setUser(result.user)
        localStorage.setItem("LOGIN", JSON.stringify(result.user))
        CloseModal()
      })
      .catch((error) => {
        console.log(error)
        // localStorage.removeItem("LOGIN")
      })
  }
  // sigout googlen
  const Logoutgoogle = () => {
    auth.signOut()
      .then(() => {
        setUser(null)
        localStorage.removeItem("LOGIN");

      })
      .catch((error) => {
        console.log(error)
      })

  }
  useEffect(() => {
    auth.onAuthStateChanged((result) => {
      setUser(result);
    })
  }, [user])

  // close modal


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);

  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);

  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // open modal
  const handleCloseUserMenu = () => {
    console.log("đăng nhập")
    setAnchorElUser(null);
    setOpenModal(true);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LogoShop sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >

            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><a href={page.route}>{page.name}</a> </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >

            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href={page.route}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Grid container>
                < IconShop />
                {
                  user ? <> <Tooltip title="Open settings">
                    <IconButton sx={{ p: 0 }} onClick={Logoutgoogle}>
                      <Avatar alt="Remy Sharp" src={user.photoURL} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                      &nbsp;<LogoutIcon />
                    </IconButton>
                  </Tooltip>
                  </> :
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                      </IconButton>
                    </Tooltip>
                }

              </Grid>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      < ModalLogin openModal={openModal} loginGoogle={loginGoogle} CloseModal={CloseModal} />
    </>

  );
};
export default ResponsiveAppBar;
