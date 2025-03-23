import React from "react";

import { Grid2 as Grid } from "@mui/material";
import StatCard from "./StatCard";
import { Character, STAT_COLORS } from "../../constants";

type statSectionProps = {
  character: Character;
};

function StatSection(props: statSectionProps) {
  const { character } = props;
  const statsArray = character.stats;
  return (
    <Grid
      container
      flexDirection={"row"}
      spacing={4}
      style={{ width: "fit-content", minWidth: "1000px" }}
    >
      <StatCard
        stat={statsArray.forceSensitivity}
        color={STAT_COLORS.forceSensitivity}
        character={character}
      />
      <StatCard
        stat={statsArray.athleticism}
        color={STAT_COLORS.athleticism}
        character={character}
      />
      <StatCard
        stat={statsArray.brains}
        color={STAT_COLORS.brains}
        character={character}
      />
      <StatCard
        stat={statsArray.charm}
        color={STAT_COLORS.charm}
        character={character}
      />
      <StatCard
        stat={statsArray.technician}
        color={STAT_COLORS.technician}
        character={character}
      />
      <StatCard
        stat={statsArray.fight}
        color={STAT_COLORS.fight}
        character={character}
      />
      <StatCard
        stat={statsArray.grit}
        color={STAT_COLORS.grit}
        character={character}
      />
    </Grid>
  );
}

export default StatSection;
