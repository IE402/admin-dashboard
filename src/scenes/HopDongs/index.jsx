import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { thueService } from "../../services/thue.service";
import { userService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [hopDongs, setHopDongs] = useState([]);
  const [listHds, setListHds] = useState([]);
  

  useEffect(() => {
    const fetchHopDongs = async () => {
      const res = await thueService.getAllHopDong();
      setHopDongs(res);
    };
    fetchHopDongs();
  }, []);

  useEffect(() => {
    // Tạo danh sách hợp đồng khi `hopDongs` thay đổi
    const fetchUsersForHopDongs = async () => {
      const updatedListHds = [];
      for (const hopDong of hopDongs) {
        try {
          // Lấy thông tin BenA và BenB một lần cho mỗi hợp đồng
          const resA = await userService.getUserById(hopDong.userIDs[0]);
          const resB = await userService.getUserById(hopDong.userIDs[1]);

          // Cập nhật danh sách hợp đồng
          updatedListHds.push({
            id: hopDong.id,
            postAdr: hopDong.post.address,
            post: hopDong.post.title,
            tenBenA: resA.fullName,
            tenBenB: resB.fullName,
            createAt: hopDong.ngayTao

          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      // Cập nhật `listHds` sau khi tất cả dữ liệu được lấy xong
      setListHds(updatedListHds);
    };

    if (hopDongs.length > 0) {
      fetchUsersForHopDongs();
    }
  }, [hopDongs]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Mã hợp đồng" },
    {
      field: "tenBenA",
      headerName: "Bên Cho Thuê",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tenBenB",
      headerName: "Bên Thuê",
      flex: 1,
    },
    {
      field: "post",
      headerName: "Tên Phòng trọ",
      flex: 1,
    },
    {
      field: "postAdr",
      headerName: "Địa chỉ",
      flex: 1,
    },
    {
      field: "createAt",
      headerName: "Ngày Tạo",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Hợp đồng" subtitle="Danh sách hợp đồng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={listHds}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
