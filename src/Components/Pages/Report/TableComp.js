import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableComp = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Expense</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={1}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              20/01/2022
            </TableCell>
            <TableCell align="right">Bike</TableCell>
            <TableCell align="right">Petrol</TableCell>
            <TableCell align="right">200</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
