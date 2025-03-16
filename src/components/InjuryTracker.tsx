import { useContext } from "react";

import {
  Grid2 as Grid,
  Rating,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { STAT_COLORS, NPC, INJURY_LEVELS, PC } from "../constants";
import { Favorite, FavoriteBorder, Info } from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

const InjuryRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: STAT_COLORS.grit,
  },
  "& .MuiRating-iconHover": {
    color: STAT_COLORS.grit,
    filter: "brightness(80%)",
  },
});

type InjuryTrackerProps = {
  character: NPC | PC;
  isNpc: boolean;
};

type InjuryLabelProps = {
  label: string;
  modifier: number;
};
function InjuryLabel(props: InjuryLabelProps) {
  const { label, modifier } = props;
  return (
    <>
      <Typography>{label}</Typography>
      {modifier !== 0 ? `${modifier} penalty to all checks` : null}
    </>
  );
}

function InjuryTracker(props: InjuryTrackerProps) {
  const { character } = props;
  const dispatch = useContext(StateDispatchContext);

  return (
    <Grid container flexDirection="row" alignItems="center" spacing={1}>
      <Grid>
        <InjuryRating
          max={character.maxInjuries}
          value={character.maxInjuries - (character.currentInjuries ?? 0)}
          precision={1}
          icon={<Favorite />}
          emptyIcon={<FavoriteBorder />}
          onChange={(_e: Event, value: null | number) => {
            dispatch?.({
              type: "SET_NPC_INJURY_LEVEL",
              payload: {
                npcId: character.id,
                newInjuryLevel: character.maxInjuries - (value ?? 0),
              },
            });
          }}
        />
      </Grid>
      <Grid>
        <Tooltip
          title={
            <InjuryLabel
              {...INJURY_LEVELS[character.maxInjuries][
                character.currentInjuries ?? 0
              ]}
            />
          }
        >
          <Info fontSize="small" />
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default InjuryTracker;
