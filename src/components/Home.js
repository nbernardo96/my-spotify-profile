import React from "react";
import { useState, useEffect } from "react";
import { Dashboard } from "./Dashboard";
import { NavigationBar } from "./NavigationBar";

export const Home = () => {
  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
  const SPOTIFY_AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState('')

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

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
  }

  return (
    <div>
      <NavigationBar token={token} logout={logout} />
        <div> 
          { token ?
            <Dashboard />
          :
            <a href={`${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
          }
        </div>
    </div>
  );
}