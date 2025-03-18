import React, { useContext } from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { PC } from "../constants";
import { PlusCircle } from "mdi-material-ui";
import { StateDispatchContext } from "../state/reducerContext";

type PcListProps = {
  pcs: PC[];
  activePcId: string;
};

function PcList(props: PcListProps) {
  const { pcs, activePcId } = props;

  const dispatch = useContext(StateDispatchContext);

  function makeLoadHandler(characterId: string) {
    return () => {
      dispatch?.({ type: "SET_ACTIVE_PC", payload: characterId });
    };
  }

  return (
    <Grid sx={{ position: "sticky", top: "72px" }}>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableCell>
                <Grid container flexDirection="row" spacing={1}>
                  <Grid>
                    <Typography variant="h5">Characters</Typography>
                  </Grid>
                  <Grid>
                    <Tooltip title="Create a new character" arrow>
                      <IconButton
                        onClick={() => dispatch?.({ type: "ADD_PC" })}
                      >
                        <PlusCircle />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </TableCell>
            </TableHead>
            <TableBody>
              {pcs.map((pc) => (
                <TableRow
                  key={pc.id}
                  style={
                    pc.id === activePcId
                      ? { background: "darkGrey" }
                      : undefined
                  }
                >
                  <Tooltip title={`${pc.totalIp}IP`} placement="left" arrow>
                    <TableCell
                      style={{ textTransform: "capitalize" }}
                      onClick={makeLoadHandler(pc.id)}
                    >
                      {pc.name}
                    </TableCell>
                  </Tooltip>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PcList;
