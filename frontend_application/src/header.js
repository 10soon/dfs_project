import {React, useContext} from 'react';
// import React, {useState}  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import globalContext from "./globalContext"

function Header() {
    // const [anchorEl, setAnchorEl] = useState(null) // < null | HTMLElement > (null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    const myContext = useContext(globalContext);

    return (
        <>
        <nav className="navbar navbar-dark bg-dark py-3">
            <div className="container">
            <div className="navbar-brand">
            Data Foundation Systems: Dataset Entry Verification Workflow
            </div>
            <a className="navbar-brand">
            Welcome {myContext.username}
            </a>
            </div>
        </nav>
        {/* <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar> */}
                    {/* <IconButton
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="inherit"
                        aria-label="menu"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu> */}

                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Data Foundation Systems: Dataset Entry Verification Workflow
                    </Typography>
                    Welcome {myContext.username}
                </Toolbar>
            </AppBar>
        </Box> */}
    </>
    );
}

export default Header;