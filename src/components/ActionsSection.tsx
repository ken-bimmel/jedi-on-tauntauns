import React from "react";

import { Grid2 as Grid, Rating, styled } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NPC } from "../constants/npc";
import { STAT_COLORS } from "../constants";

type ActionSectionProps = {
  npc: NPC;
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: STAT_COLORS.grit,
  },
  "& .MuiRating-iconHover": {
    color: STAT_COLORS.grit,
    filter: "brightness(80%)",
  },
});

function ActionsSection(props: ActionSectionProps) {
  const { npc } = props;
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-end"
      spacing={2}
    >
      <Grid>
        <StyledRating
          max={npc.maxInjuries}
          defaultValue={npc.currentInjuries}
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          readOnly
        />
      </Grid>
    </Grid>
  );
}

export default ActionsSection;
