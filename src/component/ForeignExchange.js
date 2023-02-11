import React, { useState, useEffect } from "react";
import { SelectBox } from "devextreme-react/select-box";
import axios from "axios";
import styled from "styled-components";
import ForeignExchangeGraph from "./ForeignExchangeGraph";
const Container = styled.div`
  width: 60%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 85%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media (max-width: 768px) {
    width: 95%;
    height: 95%;
    font-size: 10px;
  }
`;
const SelectionContainer = styled.div`
  padding-left: 10px;
  width: 100;
  height: 10%;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;
`;
const LoadingContainer = styled.div`
  margin-left: 20px;
`;

const CurrencyExchangeContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${"" /* border:1px solid; */}
`;

const ForeignExchange = () => {
  const [code, setCode] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownDataSource, setDropdownDataSource] = useState([]);
  
  const [exchangeRate, setExchangeRate] = useState([]);
  
  const getCurrencyExchangeData = (code = "USD") => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://open.er-api.com/v6/latest/${code}`,
    })
      .then((response) => {
        const { rates, result } = response.data;
        if (result === "success") {
          let keys = Object.keys(rates).slice(0, 20);

          let dropDownValue = [];
          let Rates = [];
          keys.forEach((key) => {
            dropDownValue.push({ value: key, text: key });
            Rates.push({ arg: key, value: rates[key] });
          });
          setDropdownDataSource(dropDownValue);
          setExchangeRate(Rates);
          // setExchangeRate(()=>[...rates.slice(0,10)])
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("Error", error);
      });
  };

  // On page load , fetching the currency Exchange Data
  useEffect(() => {
    getCurrencyExchangeData();
  }, []);

  return (
    <Container>
      <SelectionContainer>
        <SelectBox
          dataSource={dropdownDataSource}
          displayExpr="text"
          label="Select Currency Type"
          labelMode="floating"
          valueExpr="value"
          value={code}
          onValueChanged={(e) => {
            setCode(e?.value);
            getCurrencyExchangeData(e?.value);
          }}
          width={"40%"}
        ></SelectBox>
        <LoadingContainer>{isLoading ? "Loading...." : null} </LoadingContainer>
      </SelectionContainer>
      <CurrencyExchangeContainer>
        <ForeignExchangeGraph dataSource={exchangeRate} code={code} />
      </CurrencyExchangeContainer>
    </Container>
  );
};

export default ForeignExchange;
