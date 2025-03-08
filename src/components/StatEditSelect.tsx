import {
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DieSize, Stat, StatsArray } from "../constants/character";
import { useContext } from "react";
import { StateDispatchContext } from "../state/reducerContext";

type StatEditSelectProps = {
  stat: Stat;
  statKey: keyof StatsArray;
  npcId: string;
};

function StatEditSelect(props: StatEditSelectProps) {
  const { stat, statKey, npcId } = props;

  const dispatch = useContext(StateDispatchContext);

  function updateStat(event: SelectChangeEvent<DieSize>) {
    const newStat: Stat = {
      ...stat,
      value: event.target.value as DieSize,
    };
    dispatch?.({
      type: "UPDATE_NPC_STAT_PROPERTY",
      payload: {
        npcId,
        statKey,
        newStat,
      },
    });
  }

  return (
    <Grid>
      <FormControl>
        <InputLabel id={`${npcId}-${stat.name}`}>{stat.name}</InputLabel>
        <Select
          labelId={`${npcId}-${stat.name}`}
          value={stat.value}
          label={stat.name}
          onChange={updateStat}
          style={{ minWidth: "125px" }}
        >
          {stat.name === "Force Sensitivity" ? (
            <MenuItem value={0}>0</MenuItem>
          ) : null}
          <MenuItem value={4}>d4</MenuItem>
          <MenuItem value={6}>d6</MenuItem>
          <MenuItem value={8}>d8</MenuItem>
          <MenuItem value={10}>d10</MenuItem>
          <MenuItem value={12}>d12</MenuItem>
          <MenuItem value={20}>d20</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

export default StatEditSelect;
