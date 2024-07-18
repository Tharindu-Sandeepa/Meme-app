import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button,  Container } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { saveAs } from 'file-saver';
import './MemeList.css';

const MemeList = ({ search }) => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);

  useEffect(() => {
    axios.get('https://api.imgflip.com/get_memes')
      .then(response => {
        if (response.data.success) {
          setMemes(response.data.data.memes);
          setFilteredMemes(response.data.data.memes);
        }
      })
      .catch(error => {
        console.error('Error fetching memes:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredMemes(
      memes.filter(meme =>
        meme.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, memes]);

  const downloadImage = (url, name) => {
    saveAs(url, name);
  };

  return (
    <Container>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
        {filteredMemes.map(meme => (
          <Card className="meme-card" key={meme.id} sx={{borderRadius:5}}>
            <CardMedia
              component="img"
              image={meme.url}
              alt={meme.name}
            />
            <CardContent className="meme-info">
              <Typography variant="h6">{meme.name}</Typography>
              <Button 
                className="save-button"
                variant="contained"
                onClick={() => downloadImage(meme.url, meme.name)}
              >
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
};

export default MemeList;
