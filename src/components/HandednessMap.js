// src/HandednessMap.js

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Example color scale
const colorScale = scaleQuantize()
  .domain([0, 100]) // Example domain
  .range([
    "#f7fbff",
    "#deebf7",
    "#c6dbef",
    "#9ecae1",
    "#6baed6",
    "#4292c6",
    "#2171b5",
    "#08519c",
    "#08306b"
  ]);

const HandednessMap = ({ data, stateStatistics }) => {
  const [hoveredState, setHoveredState] = useState(null);

  const handleMouseEnter = (geo) => {
    const stateName = geo.properties.name;
    if (stateStatistics && stateStatistics[stateName]) {
      setHoveredState({
        name: stateName,
        statistics: stateStatistics[stateName]
      });
    } else {
      setHoveredState(null); // Reset if no statistics are available
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  return (
    <div>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const stateName = geo.properties.name;
              const value = data[stateName] || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(value)}
                  stroke="#000000"
                  strokeWidth={0.5}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {hoveredState && (
        <div className="tooltip">
          <p>{hoveredState.name}</p>
          <p>Statistics:</p>
          <ul>
            <li>Right-handed: {hoveredState.statistics.right || 0}</li>
            <li>Left-handed: {hoveredState.statistics.left || 0}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HandednessMap;
