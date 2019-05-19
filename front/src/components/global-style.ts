import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    //font-family: 'Raleway', sans-serif;
    //font-family: 'Roboto Slab', serif;
  }
  a {
    transition: opacity ease 0.15s;
    :hover {
      opacity: 0.85;
    }
    :active {
      opacity: 0.7;
    }
  }
  .font-raleway {
    font-family: 'Raleway', sans-serif;
  }
`
