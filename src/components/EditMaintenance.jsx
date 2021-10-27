import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MaintenanceForm from "./MaintenanceForm";

const EditMaintenance = () => {
    const history = useHistory();

    const { id } = useParams();

    const onSubmit = (values) => {
        console.log(values);

        axios.put("http://localhost:3000/month", values).then((res) => {
            console.log(res.data);
            history.push("/maintenancetable");
        });
    };

    const [maintenance, setMaintenance] = useState({
        _id: "",
        monthYear: "",
        date: "",
        transactionId: "",
        amount: 0,
        remark: "",
        location: "Mumbai",
    });

    useEffect(() => {
        const getMaintenance = async (id) => {
            console.log(id);

            axios.get(`http://localhost:3000/${id}`).then((res) => {
                setMaintenance(res.data);
            });
        };

        getMaintenance(id);
    }, []);

    return <MaintenanceForm onSubmit={onSubmit} initialValues={maintenance} />;
};

export default EditMaintenance;
