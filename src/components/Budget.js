import React from "react";
import { Flex } from "@chakra-ui/core";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Aprovados", "Reprovados"],
  datasets: [
    {
      data: [50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const Budget = (props) => {
  console.log(props);
  return (
    <>
      <Flex
        height="100%"
        border="1px solid #e7e5e5"
        backgroundColor="#fff"
        borderRadius="md"
        align="center"
        justify="center"
      >
        <Doughnut
          options={{
            legend: {
              display: true,
              labels: {
                fontColor: "#000",
              },
            },
          }}
          data={props.data}
          height="250"
        />
      </Flex>
    </>
  );
};

export default Budget;
