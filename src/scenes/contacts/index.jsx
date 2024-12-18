import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/post.service";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "title",
      headerName: "Tên phòng trọ",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "user",  // Truy cập đối tượng `user`
      headerName: "Tên chủ trọ",
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => params.row.user?.fullName || "",  // Lấy giá trị từ `username`
      type: "string",  // Thay vì "number", vì đây là chuỗi
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      valueGetter: (params) => params.row.user?.phone || "",  // Lấy giá trị từ `username`
      flex: 1,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1,
    },
    {
      field: "city",
      headerName: "Khu vực",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Giá phòng",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Phòng trọ"
        subtitle=""
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={posts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
