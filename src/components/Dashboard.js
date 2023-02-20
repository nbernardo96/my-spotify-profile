import React from 'react';

import { LyricQuote } from './LyricQuote';
import { AlbumCovers } from './AlbumCovers';

import Box from '@mui/material/Box';

export const Dashboard = () => {
    return (
      <Box>
        <LyricQuote />
        <AlbumCovers />
      </Box>
    );
  }