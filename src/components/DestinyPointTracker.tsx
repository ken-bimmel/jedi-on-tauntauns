import React, { useContext } from "react";

import { Grid2 as Grid, Rating, styled, Tooltip } from "@mui/material";
import {
  Character,
  MAX_NPC_DESTINY,
  MAX_PC_DESTINY,
  STAT_COLORS,
} from "../constants";
import { HourglassFull, HourglassEmpty } from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

const DestinyRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: STAT_COLORS.forceSensitivity,
  },
  "& .MuiRating-iconHover": {
    color: STAT_COLORS.forceSensitivity,
    filter: "brightness(80%)",
  },
});

type DestinyPointTrackerProps = {
  character: Character;
  isNpc: boolean;
};

function DestinyPointTracker(props: DestinyPointTrackerProps) {
  const { character, isNpc } = props;
  const dispatch = useContext(StateDispatchContext);
  return (
    <Grid>
      <Tooltip title={"Destiny Points"} arrow placement="bottom">
        <DestinyRating
          max={isNpc ? MAX_NPC_DESTINY : MAX_PC_DESTINY}
          value={character.currentDestiny}
          precision={1}
          icon={<HourglassFull />}
          emptyIcon={<HourglassEmpty />}
          onChange={(_e: Event, value: null | number) => {
            dispatch?.({
              type: "SET_CHARACTER_DESTINY_LEVEL",
              payload: {
                isNpc,
                characterId: character.id,
                newDestinyLevel: value,
              },
            });
          }}
        />
      </Tooltip>
    </Grid>
  );
}

export default DestinyPointTracker;
