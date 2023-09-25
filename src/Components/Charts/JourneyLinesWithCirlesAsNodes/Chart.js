import { memo, useLayoutEffect, useRef, useState } from "react";
import dataForJourneyLinesAndNodesChart from "./Data";
import * as d3 from "d3";

const Chart = (props) => {
  const xPosition = 125,
    yPosition = 400;
  const [nodeDataRaw, setNodeDataRaw] = useState([
    {
      id: "organicTraffic",
      x: xPosition - 100,
      y: yPosition - 375,
      value: 70.38,
      name: "Organic",
      absoluteValue: 66.3,
      percentageValue: 46,
      percentageChage: -2,
      parent: null,
      child: "retention",
      self: "aquisition",
    },
    {
      id: "paidTraffic",
      x: xPosition + 125,
      y: yPosition - 375,
      value: 79.11,
      name: "Paid",
      absoluteValue: 77.9,
      percentageValue: 54,
      percentageChage: 6,
      parent: null,
      child: "retention",
      self: "aquisition",
    },
    {
      id: "returningUsers",
      x: xPosition - 100,
      y: yPosition - 175,
      value: 12.91,
      name: "Returning Users",
      absoluteValue: 15,
      percentageValue: 25,
      percentageChage: 10,
      parent: "aquisition",
      child: "",
      self: "retention",
    },
    {
      id: "newUsers",
      x: xPosition + 125,
      y: yPosition - 175,
      value: 12.91,
      name: "New Users",
      absoluteValue: 51,
      percentageValue: 75,
      percentageChage: -3,
      parent: "aquisition",
      child: "",
      self: "retention",
    },
    {
      id: "anonymous",
      x: xPosition - 100,
      y: yPosition + 20,
      value: 86.71,
      name: "Anonymous",
      absoluteValue: 31,
      percentageValue: 82,
      percentageChage: -12,
      self: "retention",
      child: "discovery",
    },
    {
      id: "signUps",
      x: xPosition + 125,
      y: yPosition + 20,
      value: 33.21,
      name: "Sign Up",
      absoluteValue: 66.3,
      percentageValue: 18,
      percentageChage: 7,
      parent: "",
      self: "retention",
      child: "discovery",
    },
    {
      id: "explore",
      x: xPosition - 35,
      y: yPosition + 245,
      value: 86.71,
      name: "Explore",
      absoluteValue: 66.3,
      percentageValue: 50,
      percentageChage: 5,
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    },
    {
      id: "search",
      x: xPosition + 55,
      y: yPosition + 245,
      value: 33.21,
      name: "Search",
      absoluteValue: 66.3,
      percentageValue: 20,
      percentageChage: -20,
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    },
    {
      id: "signUpExit",
      x: xPosition + 125,
      y: yPosition + 245,
      value: 55.55,
      name: "Exit",
      absoluteValue: 66.3,
      percentageValue: 27,
      percentageChage: 13,
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    },
    {
      id: "anonymousExit",
      x: xPosition - 100,
      y: yPosition + 245,
      value: 55.55,
      name: "Exit",
      absoluteValue: 66.3,
      percentageValue: 3,
      percentageChage: -0,
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    },
    {
      id: "subscribers",
      x: xPosition - 25,
      y: yPosition + 455,
      value: 86.71,
      name: "Subscribed",
      absoluteValue: 54,
      percentageValue: "--",
      percentageChage: -2,
      parent: "discovery",
      child: "engagement",
      self: "monetizatoin",
    },
    {
      id: "watchedAds",
      x: xPosition + 50,
      y: yPosition + 455,
      value: "--",
      name: "Watched Ads",
      absoluteValue: 66.3,
      percentageValue: "--",
      percentageChage: "--",
      parent: "discovery",
      child: "engagement",
      self: "monetizatoin",
    },
    {
      id: "searchExit",
      x: xPosition + 125,
      y: yPosition + 455,
      value: "--",
      name: "Exit",
      absoluteValue: 66.3,
      percentageValue: "--",
      percentageChage: "--",
      parent: "discovery",
      child: "engagement",
      self: "monetizatoin",
    },
    {
      id: "exploreExit",
      x: xPosition - 100,
      y: yPosition + 455,
      value: "--",
      name: "Exit",
      absoluteValue: 66.3,
      percentageValue: "--",
      percentageChage: "--",
      parent: "discovery",
      child: "engagement",
      self: "monetizatoin",
    },
    {
      id: "watchedPremiumContent",
      x: xPosition - 25,
      y: yPosition + 625,
      value: "--",
      name: "Watch Premium Content",
      absoluteValue: 66.3,
      percentageValue: "--",
      percentageChage: -2,
      parent: "monetizatoin",
      child: null,
      self: "engagement",
    },
    {
      id: "watchedFreeContent",
      x: xPosition + 50,
      y: yPosition + 625,
      value: "--",
      name: "Watch Free Content",
      absoluteValue: 66.3,
      percentageValue: "--",
      percentageChage: -2,
      parent: "monetizatoin",
      child: null,
      self: "engagement",
    },
  ]);
  const [linkData, setLinkData] = useState([
    {
      source: [xPosition - 100, yPosition - 365],
      target: [xPosition + 125, yPosition - 185],
      fill: "#74CDFF",
      parent: "",
      self: "aquisition",
      child: "retention",
    }, //Organic - New
    {
      source: [xPosition - 100, yPosition - 365],
      target: [xPosition - 100, yPosition - 185],
      fill: "#74CDFF",
      parent: "",
      self: "aquisition",
      child: "retention",
    }, //Orgainc - Returning
    {
      source: [xPosition + 125, yPosition - 365],
      target: [xPosition - 100, yPosition - 185],
      fill: "#768CFF",
      parent: "",
      self: "aquisition",
      child: "retention",
    }, //Paid - Returning
    {
      source: [xPosition + 125, yPosition - 365],
      target: [xPosition + 125, yPosition - 185],
      fill: "#768CFF",
      parent: "",
      self: "aquisition",
      child: "retention",
    }, //Paid - New
    {
      source: [xPosition - 100, yPosition - 165],
      target: [xPosition - 100, yPosition + 10],
      fill: "#FFB78E",
      parent: "",
      child: "",
      self: "retention",
    }, //Returning - Anonymous
    {
      source: [xPosition - 100, yPosition - 165],
      target: [xPosition + 125, yPosition + 10],
      fill: "#FFB78E",
      parent: "",
      child: "",
      self: "retention",
    }, //Returning - Sign up
    {
      source: [xPosition + 125, yPosition - 165],
      target: [xPosition - 100, yPosition + 10],
      fill: "#74CDFF",
      parent: "",
      child: "",
      self: "retention",
    }, //New - Anonymous
    {
      source: [xPosition + 125, yPosition - 165],
      target: [xPosition + 125, yPosition + 10],
      fill: "#74CDFF",
      parent: "",
      child: "",
      self: "retention",
    }, //New - Sign up
    {
      source: [xPosition - 100, yPosition + 30],
      target: [xPosition - 35, yPosition + 235],
      fill: "#768CFF",
      parent: "",
      child: "discovery",
      self: "",
    }, //Anonymous - Explore
    {
      source: [xPosition - 100, yPosition + 30],
      target: [xPosition + 55, yPosition + 235],
      fill: "#768CFF",
      parent: "",
      child: "discovery",
      self: "",
    }, //Anonymous - Search
    {
      source: [xPosition - 100, yPosition + 30],
      target: [xPosition - 100, yPosition + 235],
      fill: "#FF96A6",
      parent: "",
      child: "discovery",
      self: "",
    }, //Anonymous - Exit
    {
      source: [xPosition - 100, yPosition + 30],
      target: [xPosition - 25, yPosition + 445],
      fill: "#768CFF",
      parent: "",
      child: "discovery",
      self: "",
    }, //Anonymous - Subscribed
    {
      source: [xPosition + 125, yPosition + 30],
      target: [xPosition - 35, yPosition + 235],
      fill: "#74CDFF",
      parent: "",
      child: "discovery",
      self: "",
    }, //Sign up - Explore
    {
      source: [xPosition + 125, yPosition + 30],
      target: [xPosition + 55, yPosition + 235],
      fill: "#74CDFF",
      parent: "",
      child: "discovery",
      self: "",
    }, //Sign up - Search
    {
      source: [xPosition + 125, yPosition + 30],
      target: [xPosition + 125, yPosition + 235],
      fill: "#FF96A6",
      parent: "",
      child: "discovery",
      self: "",
    }, //Sign up - Exit
    {
      source: [xPosition - 35, yPosition + 255],
      target: [xPosition - 25, yPosition + 445],
      fill: "#768CFF",
      parent: "discovery",
      child: "monetizatoin",
    }, //Explore - Subscribed
    {
      source: [xPosition - 35, yPosition + 255],
      target: [xPosition + 50, yPosition + 445],
      fill: "#768CFF",
      parent: "discovery",
      child: "monetizatoin",
    }, //Explore - WatchAds
    {
      source: [xPosition - 35, yPosition + 255],
      target: [xPosition - 100, yPosition + 445],
      fill: "#FF96A6",
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    }, //Explore - Exit
    {
      source: [xPosition + 55, yPosition + 255],
      target: [xPosition - 25, yPosition + 445],
      fill: "#FFB78E",
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    }, //Search - Subscribed
    {
      source: [xPosition + 55, yPosition + 255],
      target: [xPosition + 50, yPosition + 445],
      fill: "#FFB78E",
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    }, //Search - WatchAds
    {
      source: [xPosition + 55, yPosition + 255],
      target: [xPosition + 125, yPosition + 445],
      fill: "#FF96A6",
      parent: "",
      child: "monetizatoin",
      self: "discovery",
    }, //Search - Exit
    {
      source: [xPosition - 25, yPosition + 465],
      target: [xPosition - 25, yPosition + 615],
      fill: "#FFB78E",
      parent: "",
      self: "monetizatoin",
      child: "engagement",
    }, //Subscribed - Watch Premium Content
    {
      source: [xPosition - 25, yPosition + 465],
      target: [xPosition + 50, yPosition + 615],
      fill: "#FFB78E",
      parent: "",
      self: "monetizatoin",
      child: "engagement",
    }, //Subscribed - Watch Free Content
    {
      source: [xPosition + 50, yPosition + 465],
      target: [xPosition + 50, yPosition + 615],
      fill: "#768CFF",
      parent: "",
      self: "monetizatoin",
      child: "engagement",
    }, //Watched Ads - Watch Free Content
    {
      source: [xPosition + 50, yPosition + 465],
      target: [xPosition - 25, yPosition + 615],
      fill: "#768CFF",
      parent: "",
      self: "monetizatoin",
      child: "engagement",
    }, //Watched Ads - Watch Premium Content
  ]);

  const svgRef = useRef();

  const tooltipArray = [
    {
      id: "organicTraffic",
      text: "Users visiting the platform over the period of study that were acquired organically",
    },
    {
      id: "paidTraffic",
      text: "Users visiting the platform over the period of study that were acquired through Paid sources",
    },
    {
      id: "returningUsers",
      text: "Users re-visiting the platform over the period of study",
    },
    {
      id: "newUsers",
      text: "Users visiting the platform over the period of study that have not visited earlier",
    },
  ];

  useLayoutEffect(() => {
    if (nodeDataRaw && linkData) {
      let consumerJourneyTitles = [
        {
          id: "acquisition",
          name: "Acquisition",
          x: 35,
          y: 10,
        },
        {
          id: "retention",
          name: "Retention",
          x: 225,
          y: 10,
        },
        {
          id: "onboarding",
          name: "Onboarding",
          x: 420,
          y: 10,
        },
        {
          id: "discovery",
          name: "Discovery",
          x: 645,
          y: 10,
        },
        {
          id: "monetisation",
          name: "Monetisation",
          x: 855,
          y: 10,
        },
        {
          id: "engagement",
          name: "Engagement",
          x: 1025,
          y: 10,
        },
      ];

      let divider = dataForJourneyLinesAndNodesChart.filter(
        (item, index) => item.kpi === "mau"
      )[0];
      var nodeData = nodeDataRaw.map((item, index) => {
        let newObject = item;
        dataForJourneyLinesAndNodesChart.map((ele, index) => {
          if (ele.kpi === item.id) {
            newObject = {
              ...item,
              value: (ele.currentPeriodValue / 1000000).toFixed(2),
              percentageValue: (
                (ele.currentPeriodValue / divider.currentPeriodValue) *
                100
              ).toFixed(0),
              percentageChage: ele.precentageChange
                ? (parseFloat(ele.precentageChange) * 100).toFixed(1)
                : "Data N.A.",
            };
          }
        });
        return newObject;
      });

      var link = d3
        .linkHorizontal()
        .source(function (d) {
          return [d.source[1], d.source[0]];
        })
        .target(function (d) {
          return [d.target[1], d.target[0]];
        });

      var linkForShadow = d3
        .linkHorizontal()
        .source(function (d) {
          return [d.source[1], d.source[0]];
        })
        .target(function (d) {
          return [d.target[1], d.target[0]];
        });

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", "0 0 1100 305")
        .classed("journey-line-node-chart-container", true);

      svg.selectAll("*").remove();

      svg
        .selectAll("path")
        .data(linkData)
        .join("path")
        .attr("d", link)
        .attr("fill", "none")
        .attr("stroke", (d) => d.fill)
        .attr("stroke-width", "11px")
        .attr("opacity", "0.6")
        .classed("link", true);

      var defs = svg.append("defs");

      var filter = defs
        .append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

      filter
        .append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

      filter
        .append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 5)
        .attr("result", "offsetBlur");

      var feMerge = filter.append("feMerge");

      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      const line = svg
        .append("g")
        .selectAll("path")
        .data(linkData)
        .join("path")
        .attr("d", linkForShadow)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", "11px")
        .attr("opacity", "0.2")
        .classed("linkforshadow", true)
        .style("filter", "url(#drop-shadow)");

      //Adding the Circle nodes
      svg
        .selectAll("circle")
        .data(nodeData)
        .join("circle")
        .attr("r", (d) => (d.name === "Exit" ? 0 : 5.5))
        .attr("cx", (d) => d.y)
        .attr("cy", (d) => d.x)
        .attr("fill", "#3E1F76")
        .attr("opacity", "0.8")
        // .classed("circle", true)
        .classed(
          (d) => (tooltipArray.find((e) => e.id === d.id) ? "circle" : ""),
          true
        );

      //Adding the text labels
      svg
        .selectAll("text")
        .data(nodeData)
        .join("text")
        .attr("font-size", "16px")
        .attr("fill", "#333333")
        .attr("text-anchor", "middle")
        .attr("x", (d) => (d.name === "Exit" ? d.y + 3 : d.y))
        .attr("y", (d) => (d.name === "Exit" ? d.x + 2 : d.x + 17))
        .classed("node-title", true)
        .text((d) => d.name);

      svg
        .selectAll("p")
        .data(nodeData)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("x", (d) => (d.name === "Exit" ? d.y + 3 : d.y))
        .attr("y", (d) => (d.name === "Exit" ? d.x + 36 : d.x + 48))
        .attr("fill", "#808080")
        .classed("node-value", true)
        .text((d) => parseFloat(d.value).toFixed(1));

      svg
        .selectAll("p")
        .data(nodeData)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("x", (d) => (d.name === "Exit" ? d.y + 3 : d.y))
        .attr("y", (d) => (d.name === "Exit" ? d.x + 22 : d.x + 35))
        .classed("node-percentage", true)
        .attr("fill", "#333333")
        .text((d) => `${d.percentageValue}%`);

      svg
        .selectAll("p")
        .data(nodeData)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("x", (d) => (d.name === "Exit" ? d.y + 32 : d.y + 32))
        .attr("y", (d) => (d.name === "Exit" ? d.x + 35 : d.x + 47))
        .text(
          (d) =>
            `${d.percentageChage !== "Data N.A." ? d.percentageChage : "--"}%`
        )
        .attr("class", (d) =>
          d.percentageChage >= 0
            ? "node-percentage-change-pos"
            : "node-percentage-change-neg"
        );

      svg
        .selectAll("p")
        .data(consumerJourneyTitles)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .classed("journey-line-node-chart-sections", true)
        .text((d) => `${d.name}`);
    }
  }, [dataForJourneyLinesAndNodesChart, nodeDataRaw, linkData]);

  return (
    <div className="journey-line-node-chart-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default memo(Chart);
