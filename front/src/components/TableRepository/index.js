import React,{useState,useEffect} from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableRow,
  TablePagination,
  TableFooter,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  TableHead
} from "@material-ui/core";
import TablePaginationActions from './TablePaginationActions'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));




const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function TableCustom() {
  const [rows,setRows] = useState([]);
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(()=>{
    async function get(){

    }

    get();

  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Nome Completo</TableCell>
            <TableCell align="right">Linguagem</TableCell>
            <TableCell align="right">Número(Stars)</TableCell>
            <TableCell align="right">Data de Criação</TableCell>
            <TableCell align="right">Ultima Atualização</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.full_name}>
              <TableCell component="th" scope="row">
                {row.full_name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.language}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.stargazers_count}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.created_at}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.updated_at}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}