import React from "react";

import {
  Grid2 as Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Feat } from "../constants/character";

type FeatsSection = {
  feats: Feat[];
};

function FeatsSection(props: FeatsSection) {
  const { feats } = props;
  if (feats.length === 0) {
    return null;
  }
  return (
    <Grid>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feat</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feats.map((feat) => (
              <TableRow key={feat.name}>
                <TableCell>{feat.name}</TableCell>
                <TableCell>{feat.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default FeatsSection;
