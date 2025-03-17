import React, { useContext } from "react";

import {
  Grid2 as Grid,
  IconButton,
  IconContainerProps,
  Rating,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { STAT_COLORS, INJURY_LEVELS, Character } from "../constants";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { AccountInjury, Bandage, Skull, Sleep } from "mdi-material-ui";
import { StateDispatchContext } from "../state/reducerContext";

const InjuryRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: STAT_COLORS.grit,
  },
  "& .MuiRating-iconHover": {
    color: STAT_COLORS.grit,
    filter: "brightness(80%)",
  },
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: "grey",
  },
});

type InjuryTrackerProps = {
  character: Character;
  isNpc: boolean;
  isEditMode: boolean;
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

function makeIconContainer(maxInjuries: number) {
  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    let icon = <Bandage />;
    if (value === maxInjuries) {
      icon = <Skull />;
    } else if (value === maxInjuries - 1) {
      icon = <Sleep />;
    } else if (value === maxInjuries - 2) {
      icon = <AccountInjury />;
    } else if (value !== 0) {
      icon = <Bandage />;
    }
    return <span {...other}>{icon}</span>;
  }
  return IconContainer;
}

function InjuryTracker(props: InjuryTrackerProps) {
  const { character, isNpc, isEditMode } = props;
  const dispatch = useContext(StateDispatchContext);

  function makeUpdateMaxInjury(changeAmount: number) {
    return () => {
      dispatch?.({
        type: "UPDATE_TOTAL_INJURIES",
        payload: {
          characterId: character.id,
          newMaxInjuries: character.maxInjuries + changeAmount,
        },
      });
    };
  }

  const currentInjuryLevel = character.currentInjuries ?? 0;

  let injuryLevel = INJURY_LEVELS.uninjured;
  if (currentInjuryLevel === character.maxInjuries) {
    injuryLevel = INJURY_LEVELS.dead;
  } else if (currentInjuryLevel === character.maxInjuries - 1) {
    injuryLevel = INJURY_LEVELS.unconscious;
  } else if (currentInjuryLevel === character.maxInjuries - 2) {
    injuryLevel = INJURY_LEVELS.majorInjury;
  } else if (character.currentInjuries !== 0) {
    injuryLevel = INJURY_LEVELS.minorInjury;
  }

  return (
    <Grid container flexDirection="row" alignItems="center" spacing={1}>
      {!isNpc && isEditMode ? (
        <Grid>
          <Tooltip title="Reduce Max Injuries">
            <IconButton onClick={makeUpdateMaxInjury(-1)}>
              <RemoveCircle />
            </IconButton>
          </Tooltip>
        </Grid>
      ) : null}
      <Grid>
        <Tooltip title={<InjuryLabel {...injuryLevel} />}>
          <InjuryRating
            max={character.maxInjuries}
            value={currentInjuryLevel}
            precision={1}
            IconContainerComponent={makeIconContainer(character.maxInjuries)}
            onChange={(_e: Event, value: null | number) => {
              dispatch?.({
                type: "SET_CHARACTER_INJURY_LEVEL",
                payload: {
                  isNpc,
                  characterId: character.id,
                  newInjuryLevel: value,
                },
              });
            }}
          />
        </Tooltip>
      </Grid>
      {!isNpc && isEditMode ? (
        <Grid>
          <Tooltip title="Increase Max Injuries">
            <IconButton onClick={makeUpdateMaxInjury(1)}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default InjuryTracker;
