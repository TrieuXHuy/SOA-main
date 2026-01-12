import React from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  Done as DoneIcon,
  ArrowRightAlt as ArrowRight
} from "@material-ui/icons";

import useStyles from './styles'

//components
import Widget from "../../../Widget";
import { Typography, Link } from "../../../Wrappers";

const Overview = () => {
  const styles = useStyles()
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Widget disableWidgetMenu>
            <Typography variant={"h6"}>
              React Material Admin Full là một mẫu giao diện quản trị (admin dashboard) được xây dựng 
              với React 16.8.6. Sing App vượt xa các mẫu quản trị thông thường và 
              cung cấp cho bạn một khung lập trình trực quan toàn diện. Bạn có thể sử dụng 
              React Material Admin Full để xây dựng bất kỳ loại ứng dụng web nào 
              như SAAS, CMS, bảng điều khiển tài chính, công cụ quản lý dự án, v.v.
            </Typography>
            <Box pt={6}>
              <Typography variant={"h3"}>Tính năng</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Hàng trăm trang giao diện" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Tương thích hoàn toàn (Fully Responsive)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="React 16 mới nhất" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Material-UI v4.6" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="2 Thư viện biểu đồ" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Hỗ trợ thay đổi giao diện (Theme)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Chuyên mục Thương mại điện tử" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Sidebar với 2 trạng thái" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Mã nguồn được ghi chú đầy đủ" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary="Và nhiều tính năng khác sắp ra mắt!" />
              </ListItem>
            </List>
            <Box pt={6} pb={6}>
              <Typography variant={"h3"}>Hỗ trợ</Typography>
              <Typography variant={"p"}>
                <p className="lead">
                  Để biết thêm thông tin bổ sung, vui lòng truy cập diễn đàn hỗ trợ của chúng tôi 
                  để đặt câu hỏi hoặc gửi phản hồi tại đó. Chúng tôi rất trân trọng sự tham gia của bạn!
                </p>
                <a href="https://flatlogic.com/forum" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Diễn đàn hỗ trợ <ArrowRight />
                </a>
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-around"} my={3}>
              <Box>
                <Typography variant={"h3"} style={{ marginBottom: 16 }}>
                  Tiếp tục với
                </Typography>
                <link
                  href={"#/documentation/getting-started/licences"}
                  variant={"h6"}
                  color={"primary"}
                  className={styles.link}
                >
                  Giấy phép <ArrowRight />
                </link>
              </Box>
              <Box>
                <Typography variant={"h3"} style={{ marginBottom: 16 }}>
                  Hoặc tìm hiểu về
                </Typography>
                <link
                  href={"#/documentation/getting-started/quick-start"}
                  variant={"h6"}
                  color={"primary"}
                  className={styles.link}
                >
                  Cách bắt đầu dự án <ArrowRight />
                </link>
              </Box>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Overview;