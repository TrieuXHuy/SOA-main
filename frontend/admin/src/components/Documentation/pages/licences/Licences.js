import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box
} from "@material-ui/core";
import { Add as PlusIcon, Remove as MinusIcon } from "@material-ui/icons";
import useStyles from "./styles";

//components
import Widget from "../../../Widget";
import { Typography } from "../../../Wrappers";

// structure
const rows = [
  {
    advantage: "Hàng trăm thành phần độc nhất",
    single: "plus",
    extended: "plus"
  },
  {
    advantage: "Tất cả các trang",
    single: "plus",
    extended: "plus"
  },
  {
    advantage: "Cập nhật miễn phí",
    single: "3 tháng",
    extended: "6 tháng"
  },
  {
    advantage: "Cho phép người dùng trả phí",
    single: "no",
    extended: "plus"
  }
];

const Licences = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Widget disableWidgetMenu>
            <Typography variant={"h6"}>
              Giấy phép cấp cho bạn quyền không độc quyền và không thể chuyển nhượng để 
              sử dụng và kết hợp sản phẩm vào các dự án cá nhân hoặc thương mại của bạn. 
              Nếu sản phẩm cuối cùng của bạn (bao gồm cả sản phẩm này) được cung cấp miễn phí 
              cho người dùng cuối thì Giấy phép Đơn (Single License) là những gì bạn cần. 
              Giấy phép Mở rộng (Extended License) là bắt buộc nếu người dùng cuối phải 
              trả phí để sử dụng sản phẩm đó.
            </Typography>
            <Table aria-label="licences table" style={{ marginTop: 48 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Bản Đơn (Single)</TableCell>
                  <TableCell>Mở Rộng (Extended)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.advantage}>
                    <TableCell component="th" scope="row">
                      {row.advantage}
                    </TableCell>
                    <TableCell>
                      {row.extended === "plus" ? (
                        <PlusIcon className={classes.successIcon} />
                      ) : (
                        <MinusIcon className={classes.failIcon} />
                      )}
                    </TableCell>
                    <TableCell>
                      {row.extended === "plus" ? (
                        <PlusIcon className={classes.successIcon} />
                      ) : (
                        <MinusIcon className={classes.failIcon} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box mt={6}>
              <Typography variant={"h6"} block>
                <Typography weight={"medium"} variant={"h6"}>
                  Giấy phép Ứng dụng Đơn (Single Application License)
                </Typography>
                Việc sử dụng sản phẩm bị giới hạn trong một ứng dụng duy nhất. Bạn có thể 
                sử dụng sản phẩm cho các công việc bạn tạo ra cho mục đích riêng hoặc cho 
                khách hàng. Bạn không được phép kết hợp sản phẩm vào một dự án được tạo ra 
                để phân phối lại hoặc bán lại bởi bạn hoặc khách hàng của bạn. Sản phẩm không 
                được phép bán lại hoặc phân phối lại. Bạn không được thu phí người dùng khi 
                họ sử dụng ứng dụng của bạn.
              </Typography>
            </Box>
            <Box mt={6}>
              <Typography variant={"h6"} block>
                <Typography weight={"medium"} variant={"h6"}>
                  Giấy phép Ứng dụng Mở rộng (Extended Application License)
                </Typography>
                Việc sử dụng sản phẩm bị giới hạn trong một ứng dụng duy nhất. Bạn có thể 
                sử dụng sản phẩm cho các công việc bạn tạo ra cho mục đích riêng hoặc cho 
                khách hàng. Bạn được cấp phép sử dụng sản phẩm để tạo ra một Sản phẩm Cuối 
                duy nhất cho chính mình hoặc cho một khách hàng (một "ứng dụng duy nhất"), 
                và Sản phẩm Cuối đó có thể được Bán và thu phí người dùng khi sử dụng 
                (ví dụ: bạn đang xây dựng một ứng dụng dạng SAAS).
              </Typography>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Licences;