import { useState } from 'react';
import './App.css';
// icons
import gateIcon from './assets/icons/gate.png';
import wizardIcon from './assets/icons/wizard.png';
//components
import Appbar from './components/Appbar'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const [count, setCount] = useState(0)

  const thumbnail = document.querySelectorAll(".thumbnail")
  console.log(thumbnail);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

  return (
    // <html><body><h1>Welcome to Cloud Castle Dev</h1><p>Testing site for AWS training</p><img src='https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif' alt='magic meme' style='width:240px;height:240px;'></body></html>
    
    <>
      <Appbar />
      <img className="icon" src={gateIcon} alt="gate icon" />
      <div className="card">
        <Button variant="outlined" color="primary" className="btn" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <img className='thumbnail' src={count == 3 ? "https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif" : wizardIcon} alt="'magic' gif" style={{ visibility: count > 0 ? 'visible': 'hidden'}} />
        <p>Testing site for AWS training</p>
      </div>
      
      <Divider variant="middle" style={{ backgroundColor: "#fff" }} />

      <div className="card">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default App
