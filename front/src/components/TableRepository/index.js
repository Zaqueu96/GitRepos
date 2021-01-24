import React, { useState, useEffect, useCallback } from "react";
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
  TableHead,
} from "@material-ui/core";
import TablePaginationActions from "./TablePaginationActions";
import { getAll, filter } from "../../services/respos_api";

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
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const getFiltered = useCallback(async ({ page: pageM }) => {
    const {
      data: { items, total_count },
    } = await filter({ page: pageM, limit: rowsPerPage });
    setRows((v) => [...v, ...items]);
    setTotal(total_count);
  }, []);

  const handleChangePage = useCallback(async (event, newPage) => {
    setPage(newPage);
    if (newPage > page) await getFiltered({ page: newPage });
  }, []);

  const handleChangeRowsPerPage = useCallback(
    async (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      await getFiltered({ page, limit: parseInt(event.target.value, 10) });
    },
    [page]
  );

  useEffect(() => {
    async function get() {
      const {
        data: { items, total_count },
      } = await filter({ limit: rowsPerPage });
      setRows(items);
      setTotal(total_count);
    }

    get();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
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
              rowsPerPageOptions={[5, 10, 25, 50,100]}
              colSpan={3}
              count={total}
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
