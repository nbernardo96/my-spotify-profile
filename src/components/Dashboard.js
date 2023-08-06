import React from 'react';

import { LyricQuote } from './LyricQuote';
import { AlbumCovers } from './AlbumCovers';

import Box from '@mui/material/Box';

export const Dashboard = props => {
  const topTracks = props.topTracks;

  return (
    <Box mt={10} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <LyricQuote topTracks={topTracks} sx={{ marginBottom: '50px' }} />
      <AlbumCovers topTracks={topTracks}/>
    </Box>
  );
}