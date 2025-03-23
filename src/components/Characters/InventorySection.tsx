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
import { PC } from "../../constants";
import { Add, Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";

type InventorySectionProps = {
  character: PC;
  isEditMode: boolean;
};

function InventorySection(props: InventorySectionProps) {
  const { character, isEditMode } = props;

  const dispatch = useContext(StateDispatchContext);

  function addNewItem() {
    dispatch?.({
      type: "ADD_INVENTORY_ITEM",
      payload: { characterId: character.id },
    });
  }

  function deleteItem(itemId: string) {
    dispatch?.({
      type: "DELETE_INVENTORY_ITEM",
      payload: { characterId: character.id, itemId },
    });
  }

  function makeUpdateItem(
    field: "name" | "description",
    itemId: string
  ): React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      dispatch?.({
        type: "UPDATE_INVENTORY_ITEM",
        payload: {
          characterId: character.id,
          itemId,
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
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              {isEditMode ? (
                <TableCell size="small" align="right">
                  <IconButton onClick={addNewItem}>
                    <Add />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {(character.inventory ?? []).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {isEditMode ? (
                    <TextField
                      label="Item Name"
                      variant="outlined"
                      value={item.name}
                      onChange={makeUpdateItem("name", item.id)}
                      fullWidth
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode ? (
                    <TextField
                      label="Item Description"
                      variant="outlined"
                      value={item.description}
                      onChange={makeUpdateItem("description", item.id)}
                      fullWidth
                    />
                  ) : (
                    item.description
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell
                    size="small"
                    align="right"
                    style={{ maxWidth: "86px" }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default InventorySection;
