import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export const AlbumCovers = props => {
  const topTracks = props.topTracks

  const [albums, setAlbums] = useState([])

  useEffect(() => {
    if (topTracks.length > 0) {
      const topAlbums = []
      for (const track of topTracks) {
        topAlbums.push({
          artist: track.album.artists[0].name,
          albumCover: track.album.images[0].url,
          songName: track.name
        })
      }
      
      setAlbums([...topAlbums])
    }
  }, [topTracks])

  return (
    <Box>
      <ImageList sx={{ height: '100%' }} cols={5}>
        {albums.map((album, idx) => (
          <ImageListItem key={idx}>
            <img
              src={`${album.albumCover}?w=248&fit=crop&auto=format`}
              srcSet={`${album.albumCover}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={album.songName}
              loading="lazy"
            />
            <ImageListItemBar
              title={album.songName}
              subtitle={album.artist}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${album.songName}`}
                >
                  <PlayCircleOutlineIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}