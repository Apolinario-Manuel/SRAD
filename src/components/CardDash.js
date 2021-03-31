import React from "react";
import { Flex, Heading, Link } from "@chakra-ui/core";

const CardDash = (props) => {
  return (
    <>
      <Flex
        height="100%"
        backgroundColor="#fff"
        borderRadius="md"
        flexDir="column"
        align="center"
        justify="center"
        padding={10}
      >
        <Link
          alignSelf="center"
          fontSize="sm"
          color="#000"
          fontWeight="bold"
          textDecoration="none"
        >
          <Heading lineHeight="shorter">{props.number}</Heading>
        </Link>

        <Link
          alignSelf="center"
          fontSize="sm"
          color="#000"
          fontWeight="bold"
          textDecoration="none"
        >
          <Heading size="lg" lineHeight="shorter">
            {props.label}
          </Heading>
        </Link>
      </Flex>
    </>
  );
};

export default CardDash;
