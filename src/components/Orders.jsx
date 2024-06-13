import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getPasswords } from "../functions/passwordHandler"
import useAuth from "../hooks/useAuth"

// Generate Order Data

export default function Orders() {
  const { authed } = useAuth();
  let rows = [];

  React.useEffect(() => {
    getPasswords(authed)
  }, [authed]);

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>username</TableCell>
            <TableCell>pwd</TableCell>
            <TableCell>url</TableCell>
            <TableCell>notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.forEach((row, idx) => (
            <TableRow key={idx}>
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
