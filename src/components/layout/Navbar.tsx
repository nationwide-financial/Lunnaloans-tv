import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{backgroundColor: 'white', }}>
                <Box 
                    component="img" 
                    src="/images/lunna-loans-logo.png" 
                    alt="Logo" 
                    sx={{ height: 40, marginRight: 2 }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
