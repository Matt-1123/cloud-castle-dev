import { Outlet, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'aws-amplify/auth';

export default function Header(user) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "transparent" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cloud Castle Dev
          </Typography>
          <Button color="secondary">
            <Link to="/profile">My Profile</Link>
          </Button>
          {user ? <Button variant="outlined" onClick={signOut}>Sign Out
          </Button> : null}       
        </Toolbar>
        <Outlet/>
      </AppBar>
    </Box>
  );
}
