import React from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { NPC } from "../constants";

type NpcListProps = {
  npcs: NPC[];
};

function NpcList(props: NpcListProps) {
  const { npcs } = props;

  function makeScrollHandler(characterId: string) {
    return () => {
      document.getElementById(characterId)?.scrollIntoView({
        behavior: "smooth",
      });
    };
  }

  return (
    <Grid sx={{ position: "sticky", top: "72px" }}>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableCell>
                <Typography variant="h5">Characters</Typography>
              </TableCell>
            </TableHead>
            <TableBody>
              {npcs.map((npc) => (
                <TableRow key={npc.id}>
                  <Tooltip
                    title={`${npc.species} ${npc.role}`}
                    placement="left"
                    arrow
                  >
                    <TableCell
                      style={{ textTransform: "capitalize" }}
                      onClick={makeScrollHandler(npc.id)}
                    >
                      {npc.name}
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

export default NpcList;
