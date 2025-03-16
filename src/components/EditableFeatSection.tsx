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
import { NPC, PC } from "../constants";
import { Add, Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

type EditableFeatsSectionProps = {
  character: NPC | PC;
  isNpc: boolean;
};

function EditableFeatsSection(props: EditableFeatsSectionProps) {
  const { character, isNpc } = props;

  const dispatch = useContext(StateDispatchContext);

  function addNewFeat() {
    dispatch?.({ type: "ADD_BLANK_FEAT", payload: { npcId: character.id } });
  }

  function deleteFeat(featId: string) {
    dispatch?.({
      type: "DELETE_NPC_FEAT",
      payload: { npcId: character.id, featId },
    });
  }

  function makeUpdateFeat(
    field: "name" | "description",
    featId: string
  ): React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      dispatch?.({
        type: "UPDATE_NPC_FEAT",
        payload: {
          npcId: character.id,
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
              {!isNpc ? <TableCell>Feat Cost</TableCell> : null}
              <TableCell>Description</TableCell>
              <TableCell size="small">
                <IconButton onClick={addNewFeat}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(character.feats ?? []).map((feat) => (
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
                {!isNpc ? (
                  <TableCell>
                    <TextField
                      label="Feat Cost"
                      variant="outlined"
                      value={feat.ipCost}
                      multiline
                      fullWidth
                    />
                  </TableCell>
                ) : null}
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
