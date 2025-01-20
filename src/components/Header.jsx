import { Outlet, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from 'aws-amplify/auth';
import coinIcon from '../assets/icons/coin.png'

export default function Header(user) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "transparent" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Cloud Castle Dev</Link>
          </Typography>  
          <img className="icon-sm" src={coinIcon} alt="scroll icon" />
          <span style={{ margin: '0 1em 0 6px' }} s>0</span>
          <Link to="/profile">
            <AccountCircleIcon className="icon" />
          </Link>
          {user ? <LogoutIcon className="icon" style={{ cursor: 'pointer' }} onClick={signOut} /> : null}       
        </Toolbar>
        <Outlet/>
      </AppBar>
    </Box>
  );
}
