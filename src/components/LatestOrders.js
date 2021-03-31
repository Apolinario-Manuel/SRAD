import React from "react";
import { Bar } from "react-chartjs-2";
import { Flex } from "@chakra-ui/core";
import createReactClass from "create-react-class";

export default createReactClass({
  displayName: "MixExample",

  render() {
    const options = {
      responsive: true,
      legend: {
        display: true,
        labels: {
          fontColor: "#000",
        },
      },
      labels: {
        fontColor: "#000",
      },
      tooltips: {
        mode: "label",
      },
      elements: {
        line: {
          fill: false,
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },

            labels: this.props.label,
          },
        ],
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false,
            },
            labels: {
              show: true,
            },
          },
          {
            type: "linear",
            display: false,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false,
            },
            labels: {
              show: true,
            },
          },
        ],
      },
    };

    return (
      <Flex
        height="100%"
        backgroundColor="#fff"
        border="1px solid #e7e5e5"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
      >
            <Bar data={this.props.data} options={options} />
      </Flex>
    );
  },
});
