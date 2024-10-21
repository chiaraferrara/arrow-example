/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Arrow from "./Arrow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; /* Distanza tra le card */
  position: relative;
  padding: 20px;
`;

const TopCard = styled.div`
  width: 60%;
  max-width: 600px;
  height: 200px;
  border: 2px solid #e6e6e4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f0;
  font-weight: bold;
  color: #00000;
  border-radius: 8px;
  position: relative;
  z-index: 100;
`;

const BottomCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
`;

const BottomCard = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid #e6e6e4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f0;
  font-weight: bold;
  color: #000000;
  border-radius: 8px;
  position: relative;
  z-index: 100;
`;

const data = [
  {
    id: "solar",
    device: "Identificativo device",
    fasi: ["Fase 0 kw", "Fase 1 kw", "Fase 2 kw"],
    value: "2.50 kW",
  },
  { id: "phase0", label: "Consumo Fase 0", value: "0 kW" },
  { id: "phase1", label: "Consumo Fase 1", value: "1 kW" },
  { id: "phase2", label: "Consumo Fase 2", value: "2 kW" },
];

export default function Dashboard() {
  return (
    <Container>
      <TopCard key={data[0].id} id={data[0].id}>
        <div>{data[0].label}</div>
        <div>{data[0].device}</div>
        {data && data[0].fasi?.map((fase) => <div key={fase}>{fase}</div>)}
        <div>{data[0].value}</div>
      </TopCard>
      <BottomCardsContainer>
        {data.slice(1).map((item) => (
          <BottomCard key={item.id} id={item.id}>
            <div>{item.label}</div>
            <div>{item.value}</div>
          </BottomCard>
        ))}
      </BottomCardsContainer>
      <Arrow fromId="solar" toId="phase0" />
      <Arrow fromId="solar" toId="phase1" />
      <Arrow fromId="solar" toId="phase2" />
    </Container>
  );
}
