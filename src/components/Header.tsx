import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import React, {  useState } from 'react';
import useThemeSwitch from "../hooks/ThemeSwitch";
import { themes } from "../styles/theme";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    let islogged:any = window.localStorage.getItem("isLoggedIn") || false
    console.log('cecascasc', JSON.parse(islogged))
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {theme, themeToggler} = useThemeSwitch();
    const themeMode = theme === 'light' ? themes.light : themes.dark;
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (input:string) => {
        setAnchorEl(null)
        console.log('checkecece', input)
        themeToggler(input)
    }
    return (
        <Box sx={{ display: 'flex', ...themeMode }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Union Bank
            </Typography>
            <Divider />
            <List sx={{display:'flex'}}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} href={"/home"}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    {JSON.parse(islogged) && 
                        <React.Fragment>
                        <ListItemButton sx={{ textAlign: 'center' }} href={"/customer"}>
                            <ListItemText primary="Customers" />
                        </ListItemButton>
                        <ListItemButton sx={{ textAlign: 'center' }} href={"/transaction"}>
                            <ListItemText primary="Deposits" />
                        </ListItemButton>
                        </React.Fragment>
                    }
                </ListItem>
                <Button 
                    onClick={handleClick}
                >
                    Toggle Theme
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps = {{
                        'aria-labelledby' : 'basic-button'
                    }}                    
                >
                    <MenuItem onClick={() => handleClose('dark')}>Dark</MenuItem>
                    <MenuItem onClick={() => handleClose('light')}>Light</MenuItem>
                </Menu>
                {JSON.parse(islogged) && 
                    <Button 
                        className="logoutButton" 
                        variant="text" 
                        onClick={() => (
                            window.localStorage.setItem("isLoggedIn", JSON.stringify(false)),
                            islogged = 'false',
                            navigate("/home")
                        )}>Logout</Button>
                }
            </List>
            
        </Box>
    )
}

export default Header;