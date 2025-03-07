import React, { useContext } from "react";

import {
  Grid2 as Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { NPC } from "../constants/npc";
import { Add, Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

type EditableFeatsSectionProps = {
  npc: NPC;
};

function EditableFeatsSection(props: EditableFeatsSectionProps) {
  const { npc } = props;

  const dispatch = useContext(StateDispatchContext);

  function addNewFeat() {
    dispatch?.({ type: "ADD_BLANK_FEAT", payload: { npcId: npc.id } });
  }

  function deleteFeat(featId: string) {
    dispatch?.({ type: "DELETE_NPC_FEAT", payload: { npcId: npc.id, featId } });
  }

  function makeUpdateFeat(
    field: "name" | "description",
    featId: string
  ): React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      dispatch?.({
        type: "UPDATE_NPC_FEAT",
        payload: {
          npcId: npc.id,
          featId,
          newName: field === "name" ? event.target.value : undefined,
          newDescription:
            field === "description" ? event.target.value : undefined,
        },
      });
    };
  }

  return (
    <Grid>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feat</TableCell>
              <TableCell>Description</TableCell>
              <TableCell size="small">
                <IconButton onClick={addNewFeat}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(npc.feats ?? []).map((feat) => (
              <TableRow key={feat.id}>
                <TableCell>
                  <TextField
                    label="Feat Name"
                    variant="outlined"
                    value={feat.name}
                    onChange={makeUpdateFeat("name", feat.id)}
                    multiline
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Feat Description"
                    variant="outlined"
                    value={feat.description}
                    onChange={makeUpdateFeat("description", feat.id)}
                    multiline
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => deleteFeat(feat.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default EditableFeatsSection;
