import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart() {
  return (
    <ComposableMap>
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
