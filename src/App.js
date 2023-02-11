import React from 'react'
import styled from 'styled-components';
import ForeignExchange from './component/ForeignExchange';
import 'devextreme/dist/css/dx.light.css';
const Wrapper= styled.div`
width:100%;
height:100vh;
background:lightgrey;
display:flex;
align-items:center;
justify-content:center;
`
function App() {
  return (
    <Wrapper >
    <ForeignExchange/>
    </Wrapper>
  );
}

export default App;
