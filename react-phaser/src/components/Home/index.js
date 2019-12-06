import React from 'react'
import {Link} from 'react-router-dom'
import LoginForm from './loginForm'
import { Title } from './styles'

export default function Home() {
  return (
    <div>
      <Title>Fantasy of the Final</Title>
      <LoginForm />
      <Link to='/signup' style={{fontSize: "150%"}}>Don't have an Account, Sign up here!</Link>
      <br />
      {/* <Link to='/forgotpassword'>Forgot Password? Reset it Here!</Link> */}
    </div>
  )
}
