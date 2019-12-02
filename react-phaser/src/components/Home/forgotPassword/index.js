import React, {useState} from 'react'
import Axios from 'axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState({email: ''})

  const handleInputChange = (e) =>{
    const {value} = e.target
    setEmail({email: value})
  }

  const handleSubmit = async (e)=> {
    e.preventDefault()
    console.log(email)
    await Axios.post("http://localhost:3000/forgot-password", email)
  }
  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <label>
        <input 
        type="email" 
        className="form-control"
        onChange={handleInputChange}
        placeholder="Email Address"
        name="email"
        aria-label="email"
        />
        <button type="submit" >Send</button>
      </label>
      
    </form>
  )
}
