import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  LinearProgress,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableHead,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip
} from "@mui/material";
import { useTheme, makeStyles } from '@mui/styles';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
  Tooltip as RechartsTooltip
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import { Chip, Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";

import { lighten } from '@mui/material/styles';
import cn from "classnames";
import { API_URL } from "../../constants/path";

// Việt hóa dữ liệu biểu đồ tròn
const PieChartData = [
  { name: "Nhóm A", value: 400, color: "primary" },
  { name: "Nhóm B", value: 300, color: "secondary" },
  { name: "Nhóm C", value: 300, color: "warning" },
  { name: "Nhóm D", value: 200, color: "success" }
];

const TicketChartData = Array(20).fill(0).map((_, i) => ({
  name: `Khách hàng ${i + 1}`,
  value: 2,
  color: "primary"
}));

// Dữ liệu mẫu cho đơn hàng gần đây
const rows = [
  { id: 1, orderId: 123456, customer: "Victoria Cantrel", office: "Croatia", weight: "1.4 kg", price: 23.87, purDate: "12 Th1 2019", delDate: "-", status: "Chờ xử lý", color: "primary" },
  { id: 2, orderId: 654321, customer: "Cherokee Ware", office: "Belgium", weight: "0.8 kg", price: 987, purDate: "11 Th1 2019", delDate: "14 Th1 2019", status: "Đã giao", color: "success" },
  { id: 3, orderId: 789012, customer: "Constance Clayton", office: "Peru", weight: "105 kg", price: 1.876, purDate: "09 Th1 2019", delDate: "-", status: "Đã hủy", color: "secondary" },
];

const headCells = [
  { id: "id", numeric: true, disablePadding: true, label: "Mã Đơn Hàng" },
  { id: "customer", numeric: true, disablePadding: false, label: "Khách Hàng" },
  { id: "office", numeric: true, disablePadding: false, label: "Văn Phòng" },
  { id: "weight", numeric: true, disablePadding: false, label: "Trọng Lượng" },
  { id: "price", numeric: true, disablePadding: false, label: "Giá" },
  { id: "purchase-date", numeric: true, disablePadding: false, label: "Ngày Mua" },
  { id: "delivery-date", numeric: true, disablePadding: false, label: "Ngày Giao" },
  { id: "status", numeric: true, disablePadding: false, label: "Trạng Thái" },
  { id: "actions", numeric: true, disablePadding: false, label: "Thao Tác" }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => onRequestSort(event, property);

  return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ "aria-label": "chọn tất cả hàng" }}
            />
          </TableCell>
          {headCells.map(headCell => (
              <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "left" : "right"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={order}
                    onClick={createSortHandler(headCell.id)}
                    style={{ whiteSpace: "nowrap", textTransform: "uppercase", fontSize: "0.85rem" }}
                >
                  <Typography uppercase color="text" variant={"body2"} colorBrightness="hint">{headCell.label}</Typography>
                  {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sắp xếp giảm dần" : "sắp xếp tăng dần"}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  highlight:
      theme.palette.type === "light"
          ? { color: theme.palette.secondary.main, backgroundColor: lighten(theme.palette.secondary.light, 0.85) }
          : { color: theme.palette.text.primary, backgroundColor: theme.palette.secondary.dark },
  title: { flex: "1 1 100%" }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
      <Toolbar className={cn(classes.root, { [classes.highlight]: numSelected > 0 })}>
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            Đã chọn {numSelected} mục
          </Typography>
        ) : (
            <Box display={"flex"} className={classes.title}>
              <Typography variant="h6" color="text" colorBrightness={"secondary"} id="tableTitle" style={{ display: "flex" }} block>
                Đơn Hàng Gần Đây
                <Box display="flex" alignSelf={"flex-end"} ml={1}>
                  <Typography color="text" colorBrightness={"hint"} variant={"caption"}>
                    Tổng cộng 1.340
                  </Typography>
                </Box>
              </Typography>
            </Box>
        )}

        {numSelected > 0 ? (
            <Tooltip title="Xóa">
              <IconButton aria-label="xóa">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Lọc danh sách">
              <IconButton aria-label="lọc danh sách">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
        )}
      </Toolbar>
  );
};

