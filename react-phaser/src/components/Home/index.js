import React from 'react'
import {Link} from 'react-router-dom'
import LoginForm from './loginForm'

export default function Home() {
  return (
    <div>
      <LoginForm />
      <Link to='/signup'>Don't have an Account, Sign up here!</Link>
      <br />
      {/* <Link to='/forgotpassword'>Forgot Password? Reset it Here!</Link> */}
    </div>
  )
}
