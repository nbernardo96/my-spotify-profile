import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import '../dashboard.css'

const HOST = process.env.REACT_APP_HOST;

export const LyricQuote = props => {
  const topTracks = props.topTracks;

  const [lyrics, setLyrics] = useState([]);
  const [artist, setArtist] = useState('')
  const [track, setTrack] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    if (topTracks.length > 0) {
      setIsLoading(true)
      setErr(null)
      const randomIndex = Math.floor(Math.random() * topTracks.length);
      const randomTrack = topTracks[randomIndex];
      setTrack(randomTrack)

      console.log('TRACK -->', randomTrack.album.images[0])

      const params = {
        artist: randomTrack.album.artists[0].name,
        title: randomTrack.name
      }

      axios.get(`${HOST}/api/lyrics`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: params
      }).then((res) => {
        setLyrics(res.data)
        setArtist(randomTrack.album.artists[0].name)
        setIsLoading(false)
        setErr(null)
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)
        setErr('Could not retrieve lyrics. Click refresh to try again')
      })
    }
  }, [topTracks])

  const getLyrics = () => {
    if (topTracks.length > 0) {
      setIsLoading(true)
      setErr(null)
      const randomIndex = Math.floor(Math.random() * topTracks.length);
      const randomTrack = topTracks[randomIndex];
      setTrack(randomTrack)

      console.log('TRACK -->', randomTrack.album.images[0])

      const params = {
        artist: randomTrack.album.artists[0].name,
        title: randomTrack.name
      }

      axios.get(`${HOST}/api/lyrics`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: params
      }).then((res) => {
        setLyrics(res.data)
        setArtist(randomTrack.album.artists[0].name)
        setIsLoading(false)
        setErr(null)
      }).catch((error) => {
        console.log(error)
        setIsLoading(false)
        setErr('Could not retrieve lyrics. Click refresh to try again')
      })
    }
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', height: '175px', marginBottom: '50px' }}>
      { lyrics.length && !isLoading > 0 ?
        <Box>
          {lyrics.map((lyric, idx) => (
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }} key={idx}>
              {lyric}
            </Typography>
          ))} 
            <Box
            omponent="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={track.album.images[0]}
          >

          </Box>
        </Box>
      : isLoading && !err ?
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <LinearProgress color="inherit" sx={{ marginBottom: '25px' }} />
        </Box>
      :
        null
      }

      { err ?
        <Box>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            {err}
          </Typography>
        </Box>
      : null }

      { isLoading && !err ?
        null
      :
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h8" gutterBottom 
            sx={{ 
              fontStyle: 'italic', 
              textAlign: 'right', 
              width: '75%',
              marginBottom: '0'
            }}
          >
            - {artist}
          </Typography>
          <IconButton 
            className="refreshLyricsButton"
            sx={{ 
              color: '#c2edffbf', 
              padding: '5px', 
              marginLeft: '5px' 
            }} 
            onClick={getLyrics} 
          >
            <RefreshIcon sx={{ fontSize: '20px' }} className="refreshLyricsButtonIcon"/>
          </IconButton>
        </Box>
      }
    </Box>
  );
}