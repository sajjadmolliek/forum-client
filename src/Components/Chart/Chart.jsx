/* eslint-disable react/prop-types */

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const size = {
  width: 550,
  height: 350,
};

const Chart = ({ all }) => {

  const data = [
    { value: all.usersLength, label: "Users" },
    { value: all.postsLength, label: "Posts" },
    { value: all.commentsLength, label: "Comments" },
  ];
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
};

export default Chart;
