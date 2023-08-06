import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Dashboard } from "./Dashboard";
import { NavigationBar } from "./NavigationBar";

import Box from '@mui/material/Box';
import { Link } from "@mui/material";
import Typography from '@mui/material/Typography';

export const Home = () => {
  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const SPOTIFY_AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const RESPONSE_TYPE = "token"
  const loginURL = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`

  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [topTracks, setTopTracks] = useState([])

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  useEffect(() => {
    if (token) {
      const getUser = () => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        }).then((res) => {
          setUser(res.data)
        }).catch((err) => {
          if (err.response.status === 401) {
            logout()
          }
        })
      }

      const getTopTracks = () => {
        const params = {
          limit: 10,
          time_range: 'medium_term'
        }

        axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
            params: params
        }).then((res) => {
          setTopTracks([...res.data.items])
        }).catch((err) => {
          logout()
        })
      }

      getUser()
      getTopTracks()
    }
  }, [token])

  return (
    <Box>
      <NavigationBar token={token} logout={logout} user={user} />
        <Box sx={{ height: '100vh' }}> 
          { token ?
            <Dashboard topTracks={topTracks} />
          :
            <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', height: '75%', alignItems: 'center' }}>
              <Typography variant="h2" gutterBottom>
                MySpotifyProfile
              </Typography>
              <Link 
                href={loginURL} 
                underline="none" 
                sx={{ 
                  fontSize: 24,
                  color: '#E0E1DD',
                  background: '#778DA9',
                  width: '100px',
                  padding: '10px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                {'Login'}
              </Link>
            </Box>
          }
        </Box>
    </Box>
  );
}