function renderSystemStat(label, value, stroke, fill) {
  return (
      <Box mb={1}>
        <Typography variant="body2">{label}</Typography>
        <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              height: 8,
              borderRadius: 4,
              [`& .MuiLinearProgress-bar`]: { backgroundColor: stroke },
              backgroundColor: fill,
            }}
        />
      </Box>
  );
}

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  // states
  const [statusCount, setStatusCount] = useState({ total: 0, pending: 0, cancelled: 0, confirmed: 0 });
  const [systemStats, setSystemStats] = useState({ cpuUsage: 0, memoryUsage: 0, diskUsage: 0 });
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState(0);

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu (Giữ nguyên logic của bạn)
    // ... logic axios fetch ...
    // Giả lập dữ liệu revenue cho chart với nhãn tiếng Việt
    setRevenueData([
        { date: '22 Th12', revenue: 450000 },
        { date: '23 Th12', revenue: 520000 },
        { date: '24 Th12', revenue: 480000 },
        { date: '25 Th12', revenue: 610000 },
        { date: '26 Th12', revenue: 590000 },
        { date: '27 Th12', revenue: 680000 },
        { date: '28 Th12', revenue: 720000 },
    ]);
  }, []);

  const randomData = React.useMemo(() => getRandomData(10), []);

  return (
    <Grid container spacing={3}>
      {/* Thẻ thống kê tổng quan */}
      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Tổng Sản Phẩm" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" weight="medium">{totalProducts}</Typography>
              <Typography variant="caption" color="text" colorBrightness="hint">Sản phẩm trong hệ thống</Typography>
            </Box>
            <Box style={{ backgroundColor: theme.palette.primary.light, borderRadius: "50%", padding: 12, display: "flex", alignItems: "center" }}>
              <InventoryIcon style={{ color: theme.palette.primary.main, fontSize: 32 }} />
            </Box>
          </Box>
        </Widget>
      </Grid>

      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Tổng Người Dùng" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" weight="medium">{totalUsers}</Typography>
              <Typography variant="caption" color="text" colorBrightness="hint">{newUsersThisMonth} người mới tháng này</Typography>
            </Box>
            <Box style={{ backgroundColor: theme.palette.success.light, borderRadius: "50%", padding: 12, display: "flex", alignItems: "center" }}>
              <PeopleIcon style={{ color: theme.palette.success.main, fontSize: 32 }} />
            </Box>
          </Box>
        </Widget>
      </Grid>

      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Tổng Doanh Thu" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" weight="medium">{totalRevenue.toLocaleString('vi-VN')}₫</Typography>
              <Typography variant="caption" color="text" colorBrightness="hint">Đơn hàng đã xác nhận</Typography>
            </Box>
            <Box style={{ backgroundColor: theme.palette.warning.light, borderRadius: "50%", padding: 12, display: "flex", alignItems: "center" }}>
              <AttachMoneyIcon style={{ color: theme.palette.warning.main, fontSize: 32 }} />
            </Box>
          </Box>
        </Widget>
      </Grid>

      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Tổng Đơn Hàng" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" weight="medium">{statusCount.total}</Typography>
              <Typography variant="caption" color="text" colorBrightness="hint">{statusCount.confirmed} đã xác nhận</Typography>
            </Box>
            <Box style={{ backgroundColor: theme.palette.secondary.light, borderRadius: "50%", padding: 12, display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon style={{ color: theme.palette.secondary.main, fontSize: 32 }} />
            </Box>
          </Box>
        </Widget>
      </Grid>

      {/* Tổng quan Ticket */}
      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Tổng Quan Ticket" bodyClass={classes.fullHeightBody} className={classes.card}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <Box display="flex">
                <Typography variant="h2" weight="medium">{statusCount.total}</Typography>
                <Typography color="text" variant={"caption"} style={{ alignSelf: "flex-end", marginLeft: 8 }}>Tickets</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Typography variant="caption" weight={"medium"} style={{ position: "absolute" }}>
                {statusCount.total > 0 ? `${Math.round((statusCount.confirmed / statusCount.total) * 100)}%` : "0%"}
              </Typography>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie data={TicketChartData} startAngle={270} endAngle={0} paddingAngle={5} innerRadius={30} outerRadius={35} dataKey="value">
                    {TicketChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={theme.palette[entry.color].main} stroke={""} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="space-between" alignItems="center" wrap={"nowrap"}>
            <Grid item>
              <Typography color="text" colorBrightness={"hint"} variant={"caption"} style={{ marginRight: 5 }}>Chờ xử lý</Typography>
              <Box display="flex" alignItems="center"><Typography size="md" weight={"medium"} style={{ marginRight: 8 }}>{statusCount.pending}</Typography><Dot color="success" /></Box>
            </Grid>
            <Grid item>
              <Typography color="text" colorBrightness={"hint"} variant={"caption"} style={{ marginRight: 5 }}>Đã hủy</Typography>
              <Box display="flex" alignItems="center"><Typography size="md" weight={"medium"} style={{ marginRight: 8 }}>{statusCount.cancelled}</Typography><Dot color="warning" /></Box>
            </Grid>
            <Grid item>
              <Typography color="text" colorBrightness={"hint"} variant={"caption"}>Xác nhận</Typography>
              <Box display="flex" alignItems="center"><Typography size="md" weight={"medium"} style={{ marginRight: 8 }}>{statusCount.confirmed}</Typography><Dot color="primary" /></Box>
            </Grid>
          </Grid>
        </Widget>
      </Grid>

      {/* Phân bổ doanh thu */}
      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Phân Bổ Doanh Thu" className={classes.card} bodyClass={classes.alignStandaloneElement}>
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 6 }}>
              <Typography variant={"caption"} weight={"medium"} style={{ position: "absolute" }}>1.700</Typography>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart>
                  <Pie data={PieChartData} innerRadius={30} outerRadius={40} dataKey="value">
                    {PieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={theme.palette[entry.color].main} stroke={""} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {PieChartData.map(({ name, value, color }) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} style={{ marginRight: 5 }} />
                      <Typography color="text" colorBrightness={"hint"} variant={"caption"} noWrap>&nbsp;{name}&nbsp;</Typography>
                      <Typography color="text" weight={"medium"}>&nbsp;{value}</Typography>
                    </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>

      {/* Hiệu suất ứng dụng */}
      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Hiệu Suất Ứng Dụng" className={classes.card} bodyClass={classes.fullHeightBody}>
          <div className={classes.performanceLegendWrapper}>
            <div className={classes.legendElement}><Dot color="warning" /><Typography color="text" colorBrightness="hint" variant={"body2"} className={classes.legendElementText}>Thời gian chạy API</Typography></div>
            <div className={classes.legendElement}><Dot color="primary" /><Typography color="text" colorBrightness="hint" variant={"body2"} className={classes.legendElementText}>Phản hồi trung bình</Typography></div>
          </div>
          <div className={classes.progressSection}>
            <Typography color="text" variant={"body2"} className={classes.progressSectionTitle}>Thời gian hoạt động API</Typography>
            <LinearProgress variant="determinate" value={uptime} classes={{ barColorPrimary: classes.progressBarPrimary }} className={classes.progress} />
          </div>
          <div>
            <Typography color="text" variant={"body2"} className={classes.progressSectionTitle}>Thời gian phản hồi TB</Typography>
            <LinearProgress variant="determinate" value={Math.min(avgResponseTime / 10, 100)} classes={{ barColorPrimary: classes.progressBarWarning }} className={classes.progress} />
          </div>
        </Widget>
      </Grid>

      {/* Tổng quan máy chủ */}
      <Grid item lg={3} sm={6} xs={12}>
        <Widget title="Tổng Quan Máy Chủ" className={classes.card} bodyClass={classes.fullHeightBody}>
          {renderSystemStat("Sử dụng CPU", systemStats.cpuUsage, theme.palette.secondary.main, theme.palette.secondary.light)}
          {renderSystemStat("Sử dụng Bộ nhớ", systemStats.memoryUsage, theme.palette.primary.main, theme.palette.primary.light)}
          {renderSystemStat("Sử dụng Đĩa", systemStats.diskUsage, theme.palette.warning.main, theme.palette.warning.light)}
        </Widget>
      </Grid>

      {/* Biểu đồ doanh thu 7 ngày */}
      <Grid item xs={12} lg={8}>
        <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography variant="h6" color="text" weight={"medium"} colorBrightness="secondary">Doanh Thu 7 Ngày Gần Đây</Typography>
                <Box display="flex" alignItems="center">
                  <TrendingUpIcon style={{ marginRight: 8, color: theme.palette.success.main }} />
                  <Typography variant="body2" color="text" colorBrightness="hint">Tổng: {totalRevenue.toLocaleString('vi-VN')}₫</Typography>
                </Box>
              </div>
            }
        >
          <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <ComposedChart margin={{ top: 0, right: -15, left: -15, bottom: 0 }} data={revenueData.length > 0 ? revenueData : [{ date: 'K/A', revenue: 0 }]}>
              <YAxis tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }} stroke={theme.palette.text.hint + "80"} tickLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
              <XAxis dataKey="date" tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }} stroke={theme.palette.text.hint + "80"} tickLine={false} />
              <RechartsTooltip formatter={(value) => [`${value.toLocaleString('vi-VN')}₫`, 'Doanh thu']} />
              <Area type="monotone" dataKey="revenue" fill={theme.palette.primary.light} strokeWidth={0} activeDot={false} />
              <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} strokeWidth={3} dot={{ stroke: theme.palette.primary.dark, strokeWidth: 2, fill: theme.palette.primary.main, r: 5 }} activeDot={{ r: 8 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Widget>
      </Grid>

      {/* Danh sách đơn hàng gần đây */}
      <Grid item xs={12} lg={4}>
        <Widget title="Đơn Hàng Mới Nhất" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Box>
            {recentOrders.length > 0 ? (
              recentOrders.slice(0, 5).map((order, index) => (
                <Box key={order.orderId || index} mb={2} pb={2} borderBottom={index < 4 ? `1px solid ${theme.palette.divider}` : 'none'}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography variant="body2" weight="medium">Đơn #{order.orderId || 'K/A'}</Typography>
                    <Chip
                      color={order.status === 'CONFIRMED' ? 'success' : order.status === 'PENDING' ? 'warning' : 'secondary'}
                      label={order.status === 'CONFIRMED' ? 'Đã xác nhận' : order.status === 'PENDING' ? 'Chờ xử lý' : 'Khác'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="caption" color="text" colorBrightness="hint">{order.totalPrice?.toLocaleString('vi-VN') || 0}₫</Typography>
                  <Typography variant="caption" color="text" colorBrightness="hint" display="block">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'K/A'}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text" colorBrightness="hint" align="center">Chưa có đơn hàng nào</Typography>
            )}
          </Box>
        </Widget>
      </Grid>

      {/* Sản phẩm nổi bật */}
      <Grid item xs={12} lg={6}>
        <Widget title="Sản Phẩm Bán Chạy" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Box>
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <Box key={product.productId || index} mb={2} pb={2} display="flex" alignItems="center" borderBottom={index < topProducts.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'}>
                  <Box style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: theme.palette.background.light, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <InventoryIcon style={{ color: theme.palette.primary.main }} />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" weight="medium" noWrap>{product.productName || 'Sản phẩm không tên'}</Typography>
                    <Typography variant="caption" color="text" colorBrightness="hint">Mã: {product.productCode || 'K/A'}</Typography>
                  </Box>
                  <Box style={{ backgroundColor: theme.palette.primary.light, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    {index + 1}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text" colorBrightness="hint" align="center">Chưa có sản phẩm nào</Typography>
            )}
          </Box>
        </Widget>
      </Grid>

      {/* Thống kê người dùng */}
      <Grid item xs={12} lg={6}>
        <Widget title="Thống Kê Người Dùng" className={classes.card} bodyClass={classes.fullHeightBody}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box style={{ backgroundColor: theme.palette.primary.light, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <PeopleIcon style={{ fontSize: 40, color: theme.palette.primary.main, marginBottom: 8 }} />
                <Typography variant="h4" weight="medium">{totalUsers}</Typography>
                <Typography variant="caption" color="text" colorBrightness="hint">Tổng người dùng</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box style={{ backgroundColor: theme.palette.success.light, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <TrendingUpIcon style={{ fontSize: 40, color: theme.palette.success.main, marginBottom: 8 }} />
                <Typography variant="h4" weight="medium">{newUsersThisMonth}</Typography>
                <Typography variant="caption" color="text" colorBrightness="hint">Người mới tháng này</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box style={{ backgroundColor: theme.palette.background.light, borderRadius: 12, padding: 16 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text" colorBrightness="hint">Tỷ lệ tăng trưởng</Typography>
                  <Typography variant="body2" weight="medium" style={{ color: theme.palette.success.main }}>
                    {totalUsers > 0 ? ((newUsersThisMonth / totalUsers) * 100).toFixed(1) : 0}%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={totalUsers > 0 ? (newUsersThisMonth / totalUsers) * 100 : 0} sx={{ height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.success.main } }} />
              </Box>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
    </Grid>
  );
}

// Hàm bổ trợ lấy dữ liệu ngẫu nhiên
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  let array = new Array(length).fill();
  let lastValue;
  return array.map(() => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);
    while (randomValue <= min || randomValue >= max || (lastValue && randomValue - lastValue > maxDiff)) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }
    lastValue = randomValue;
    return { value: randomValue };
  });
}

export default Dashboard;