import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useNavigate } from "react-router-dom";

import "./JapanMap.css";

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

const JapanMap = ({ allPrefectures }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create map instance
    const chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/japanLow.json";
    chart.geodataSource.events.on("parseended", (event) => {
      let data = [];
      for (let i = 0; i < event.target.data.features.length; i++) {
        data.push({
          id: event.target.data.features[i].id,
          value: Math.round(Math.random() * 10000)
        });
      }
      polygonSeries.data = data;
    });

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 1;

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.mapPolygons.template.strokeWidth = 0.5;

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#aac4e7");

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Create active state
    const activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = chart.colors.getIndex(1);

    // Create an event to toggle "active" state
    polygonTemplate.events.on("hit", (event) => {
      const prefectureName = event.target.dataItem.dataContext.name;
      const prefectureClicked = allPrefectures.find(prefecture => prefecture.prefecture_name === prefectureName);
      const prefectureClickedId = prefectureClicked.id;

      navigate(`/prefectures/${prefectureClickedId}`);

      event.target.isActive = !event.target.isActive;
    });

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [allPrefectures, navigate]);

  return (
    <div>
      <div id="chartdiv" style={{ maxWidth: "100%", height: "750px", marginLeft: "0px" }}></div>
    </div>
  );
};

export default JapanMap;