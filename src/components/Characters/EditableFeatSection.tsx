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
import { Character } from "../../constants";
import { Add, Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";

type EditableFeatsSectionProps = {
  character: Character;
  isNpc: boolean;
};

function EditableFeatsSection(props: EditableFeatsSectionProps) {
  const { character, isNpc } = props;

  const dispatch = useContext(StateDispatchContext);

  function addNewFeat() {
    dispatch?.({
      type: "ADD_BLANK_FEAT",
      payload: { isNpc, characterId: character.id },
    });
  }

  function deleteFeat(featId: string) {
    dispatch?.({
      type: "DELETE_CHARACTER_FEAT",
      payload: { isNpc, characterId: character.id, featId },
    });
  }

  function makeUpdateFeat(
    field: "name" | "description" | "ipCost",
    featId: string
  ): React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      dispatch?.({
        type: "UPDATE_CHARACTER_FEAT",
        payload: {
          isNpc,
          characterId: character.id,
          featId,
          newName: field === "name" ? event.target.value : undefined,
          newDescription:
            field === "description" ? event.target.value : undefined,
          newIpCost:
            field === "ipCost" ? parseInt(event.target.value) || 0 : undefined,
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
              {!isNpc ? <TableCell size="small">Feat Cost</TableCell> : null}
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
                    fullWidth
                  />
                </TableCell>
                {!isNpc ? (
                  <TableCell size="small">
                    <TextField
                      label="Feat Cost"
                      type="number"
                      variant="outlined"
                      value={feat.ipCost}
                      onChange={makeUpdateFeat("ipCost", feat.id)}
                      style={{ maxWidth: "86px" }}
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
