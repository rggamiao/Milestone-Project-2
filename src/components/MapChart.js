import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart({ annotation, onMouseEnter, onMouseLeave }) {
  return (
    <ComposableMap>
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => onMouseEnter(geo)}
                onMouseLeave={onMouseLeave}
                style={{
                  default: { fill: "#D6D6DA", outline: "#FFFFFF" },
                  hover: { fill: "#F53", outline: "#FFFFFF" },
                  pressed: { fill: "#E42", outline: "#FFFFFF" }
                }}
              />
            ))
          }
        </Geographies>
        {annotation && (
          <Annotation
          subject={[2.3522, 48.8566]}
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {"Paris"}
          </text>
        </Annotation>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
}