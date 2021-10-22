import { useQuery, useQueryClient } from "react-query";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from "@mui/x-data-grid";
import axios from "axios";
import _ from "lodash";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CustomToolbar = () => {
    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

const DataTable = () => {
    const history = useHistory();

    const [pageSize, setPageSize] = useState(10);

    const { isLoading, error, data } = useQuery("maintenance", () =>
        axios.get("http://localhost:3000").then((res) => res.data)
    );

    const maintenancedata = _.map(data, (row) => {
        return {
            id: row._id,
            ...row,
        };
    });

    const handleDeleteClick = (event, cellValues) => {
        console.log(cellValues);
        axios
            .delete("http://localhost:3000/month", {
                data: {
                    _id: cellValues.row.id,
                },
            })
            .then((res) => {
                history.go(0);
            });
    };

    const handleEditClick = (event, cellValues) => {
        history.push(`/maintenance/${cellValues.row.id}`);
    };

    const columns = [
        { field: "location", headerName: "Location", width: 200 },
        { field: "monthYear", headerName: "Month Year", width: 200 },
        {
            field: "date",
            headerName: "Date",
            sortComparator: (v1, v2, param1, param2) => {
                let first = moment(v1, "DD-MM-YYYY");
                let second = moment(v2, "DD-MM-YYYY");

                return first - second;
            },
            width: 130,
        },
        {
            field: "transactionId",
            headerName: "Transaction Id",
            width: 200,
        },
        { field: "amount", headerName: "Amount", width: 130 },
        { field: "remark", headerName: "Remark", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 130,
            renderCell: (cellValues) => {
                return (
                    <div>
                        <EditIcon
                            color="primary"
                            style={{ minWidth: "40px" }}
                            onClick={(event) => {
                                handleEditClick(event, cellValues);
                            }}
                        />
                        <DeleteIcon
                            color="primary"
                            style={{ minWidth: "40px" }}
                            onClick={(event) => {
                                handleDeleteClick(event, cellValues);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    if (isLoading) return <div>Loading...</div>;

    return (
        { maintenancedata } && (
            <div style={{ height: 800, width: "100%" }}>
                <DataGrid
                    rows={maintenancedata}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
                <div>
                    <Link href="/maintenance/add" underline="hover">
                        Add
                    </Link>
                </div>
            </div>
        )
    );
};

export default DataTable;
