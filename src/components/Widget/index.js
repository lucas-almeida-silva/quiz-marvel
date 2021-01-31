import styled, { css } from 'styled-components';

const Widget = styled.div`
  margin: 24px 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;

  ${({ theme, selected }) => selected && css`
    background-color: ${theme.colors.primary};
  `}

  ${({ theme, status }) => status === 'SUCCESS' && css`
    background-color: ${theme.colors.success};
  `};

  ${({ theme, status }) => status === 'ERROR' && css`
    background-color: ${theme.colors.wrong};
  `};
  
  &:hover,
  &:focus {
    opacity: ${({ selected }) => (selected ? 1 : 0.5)} 
  }
`;

export default Widget;
