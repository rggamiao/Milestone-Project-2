import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Annotation } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = scaleQuantize()
  .domain([0, 100])
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

const HandednessMap = ({ data, stateStatistics, onStateClick }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [mapStatus, setMapStatus] = useState('loading');

  useEffect(() => {
    console.log("stateStatistics:", stateStatistics);
    console.log("data:", data);
    
    if (stateStatistics === undefined && data === undefined) {
      setMapStatus('noData');
    } else if (stateStatistics === undefined) {
      setMapStatus('noStatistics');
    } else if (Object.keys(stateStatistics).length === 0) {
      setMapStatus('emptyStatistics');
    } else {
      setMapStatus('ready');
    }
  }, [stateStatistics, data]);

  const handleMouseEnter = (geo) => {
    const stateName = geo.properties.name;
    if (stateStatistics && stateStatistics[stateName]) {
      setHoveredState({
        name: stateName,
        statistics: stateStatistics[stateName]
      });
    } else {
      setHoveredState(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const handleClick = (geo) => {
    const stateName = geo.properties.name;
    const stateCode = geo.properties.iso_3166_2;

    console.log("Clicked state:", stateName);

    if (!stateStatistics) {
      console.warn("stateStatistics is undefined");
      return;
    }

    const stateStats = stateStatistics[stateName];

    if (stateStats) {
      setSelectedState({
        name: stateName,
        statistics: stateStats,
        coordinates: [geo.properties.longitude, geo.properties.latitude]
      });
      onStateClick(stateCode);
    } else {
      console.warn(`No statistics available for state: ${stateName}`);
    }
  };

  return (
    <div>
      <div>Map Status: {mapStatus}</div>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const stateName = geo.properties.name;
              const value = data && data[stateName] ? data[stateName] : 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(value)}
                  stroke="#000000"
                  strokeWidth={0.5}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(geo)}
                  style={{
                    hover: {
                      fill: "rgba(75,192,192,1)",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
        {selectedState && (
          <Annotation
            subject={selectedState.coordinates}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#FF5533",
              strokeWidth: 3,
              strokeLinecap: "round"
            }}
          >
            <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              {selectedState.name}
            </text>
            <text x="-8" y="10" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              Right: {selectedState.statistics.right}
            </text>
            <text x="-8" y="20" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              Left: {selectedState.statistics.left}
            </text>
          </Annotation>
        )}
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