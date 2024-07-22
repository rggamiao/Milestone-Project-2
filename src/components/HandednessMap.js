import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const HandednessMap = ({ onStateClick, selectedState, stateFact }) => {
  return (
    <div style={{ position: 'relative' }}>
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter(geo => geo.properties.postal === selectedState) // Only show the selected state
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onStateClick(geo.properties.postal)}
                    style={{
                      default: {
                        fill: "#F53", // Highlight color for the selected state
                        outline: "none"
                      },
                      hover: { fill: "#FF5733", outline: "none" }, // Color on hover
                      pressed: { fill: "#E42", outline: "none" },
                    }}
                  />
                ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {selectedState && stateFact && (
        <div className="state-fact-annotation">
          <h3>{selectedState}</h3>
          <p>{stateFact}</p>
        </div>
      )}
    </div>
  );
};

export default HandednessMap;