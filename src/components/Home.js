import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Dashboard } from "./Dashboard";
import { NavigationBar } from "./NavigationBar";

import Box from '@mui/material/Box';
import { Link } from "@mui/material";

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
        })
      }

      const getTopTracks = () => {
        const params = {
          limit: 10
        }

        axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
            params: params
        }).then((res) => {
          setTopTracks([...res.data.items])
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
            <Dashboard />
          :
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '75%', alignItems: 'center' }}>
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