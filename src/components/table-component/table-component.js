import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { FormComponent } from "../form-component/form-component";

const columns = [
  { id: "lastName", label: "Last\u00a0Name", minWidth: 100 },
  { id: "firstName", label: "First\u00a0Name", minWidth: 100 },
  { id: "nickname", label: "Nickname", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 100 },
  { id: "phone1", label: "Phone 1", minWidth: 100 },
  { id: "phone2", label: "Phone 2", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "notes",
    label: "Notes",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(
  lastName,
  firstName,
  nickname,
  address,
  phone1,
  phone2,
  email
) {
  return { lastName, firstName, nickname, address, phone1, phone2, email };
}

const rows = [
  createData(
    "India",
    "IN",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "China",
    "CN",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
  createData(
    "Italy",
    "IT",
    "1324171354",
    "3287263",
    "1324171354",
    "3287263",
    "1324171354"
  ),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100%",
  },
});

export const TableComponent = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <button
        onClick={() => {
          handleOpen();
        }}
        style={{
          backgroundColor: "red",
          color: "white",
          position: "sticky",
        }}
      >
        +
      </button>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    onClick={() => handleOpen()}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <FormComponent open={open} setOpen={setOpen} />
    </Paper>
  );
};
