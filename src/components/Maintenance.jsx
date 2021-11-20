import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import { parse, isDate } from "date-fns";
import { useHistory } from "react-router-dom";

const Maintenance = () => {
    const history = useHistory();

    const deleteMaintenance = (_id) => {
        console.log(_id);

        if (confirm("Do you want to delete this record")) {
            axios
                .delete("http://localhost:3000/month", {
                    data: {
                        _id,
                    },
                })
                .then((res) => {
                    history.go(0);
                });
        }
    };

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery("maintenance;", () =>
        axios.get("http://localhost:3000").then((res) => res.data)
    );

    if (error) return "An error has occurred: " + error.message;

    const sortedData = _.sortBy(data, (record) =>
        parse(record.date, "dd-MM-yyyy", new Date())
    );

    return (
        <div className="container">
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Month-Year</th>
                        <th scope="col">Date</th>
                        <th scope="col">Transaction Id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {_.map(sortedData, (record) => {
                        const {
                            _id,
                            monthYear,
                            date,
                            transactionId,
                            amount,
                            remark,
                        } = record;
                        return (
                            <tr scope="col" key={_id}>
                                <td>{monthYear}</td>
                                <td>{date}</td>
                                <td>{transactionId}</td>
                                <td>{amount}</td>
                                <td>{remark}</td>
                                <td>
                                    <Link to={"/maintenance/" + _id}>
                                        <button
                                            type="button"
                                            className="btn btn-primary mb-3 me-3"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => deleteMaintenance(_id)}
                                        className="btn btn-warning mb-3"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                <Link to="/maintenance/add">
                    <button type="button" className="btn btn-primary mb-3">
                        Add
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Maintenance;
