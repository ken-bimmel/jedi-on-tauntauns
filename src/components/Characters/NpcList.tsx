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
import { NPC } from "../../constants";
import { groupNpcs } from "../../utilities/npcGrouper";

type NpcListProps = {
  npcs: NPC[];
};

function NpcList(props: NpcListProps) {
  const { npcs } = props;
  const groupedNpcs = groupNpcs(npcs);

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
              <TableRow>
                <TableCell>
                  <Typography variant="h5">Characters</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groupedNpcs)
                .sort()
                .map((group) => (
                  <>
                    <TableRow key={group}>
                      <TableCell>
                        <Typography variant="h6">{group}</Typography>
                      </TableCell>
                    </TableRow>
                    {groupedNpcs[group].map((npc) => (
                      <TableRow key={npc.id}>
                        <Tooltip
                          title={`${npc.disposition} ${npc.species} ${npc.role}`}
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
                  </>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default NpcList;
