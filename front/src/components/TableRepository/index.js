import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
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
  TextField,
  IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TablePaginationActions from "./TablePaginationActions";
import { filter } from "../../services/respos_api";
import { ContentSearchBox, ContentBox, ContentAnimation } from "./styles";
import { getAll } from "../../services/language_api";
import { toast } from "react-toastify";
import GitHubIcon from "@material-ui/icons/GitHub";

import { css } from "@emotion/core";
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
  const [listLanguages, setListLanguages] = useState([]);
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const getFiltered = useCallback(
    async ({ page: pageM = null, isInit = false }) => {
      try {
        setLoading(true);
        const {
          data: { items, total_count },
        } = await filter({ page: pageM, limit: rowsPerPage, language });
        setRows((v) => [...v, ...items]);
        if (isInit) setRows(items);
        setTotal(total_count);
        console.log({ page, limit: rowsPerPage, language });
      } catch (ee) {
        toast.error("Ocorreu um erro ao filtrar o protocolo...");
      } finally {
        setLoading(false);
      }
    },
    [rowsPerPage, language]
  );

  const handleChangePage = useCallback(async (event, newPage) => {
    setPage(newPage);
    if (newPage > page) await getFiltered({ page: newPage });
  }, []);

  const handleChangeRowsPerPage = useCallback(
    async (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
      await getFiltered({
        page,
        limit: rowsPerPage,
        isInit: true,
      });
    },
    [page, rowsPerPage]
  );

  const handlerChangeLanguage = useCallback(async (event) => {
    setLanguage(event.target.innerText);
  }, []);

  useEffect(() => {
    async function get() {
      const {
        data: { items, total_count },
      } = await filter({ limit: rowsPerPage });
      setRows(items);
      setTotal(total_count);
    }
    async function getLanguage() {
      try {
        const { data } = await getAll();
        setListLanguages(data);
      } catch (ee) {
        toast.error("Ocorreu um erro ao buscar as linguagens...");
      }
    }

    getLanguage();
    get();
  }, []);

  useEffect(() => {
    async function get() {
      try {
        setLoading(true);
        const {
          data: { items, total_count },
        } = await filter({ limit: rowsPerPage, page, language });
        setRows(items);
        setTotal(total_count);
      } catch (ee) {
        toast.error("Ocorreu um erro ao buscar os repositorios...");
      } finally {
        setLoading(false);
      }
    }
    get();
  }, [language]);

  return (
    <>
      <ContentBox>
        <ContentSearchBox>
          <Autocomplete
            options={listLanguages}
            onChange={handlerChangeLanguage}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filtrar por linguagem"
                variant="outlined"
                size="small"
              />
            )}
          />
        </ContentSearchBox>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Nome Completo</TableCell>
                <TableCell align="right">Linguagem</TableCell>
                <TableCell align="right">Número(Stars)</TableCell>
                <TableCell align="right">Data de Criação</TableCell>
                <TableCell align="right">Ultima Atualização</TableCell>
                <TableCell align="center">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, k) => (
                <TableRow key={row.full_name + k + row.html_url}>
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
                    {format(
                      new Date(row.created_at),
                      "dd/MM/yyyy 'ás' HH:mm:ss"
                    )}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {format(
                      new Date(row.updated_at),
                      "dd/MM/yyyy 'ás' HH:mm:ss"
                    )}
                  </TableCell>
                  <TableCell style={{ width: 50 }} align="center">
                    <IconButton
                      color="primary"
                      aria-label="Ver Repositorio"
                      onClick={() => {
                        window.open(row.html_url, "_blank");
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
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
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  colSpan={3}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "linhas" },
                    native: true,
                  }}
                  labelRowsPerPage="Linhas por página"
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </ContentBox>
      {loading && <ContentAnimation />}
    </>
  );
}
