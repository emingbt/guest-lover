import { Link } from "react-router-dom"
import styled from "styled-components"
import Input from "../components/Input"

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-image: url('/images/signup-bg.jpg');
  height: 200vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`

const Logo = styled.img`
  height: 60%;
  object-fit:cover;
  object-position:50% 50%;
  cursor: pointer;
`

const StyledText = styled.text`
  text-align: center;
  font-size: 2em;
  color: #3d4f58;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledSubmitButton = styled.input`
  color: white;
  background-color: #E87121;
  :hover {
    color: #E87121;
    background-color: white;
  }
  cursor: pointer;
  height: 40px;
  font-size: 1em;
  font-family: Lato, sans-serif;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #E87121;
  border-radius: 6px;
`
const StyledLink = styled(Link)`
  text-align: center;
  font-size: 1em;
  text-decoration: none;
  color: #E87121;
  padding-right: 32px;
  :hover {
    color: #b35719;
  }
`

const Register = () => {
  return (
    <StyledDiv>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        position: "absolute",
        backgroundColor: 'white',
        height: '200vh',
        width: '400px',
        alignItems: "center",
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '220px',
          width: '300px'
        }}>
          <Logo src="/images/GuestMate (2).png" />
          <StyledText>
            Create your account
          </StyledText>
        </div>
        {/* <hr style={{ width: '300px' }} /> */}
        <StyledForm>
          <Input inputType="text" inputName="Email" />
          <Input inputType="text" inputName="First Name" />
          <Input inputType="text" inputName="Last Name" />
          <Input inputType="password" inputName="Password" />
          <Input inputType="text" inputName="Phone Number" />
          <Input inputType="text" inputName="Phone Number" />
          <Input inputType="text" inputName="Phone Number" />
          <Input inputType="text" inputName="Phone Number" />
          <Input inputType="text" inputName="Phone Number" />
          <Input inputType="text" inputName="Phone Number" />
          <Input inputType="text" inputName="Phone Number" />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <StyledSubmitButton type='submit' value='Sign Up' />
            <p>Have an account? <StyledLink to='/account/login'>Log in now</StyledLink></p>
          </div>
        </StyledForm>
      </div>
      {/* <div style={{
        backgroundColor: 'red',
        width: '100%',
        position: 'fixed',
        // backgroundImage: "url('/images/signup-bg.jpg')"
      }}>
        
      </div> */}
    </StyledDiv>
  )

}

export default Register