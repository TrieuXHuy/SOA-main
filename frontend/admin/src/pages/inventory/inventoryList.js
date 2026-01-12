import React, { useEffect, useState } from "react";
import {
    Grid, Table, TableBody, TableCell, TablePagination, TableRow,
    TableHead, Checkbox, TableSortLabel, CircularProgress, Box,
    InputAdornment, TextField as Input, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Tooltip, IconButton
} from "@mui/material";
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Add as AddIcon
} from "@mui/icons-material";
import { Typography, Button } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import { useInventories } from "../../hooks/useInventories";
import { deleteInventory } from "../../services/inventoryService";
import InventoryDialog from "./InventoryDialog";
import InventoryDetailDialog from "./InventoryDetailDialog";

// Cập nhật tiêu đề các cột
const headCells = [
    { id: "inventoryID", label: "Mã kho" },
    { id: "productID", label: "Mã sản phẩm" },
    { id: "importedQuantity", label: "Số lượng nhập" },
    { id: "exportedQuantity", label: "Số lượng xuất" },
    { id: "exportDate", label: "Cập nhật cuối" },
    { id: "inventoryStatus", label: "Trạng thái" },
    { id: "actions", label: "Hành động" },
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

export default function InventoryList() {
    const classes = useStyles();
    const { inventories, isLoading, setInventories } = useInventories();
    const [filteredInventories, setFilteredInventories] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("inventoryID");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [inventoryToDelete, setInventoryToDelete] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    useEffect(() => {
        setFilteredInventories(inventories);
    }, [inventories]);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = filteredInventories.map(n => n.inventoryID);
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

    const searchInventories = e => {
        const keyword = e.target.value.toLowerCase();
        const result = inventories.filter(p => p.productID.toLowerCase().includes(keyword));
        setFilteredInventories(result);
    };

    const confirmDelete = async () => {
        try {
            await deleteInventory(inventoryToDelete);
            setFilteredInventories(prev => prev.filter(i => i.inventoryID !== inventoryToDelete));
            setInventories(prev => prev.filter(i => i.inventoryID !== inventoryToDelete));
        } catch (err) {
            console.error("Xóa thất bại:", err);
        } finally {
            setConfirmOpen(false);
            setInventoryToDelete(null);
        }
    };

    const handleAddNew = () => {
        setSelectedInventory(null);
        setDialogOpen(true);
    };

    const handleEdit = (event, inventory) => {
        event.stopPropagation();
        setSelectedInventory(inventory);
        setDialogOpen(true);
    };

    const handleViewDetail = (event, inventory) => {
        event.stopPropagation();
        setSelectedInventory(inventory);
        setDetailDialogOpen(true);
    };

    const handleDeleteClick = (event, inventory) => {
        event.stopPropagation();
        setInventoryToDelete(inventory.inventoryID);
        setConfirmOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedInventory(null);
    };

    const handleDialogSuccess = (newInventory) => {
        if (selectedInventory) {
            // Update case
            setInventories(prev =>
                prev.map(item =>
                    item.inventoryID === newInventory.inventoryID ? newInventory : item
                )
            );
        } else {
            // Create case
            setInventories(prev => [...prev, newInventory]);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget
                    disableWidgetMenu
                    header={
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography variant="h6">Danh sách tồn kho</Typography>
                            <Box display="flex" gap={2} alignItems="center">
                                <Input
                                    label="Tìm theo mã sản phẩm"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={searchInventories}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddNew}
                                >
                                    Thêm mới
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
                                    rowCount={filteredInventories.length}
                                />
                                <TableBody>
                                    {stableSort(filteredInventories, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(row => {
                                            const isItemSelected = isSelected(row.inventoryID);
                                            return (
                                                <TableRow
                                                    hover
                                                    key={row.inventoryID}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    selected={isItemSelected}
                                                    onClick={event => handleClick(event, row.inventoryID)}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isItemSelected} />
                                                    </TableCell>
                                                    <TableCell>{row.inventoryID}</TableCell>
                                                    <TableCell>{row.productID}</TableCell>
                                                    <TableCell>{row.importedQuantity}</TableCell>
                                                    <TableCell>{row.exportedQuantity}</TableCell>
                                                    <TableCell>{row.exportDate}</TableCell>
                                                    <TableCell>{row.inventoryStatus}</TableCell>
                                                    <TableCell align="center" onClick={e => e.stopPropagation()}>
                                                        <Tooltip title="Xem chi tiết">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={(e) => handleViewDetail(e, row)}
                                                            >
                                                                <VisibilityIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Chỉnh sửa">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={(e) => handleEdit(e, row)}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Xóa">
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={(e) => handleDeleteClick(e, row)}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
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
                                count={filteredInventories.length}
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
                        Bạn có chắc chắn muốn xóa bản ghi kho này không? Thao tác này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">Hủy</Button>
                    <Button onClick={confirmDelete} color="secondary" variant="contained">Xác nhận</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog CRUD */}
            <InventoryDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                inventory={selectedInventory}
                onSuccess={handleDialogSuccess}
            />

            {/* Dialog Chi tiết */}
            <InventoryDetailDialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                inventory={selectedInventory}
            />
        </Grid>
    );
}