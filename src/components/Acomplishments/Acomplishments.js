import React, { useEffect, useState } from "react";

import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AcomplishmentsStyles";
import axios from "axios";

const defaultData = [
  { number: 6, text: "Real World Business Project" },
  { number: 10, text: "Trained new interns" },
  { number: 30, text: "Github Open Source Project" },
  { number: 2, text: "Github Stars" },
];

const Acomplishments = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    (async () => {
      const { data: userData } = await getFollowers();
      // console.log(userData);
      if (userData) {
        const newFollowers = data.map((obj) => {
          if (obj.text === "Github Followers") {
            return { ...obj, number: userData.followers };
          }
          return obj;
        });
        setData(newFollowers);
      }
    })();
  }, []);

  return (
    <Section>
      <SectionTitle>Personal Achievements</SectionTitle>
      <Boxes>
        {data.map((card, index) => (
          <Box key={index}>
            <BoxNum>{`${card.number}+`}</BoxNum>
            <BoxText>{card.text}</BoxText>
          </Box>
        ))}
      </Boxes>
      <SectionDivider />
    </Section>
  );
};

export default Acomplishments;

const getFollowers = () => {
  return axios.get(
    "https://api.github.com/users/tanv33"
    // "https://api.github.com/users/tanv33/followers?per_page=100"
  );
};
