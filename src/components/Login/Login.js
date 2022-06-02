import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const [targetTab, settargetTab] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [user, setUser] = useState(null)
  const login = () => {
    const data = {
      'username': username,
      'password': password,
    }
    axios.post(`http://localhost/ecommerce/backend/api/auth/login.php`, data)
    .then(function (response) {
      console.log(response.data);
      if(response.data.status === 'OK') {setUser(response.data)}
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  const signup = async () => {
    if(password !== cfPassword) {
      alert('Wrong!')
      return
    }
    const data = {
      'username': username,
      'password': password,
      'fName': fName,
      'lName': lName
    }
    const res = await axios.post(`http://localhost/ecommerce/backend/api/auth/register.php`, data);
    console.log(res.data)
  }
  return (
    <>
    {user && <Navigate to="/" replace={true} />}
    <Header/>
    <Container>
      <Head>
        <h2 style={{marginTop: '10px', width: '50%'}}>
          {targetTab==="login" ? "Customer Login" : 'Create Account'}
        </h2>
        <Button className='phone' variant="primary" style={{borderRadius: '20px'}}
          onClick={targetTab==="login" ? ()=>settargetTab(1) : ()=> settargetTab('login')}>
          {targetTab==="login" ? "Sign up" : 'Sign in'}
        </Button>
      </Head>
      <Content>
        { targetTab==='login' ? 
        (<>
        <Box>
          <Form>
            <Title>Registered Customer</Title>
            <Form.Label>If you have an account, sign in.</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Label>Username <span style={{color: 'red'}}>*</span></Label>
              <Form.Control type="text" placeholder="Your username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Label>Password <span style={{color: 'red'}}>*</span></Label>
              <Form.Control type="password" placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
          </Form>
          <TextLink>Forgot your password?</TextLink>
          <Button variant="primary" style={{width: '200px', borderRadius: '20px', margin: '0px auto'}} onClick={login}>Sign in</Button>
        </Box>
        <Box className='intro'>
          <Title>New Customer?</Title>
          <Form.Label>Creating an account has many benefits:</Form.Label>
          <ul>
            <li>Check out faster</li>
            <li>Keep more than one address</li>
            <li>Track orders and more</li>
          </ul>
          <Button variant="primary" style={{width: '200px', borderRadius: '20px'}} 
            onClick={()=>settargetTab(1)}>
              Create an account
          </Button>
        </Box>
        </>) : 
        (<>
        <Box>
          <Form>
            <Title>New Customer</Title>
            <Form.Label>Just create an account, you can buy everything.</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Label>Username <span style={{color: 'red'}}>*</span></Label>
              <Form.Control type="text" placeholder="Your username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </Form.Group>
            <Row>
              <Form.Group style={{marginRight: '5px'}} className="mb-3" controlId="exampleForm.ControlInput1">
                <Label>First name <span style={{color: 'red'}}>*</span></Label>
                <Form.Control type="text" placeholder="Your first name" value={fName} onChange={(e)=>setFName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Label>Last name <span style={{color: 'red'}}>*</span></Label>
                <Form.Control type="text" placeholder="Your last name" value={lName} onChange={(e)=>setLName(e.target.value)}/>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Label>Password <span style={{color: 'red'}}>*</span></Label>
              <Form.Control type="password" placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Label>Confirm password <span style={{color: 'red'}}>*</span></Label>
              <Form.Control type="password" placeholder="Your password" value={cfPassword} onChange={(e)=>setCfPassword(e.target.value)}/>
            </Form.Group>
          </Form>
          <Button variant="primary" style={{width: '200px', borderRadius: '20px', margin: '0px auto'}} onClick={signup}>
              Create an account
          </Button>
        </Box>
        <Box className='intro'>
          <Title>Registered Customer</Title>
          <Form.Label>Creating an account has many benefits:</Form.Label>
          <ul>
            <li>Check out faster</li>
            <li>Keep more than one address</li>
            <li>Track orders and more</li>
          </ul>
          <Button variant="primary" style={{width: '200px', borderRadius: '20px'}} onClick={()=>settargetTab('login')}>
            Login
          </Button>
        </Box></>)}
      </Content>
    </Container>
    <Footer/>
    </>
  )
}

const TextLink = styled.span`
  color: #477bff;
  cursor: pointer;
  text-align: right;
  margin-bottom: 10px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`
const Label = styled(Form.Label)`
  font-weight: bold;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & .intro {
    @media (max-width: 768px){
      display: none;
    }
  }
`
const Box = styled.div`
  background-color: #F5F7FF;
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 10px;
  padding: 30px 50px;
  @media (max-width: 768px){
    width: 100%;
    padding: 10px 20px;
    margin: 0px;
  }
`
const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  & .phone {
    display: none;
    @media (max-width: 768px){
      display: block;
    }
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 1024px){
    width: 100%;
    padding: 10px;
  }
  @media (max-width: 768px){
    padding: 10px;
  }
`

export default Login