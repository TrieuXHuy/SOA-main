import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  Checkbox,
  TableSortLabel,
  CircularProgress,
  Box,
  InputAdornment,
  TextField as Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Star as StarIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { yellow } from "@mui/material/colors";
import { Typography, Button } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import { useProducts } from "../../hooks/useProducts";
import { API_URL } from "../../constants/path";
import useStyles from "./styles";

// Cập nhật tiêu đề bảng
const headCells = [
  { id: "productID", numeric: false, disablePadding: true, label: "Mã SP" },
  { id: "images", numeric: false, disablePadding: false, label: "Hình ảnh" },
  { id: "productName", numeric: false, disablePadding: false, label: "Tên sản phẩm" },
  { id: "productTypeID", numeric: false, disablePadding: false, label: "Danh mục" },
  { id: "exportPrice", numeric: true, disablePadding: false, label: "Giá bán" },
  { id: "rating", numeric: true, disablePadding: false, label: "Đánh giá" },
  { id: "actions", numeric: false, disablePadding: false, label: "Thao tác" }
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function stableSort(array, cmp) {
  const stabilized = array.map((el, i) => [el, i]);
  stabilized.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTableHead = ({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
  const createSortHandler = property => event => onRequestSort(event, property);
  return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
            />
          </TableCell>
          {headCells.map(headCell => (
              <TableCell
                  key={headCell.id}
                  align="left"
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={order}
                    onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
};

export default function EcommercePage() {
  const classes = useStyles();
  const history = useHistory();
  const { products, isLoading } = useProducts();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("exportPrice");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (products.length) setFilteredProducts(products);
  }, [products]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = filteredProducts.map(n => n.productID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = [...selected, name];
    else newSelected = selected.filter(id => id !== name);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const searchProducts = e => {
    const keyword = e.target.value.toLowerCase();
    const result = products.filter(p => p.productName.toLowerCase().includes(keyword));
    setFilteredProducts(result);
  };

  const openProductEdit = (event, id) => {
    event.stopPropagation();
    history.push(`/app/ecommerce/management/edit/${id}`);
  };

  const deleteProduct = (id, event) => {
    event.stopPropagation();
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/products/${productToDelete}`);
      setFilteredProducts(prev => prev.filter(p => p.productID !== productToDelete));
    } catch (err) {
      console.error("Xóa thất bại:", err);
    } finally {
      setConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Widget
              disableWidgetMenu
              header={
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <Typography variant="h6">Danh sách sản phẩm</Typography>
                  <Input
                      label="Tìm kiếm"
                      margin="dense"
                      variant="outlined"
                      onChange={searchProducts}
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                        )
                      }}
                  />
                </Box>
              }
          >
            {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
            ) : (
                <>
                  <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/app/ecommerce/management/create"
                    >
                      Thêm sản phẩm
                    </Button>
                  </Box>

                  <Table className={classes.table}>
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={filteredProducts.length}
                    />
                    <TableBody>
                      {stableSort(filteredProducts, getSorting(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.productID);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    onClick={event => handleClick(event, row.productID)}
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                    tabIndex={-1}
                                    key={row.productID}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
                                  </TableCell>
                                  <TableCell>{row.productID}</TableCell>
                                  <TableCell>
                                    <img src={row.images?.[0]} alt={row.productName} width={80} />
                                  </TableCell>
                                  <TableCell>{row.productName}</TableCell>
                                  <TableCell>{row.productTypeID}</TableCell>
                                  <TableCell>{row.exportPrice.toLocaleString()} ₫</TableCell>
                                  <TableCell>
                                    <Box display="flex" alignItems="center">
                                      <Typography style={{ color: yellow[700] }}>{row.rating}</Typography>
                                      <StarIcon style={{ color: yellow[700], marginLeft: 4 }} />
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box display="flex">
                                      <Button
                                          color="success"
                                          size="small"
                                          variant="contained"
                                          onClick={e => openProductEdit(e, row.productID)}
                                          style={{ marginRight: 8 }}
                                      >
                                        Sửa
                                      </Button>
                                      <Button
                                          color="secondary"
                                          size="small"
                                          variant="contained"
                                          onClick={e => deleteProduct(row.productID, e)}
                                      >
                                        Xóa
                                      </Button>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                  <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      labelRowsPerPage="Số dòng mỗi trang:"
                      count={filteredProducts.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
            )}
          </Widget>
        </Grid>

        {/* Confirm Delete Dialog */}
        <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa sản phẩm này không? Thao tác này không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Hủy
            </Button>
            <Button onClick={confirmDelete} color="secondary" variant="contained">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
  );
}