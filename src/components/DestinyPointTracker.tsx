import { useContext } from "react";

import { Grid2 as Grid, Rating, styled, Tooltip } from "@mui/material";
import {
  MAX_NPC_DESTINY,
  MAX_PC_DESTINY,
  NPC,
  PC,
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
  character: NPC | PC;
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
              type: "SET_NPC_DESTINY_LEVEL",
              payload: { npcId: character.id, newDestinyLevel: value },
            });
          }}
        />
      </Tooltip>
    </Grid>
  );
}

export default DestinyPointTracker;
