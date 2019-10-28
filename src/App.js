import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import GiftDonut from './GiftDonut';
import Tooltip, { TooltipContext } from './Tooltip.js';
import './styles.css';
import chroma from 'chroma-js';

const TooltipP = styled.p`
  background: ${chroma('green')
    .brighten()
    .hex()};
  border-radius: 3px;
  padding: 1em;
`;

function useData(loadData) {
  const [data, setData] = useState(null);

  useEffect(
    () => {
      loadData(setData);
    },
    [!data]
  );

  return data;
}

function App() {
  const data = useData(setData =>
    d3
      .csv('/data.csv', d => ({
        gift: d.gift,
        percentage: Number(d.percentage)
      }))
      .then(setData)
  );
  console.log(data);

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: '',
    orientLeft: false
  });

  return (
    <div className="App">
      <h1>What The Kids want for Xmas</h1>
      <h2>Deeper into Hooks with D3</h2>
      <TooltipContext.Provider value={{ ...tooltip, setTooltip }}>
        <svg width="800" height="800">
          {data && <GiftDonut data={data} x={350} y={250} r={150} />}
          <Tooltip width={150} height={60}>
            <TooltipP>{tooltip.content}</TooltipP>
          </Tooltip>
        </svg>
      </TooltipContext.Provider>
    </div>
  );
}

export default App;
