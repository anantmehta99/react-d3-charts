import { memo, useState } from "react";
import "./JourneyLinesWithCirlesAsNodes.scss";
import Header from "../../Header/Header";
import Chart from "./Chart";

const kpiCharters = [
  { title: "All", key: "all" },
  { title: "Aquisition", key: "aquisition" },
  { title: "Retention", key: "retention" },
  { title: "Discovery", key: "discovery" },
  { title: "Monetizatoin", key: "monetizatoin" },
  { title: "Engagement", key: "engagement" },
];

const JourneyLinesWithCirlesAsNodes = (props) => {
  const [activeKPICharter, setActiveKPICharter] = useState(kpiCharters[0].key);
  return (
    <div className="JourneyLinesWithCirlesAsNodes-Container">
      <Header headerTitle="Journey Lines With Circles And Nodes" />
      <div className="kpi-charters-container">
        {kpiCharters.map((element, index) => {
          return (
            <div
              className={`kpi-charter ${
                activeKPICharter === element.key ? "active" : "inactive"
              }`}
              onClick={(e) => setActiveKPICharter(element.key)}
            >
              {element.title}
            </div>
          );
        })}
      </div>
      <div className="chart-container">
        <Chart activeKPICharter={activeKPICharter} />
      </div>
    </div>
  );
};

export default memo(JourneyLinesWithCirlesAsNodes);
