import React, { useEffect, useState } from "react";
import {
    Grid, Table, TableBody, TableCell, TablePagination, TableRow,
    TableHead, Checkbox, TableSortLabel, CircularProgress, Box,
    InputAdornment, TextField as Input, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import { API_URL } from "../../constants/path";
import { useProductTypes } from "../../hooks/useProductTypes";
import axios from "axios";

const headCells = [
    { id: "productTypeID", label: "Mã danh mục" },
    { id: "productTypeName", label: "Tên danh mục" },
    { id: "description", label: "Mô tả" },
    { id: "actions", label: "Thao tác" },
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

const EnhancedTableHead = ({ order, orderBy, onSelectAllClick, numSelected, rowCount, onRequestSort }) => {
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
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.id !== "actions" ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={order}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default function ProductTypeList() {
    const classes = useStyles();
    const { productTypes, isLoading, setProductTypes } = useProductTypes();
    const [filteredProductTypes, setFilteredProductTypes] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("productTypeID");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [productTypeToDelete, setProductTypeToDelete] = useState(null);

    useEffect(() => {
        setFilteredProductTypes(productTypes);
    }, [productTypes]);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = filteredProductTypes.map(n => n.productTypeID);
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

    const searchProductTypes = e => {
        const keyword = e.target.value.toLowerCase();
        const result = productTypes.filter(p =>
            p.productTypeID.toLowerCase().includes(keyword) ||
            p.productTypeName.toLowerCase().includes(keyword)
        );
        setFilteredProductTypes(result);
    };

    const handleDeleteClick = (productTypeID) => {
        setProductTypeToDelete(productTypeID);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}/product-types/${productTypeToDelete}`);
            setFilteredProductTypes(prev => prev.filter(i => i.productTypeID !== productTypeToDelete));
            setProductTypes(prev => prev.filter(i => i.productTypeID !== productTypeToDelete));
        } catch (err) {
            console.error("Xóa thất bại:", err);
        } finally {
            setConfirmOpen(false);
            setProductTypeToDelete(null);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget
                    disableWidgetMenu
                    header={
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography variant="h6">Danh sách danh mục</Typography>
                            <Box display="flex" gap={2} alignItems="center">
                                <Input
                                    label="Tìm kiếm danh mục"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={searchProductTypes}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    component={RouterLink}
                                    to="/app/product-type/create"
                                    variant="contained"
                                    color="primary"
                                >
                                    Thêm danh mục
                                </Button>
                            </Box>
                        </Box>
                    }
                >
                    {isLoading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Table className={classes.table}>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={filteredProductTypes.length}
                                />
                                <TableBody>
                                    {stableSort(filteredProductTypes, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(row => {
                                            const isItemSelected = isSelected(row.productTypeID);
                                            return (
                                                <TableRow
                                                    hover
                                                    key={row.productTypeID}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    selected={isItemSelected}
                                                    onClick={event => handleClick(event, row.productTypeID)}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isItemSelected} />
                                                    </TableCell>
                                                    <TableCell>{row.productTypeID}</TableCell>
                                                    <TableCell>{row.productTypeName}</TableCell>
                                                    <TableCell>{row.description}</TableCell>
                                                    <TableCell>
                                                        <Box display="flex" gap={1}>
                                                            <Button
                                                                component={RouterLink}
                                                                to={`/app/product-type/edit/${row.productTypeID}`}
                                                                size="small"
                                                                color="primary"
                                                                startIcon={<EditIcon />}
                                                            >
                                                                Sửa
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                color="secondary"
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleDeleteClick(row.productTypeID)}
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
                                count={filteredProductTypes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}
                </Widget>
            </Grid>
            {/* Dialog xác nhận xóa */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa danh mục này không? Thao tác này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">Hủy</Button>
                    <Button onClick={confirmDelete} color="secondary" variant="contained">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
