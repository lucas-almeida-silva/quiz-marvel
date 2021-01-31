import styled from 'styled-components';

const AlternativesForm = styled.form`
  label {
    &:focus {
      opacity: 1;
    } 

    input {
      display: none;
    }
  }

  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;
