import styled from 'styled-components'
import HeaderBar from './HeaderBar'

const Text = styled.text`
  color: green;
  text-align: center;
  font-size: 10em;
  fontWeight: 700;
  alignItems: center;
  padding-bottom: 64px;
`
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  backgroundColor: papayawhip;
`

const LandingPage = () => {
  return (
    <>
      <HeaderBar />
      <Wrapper>
        <Text>
          Hello!
        </Text>
      </Wrapper>
    </>
  )
}

export default LandingPage