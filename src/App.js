import React, { useState ,useEffect} from 'react';
import MemeList from './MemeList';
import { CssBaseline, AppBar, Toolbar, Typography, Container, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LeftImage from './left.png'; 
import RightImage from './cheems.png'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', 
    },
  },
});

function App() {
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const isTop = window.scrollY < 50;
      if (!isTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={isScrolled ? 4 : 0}>
        <Toolbar>
        <img src={LeftImage} alt="Left" style={{ position: 'absolute',  left:'13px',top: '50%', transform: 'translateY(-50%)', height: '60px', width: 'auto' }} />
        <Typography variant="h6"sx={{ml:7}} style={{ flexGrow: 1, color: '#FF3131', textAlign: 'center',fontFamily:'Monaco' ,}}>
            Memes
          </Typography>
          
          <img src={RightImage} alt="Right" style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', height: '60px', width: 'auto' }} />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <TextField
            placeholder="Search Memes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              ml:-7,
              backgroundColor: '#EAECEE',
              borderRadius: '35px',
              width: '900px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '35px',
                '& fieldset': {
                  border: 'none', 
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '10px', 
              },
           }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> 
      <Container style={{ marginTop: '20px' }}>
        <MemeList search={search} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
