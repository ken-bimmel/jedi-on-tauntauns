import React, { useContext } from "react";

import {
  Grid2 as Grid,
  IconButton,
  Rating,
  styled,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MAX_NPC_DESTINY, NPC } from "../constants/npc";
import { STAT_COLORS } from "../constants";
import { StateDispatchContext } from "../state/reducerContext";
import {
  Delete,
  Edit,
  HourglassEmpty,
  HourglassFull,
  Save,
} from "@mui/icons-material";

type ActionSectionProps = {
  npc: NPC;
  isEditMode: boolean;
  editModeCallback: React.Dispatch<React.SetStateAction<boolean>>;
};

const InjuryRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: STAT_COLORS.grit,
  },
  "& .MuiRating-iconHover": {
    color: STAT_COLORS.grit,
    filter: "brightness(80%)",
  },
});

const DestinyRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: STAT_COLORS.forceSensitivity,
  },
  "& .MuiRating-iconHover": {
    color: STAT_COLORS.forceSensitivity,
    filter: "brightness(80%)",
  },
});

function ActionsSection(props: ActionSectionProps) {
  const { npc, isEditMode, editModeCallback } = props;
  const dispatch = useContext(StateDispatchContext);
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      spacing={2}
      flexGrow={1}
    >
      <Grid>
        <DestinyRating
          max={MAX_NPC_DESTINY}
          value={npc.currentDestiny}
          precision={1}
          icon={<HourglassFull fontSize="inherit" />}
          emptyIcon={<HourglassEmpty fontSize="inherit" />}
          onChange={(_e: Event, value: null | number) => {
            dispatch?.({
              type: "SET_NPC_DESTINY_LEVEL",
              payload: { npcId: npc.id, newDestinyLevel: value },
            });
          }}
        />
      </Grid>
      <Grid>
        <InjuryRating
          max={npc.maxInjuries}
          value={npc.currentInjuries}
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          onChange={(_e: Event, value: null | number) => {
            dispatch?.({
              type: "SET_NPC_INJURY_LEVEL",
              payload: { npcId: npc.id, newInjuryLevel: value },
            });
          }}
        />
      </Grid>
      <Grid container flexDirection="row">
        <Grid>
          <Tooltip title={isEditMode ? "Save NPC" : "Edit NPC"}>
            <IconButton
              color="primary"
              onClick={() => editModeCallback(!isEditMode)}
            >
              {isEditMode ? <Save /> : <Edit />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Delete NPC">
            <IconButton
              color="error"
              onClick={() => {
                dispatch?.({
                  type: "DELETE_NPC",
                  payload: npc.id,
                });
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ActionsSection;
