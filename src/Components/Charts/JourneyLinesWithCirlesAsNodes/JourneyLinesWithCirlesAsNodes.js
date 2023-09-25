import { memo } from "react";
import "./JourneyLinesWithCirlesAsNodes.scss";
import Header from "../../Header/Header";
import Chart from "./Chart";

const JourneyLinesWithCirlesAsNodes = (props) => {
  return (
    <div className="JourneyLinesWithCirlesAsNodes-Container">
      <Header headerTitle="Journey Lines With Circles And Nodes" />
      <div className="chart-container">
        <Chart />
      </div>
    </div>
  );
};

export default memo(JourneyLinesWithCirlesAsNodes);
