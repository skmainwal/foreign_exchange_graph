import Chart, {
  ArgumentAxis, Font, Label, LoadingIndicator, Series, Size, Title, Tooltip, ValueAxis, VisualRange
} from "devextreme-react/chart";
import styled from "styled-components";
const Container = styled.div`
  width: 90% !important;
  height: 100%;
  
`;
const ForeignExchangeGraph = ({ dataSource, code }) => {
  return (
    <Container>
      <Chart
        id="chart"
        dataSource={dataSource}
        pointSelectionMode="single"
       
        theme="generic.light"
      >
        <LoadingIndicator text={"loading..."}></LoadingIndicator>

        <Title text={`Foreign Exchange Rate 1${code}`}>
          <Font />
        </Title>
        <ArgumentAxis aggregateByCategory={true}></ArgumentAxis>
        <Size height={600}></Size>
        <Tooltip enabled={true} interactive={true} />
        <ArgumentAxis>
          <Title text={"Currency Type"}></Title>

        </ArgumentAxis>
        <ValueAxis
          axisDivisionFactor={20}
          color="#767676"
          logarithmBase={10}
          maxAutoBreakCount={4}
          valueType="numeric"
        >
          <Title text={"Currency Value"}></Title>
          <VisualRange startValue={10} />
        </ValueAxis>

        <Series
          argumentField="arg"
          dashStyle="solid"
          highValueField="high"
          valueField="value"
          type="line"
          color="#1DB2F5"
        >
          <Label visible={true} backgroundColor="#c18e92" />
        </Series>
      </Chart>
    </Container>
  );
};

export default ForeignExchangeGraph;
