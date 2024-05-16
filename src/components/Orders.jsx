import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { get } from "../functions/passwordHandler";

// Generate Order Data


const rows = get();

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>type</TableCell>
            <TableCell>username</TableCell>
            <TableCell>pwd</TableCell>
            <TableCell>url</TableCell>
            <TableCell>notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.pwd}</TableCell>
              <TableCell>{row.url}</TableCell>
              <TableCell>{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
