import './App.css'
import { TextField, Button, Slider, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charachterAllowed, setCharachterAllowed] = useState(false);
  const [length, setLength] = useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charachterAllowed]);

  // This function generate rendom password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Check if it is number and charachter is allowd or not ??
    if (numberAllowed) str += "0123456789";
    if (charachterAllowed) str += "~`!@#$%^&*-_=+;:{}[]/?><.,";

    for (let index = 0; index < length; index++) {
      // Floor function for removing decimal value
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charachterAllowed]);

  // This function copy the text to clipboard
  const copyTextToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setOpen(true);
  }

  // Handle Sanckbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='mainContainer'>
      <h1>Password Generator</h1>
      <div>
        <TextField id="outlined-basic" label="password" variant="outlined" value={password} style={{ marginRight: '3rem' }} />
        <Button variant="outlined" onClick={copyTextToClipboard} style={{ padding: '14px 22px' }} size='10px'>Copy Text</Button>
      </div>
      <div className='sliderContainer'>
        <Slider aria-label="Default" valueLabelDisplay="auto" value={length} onChange={(e) => setLength(e.target.value)} min={4} max={64} />
      </div>
      <div className='flexContainer'>
        <div style={{ alignSelf: "center" }}>
          <label htmlFor="">Length: {length}</label>
        </div>
        <div>
          <FormControlLabel control={<Checkbox defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !(prev))} />} label="Numbers" />
        </div>
        <div>
          <FormControlLabel control={<Checkbox defaultChecked={charachterAllowed} onChange={() => setCharachterAllowed((prev) => !(prev))} />} label="Charachters" />
        </div>
      </div>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          message="Copied to clipboard"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        />
      </div>
    </div>
  )
}

export default App
