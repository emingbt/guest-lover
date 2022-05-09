import styled from "styled-components"

interface InputProps {
  inputType: string
  inputName: string
}

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 4px 0 4px 0;
`

const StyledText = styled.text`
  font-weight: 600;
  font-family: Poppins;
  font-size: 0.8em;
  color: #3d4f58;
  padding: 2px;
`

const StyledTextInput = styled.input`
  color: #001e2b;
  width: 272px;
  height: 36px;
  align-self: center;
  font-weight: normal;
  font-size: 14px;
  border: 1px solid rgb(136, 147, 151);
  // transition: border-color 150ms ease-in-out 0.5s;
  border-radius: 6px;
  line-height: 20px;
  padding-left: 12px;
  padding-right: 12px;
  font-family: Lato, consolas;
  :focus {
    outline: none !important;
    border-color: #ff9e03;
    border-width: 3px;
  }
`

const Input = ({inputType, inputName}: InputProps) => {
  return (
    <StyledLabel>
      <StyledText>
        {inputName}
      </StyledText>
      <StyledTextInput type={inputType} name={inputName.toLowerCase().replace(/\s/g, '')}/>
    </StyledLabel>
  )
}

export default Input