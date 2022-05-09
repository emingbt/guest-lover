import styled from "styled-components"
import { Link } from 'react-router-dom'

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #e6e6e6;
`

const Logo = styled.img`
  height:6vw;
  object-fit:cover;
  object-position:50% 50%;
  padding-left: 32px;
  padding-top: 16px;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  text-align: center;
  font-size: 1.2em;
  text-decoration: none;
  color: #3a3a3a;
  :hover {
    color: #E87121;
  }
  padding-right: 32px;
`

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  color: ${props => props.primary ? "white" : "#E87121"};
  background-color: ${props => props.primary ? '#E87121' : 'white'};
  cursor: pointer;
  height: 50px;
  font-size: 1em;
  font-family: Lato, sans-serif;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #E87121;
  border-radius: 3px;
`

const HeaderBar = () => {
  return (
    <Wrapper>
      <div>
        <Logo onClick={() => window.location.href = 'localhost:3000'} src="/images/GuestMate (2).png"/>
      </div>
      <div style={{
        paddingRight: '32px'
      }}>
        <StyledLink to="/account/register">
          How it works?
        </StyledLink>
        <Link to="/account/register">
          <Button primary>Sign Up</Button>
        </Link>
        <Link to='/account/login'>
          <Button>Log in</Button>
        </Link>
      </div>
    </Wrapper>
  )
}

export default HeaderBar