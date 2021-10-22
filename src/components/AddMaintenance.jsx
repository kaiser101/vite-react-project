import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MaintenanceForm from "./MaintenanceForm";

const AddMaintenance = () => {
    let history = useHistory();

    const onSubmit = (values) => {
        axios.post("http://localhost:3000/month", values).then((res) => {
            console.log(res.data);
            history.push("/maintenancetable");
        });
    };

    const maintenance = {
        monthYear: "",
        date: "",
        transactionId: "",
        amount: 0,
        remark: "",
        location: "Mumbai",
    };

    return <MaintenanceForm onSubmit={onSubmit} initialValues={maintenance} />;
};

export default AddMaintenance;
