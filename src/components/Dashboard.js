import React from 'react';

import { LyricQuote } from './LyricQuote';
import { AlbumCovers } from './AlbumCovers';

import Box from '@mui/material/Box';

export const Dashboard = props => {
  const topTracks = props.topTracks;

  return (
    <Box>
      <LyricQuote />
      <AlbumCovers />
    </Box>
  );
}