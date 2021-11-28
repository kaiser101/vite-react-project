import validationSchema from "./validationSchema";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { alpha } from "@material-ui/core/styles";

const MaintenanceForm = ({ onSubmit, initialValues }) => {
    let history = useHistory();

    const handleBackClick = () => {
        history.go(-1);
    };

    const {
        handleSubmit,
        getFieldProps,
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    return (
        <div className="container-sm">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label
                        className="col-sm-2 col-form-label"
                        htmlFor="monthYear"
                    >
                        Month of Year
                    </label>
                    <div className="col-sm-4">
                        <input
                            id="monthYear"
                            className="form-control"
                            type="text"
                            {...getFieldProps("monthYear")}
                        />
                    </div>
                    {touched.monthYear && errors.monthYear ? (
                        <div>{errors.monthYear}</div>
                    ) : null}
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" htmlFor="date">
                        Date
                    </label>
                    <div className="col-sm-4">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                clearable
                                id="date"
                                inputValue={values.date}
                                format="dd-MM-yyyy"
                                onChange={(value) =>
                                    setFieldValue(
                                        "date",
                                        moment(value, "DD-MM-YYYY").format(
                                            "DD-MM-YYYY"
                                        )
                                    )
                                }
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    {touched.date && errors.date ? (
                        <div>{errors.date}</div>
                    ) : null}
                </div>

                <div className="mb-3 row">
                    <label
                        className="col-sm-2 col-form-label"
                        htmlFor="transactionId"
                    >
                        Transaction Id
                    </label>
                    <div className="col-sm-4">
                        <input
                            id="transactionId"
                            type="transactionId"
                            className="form-control"
                            {...getFieldProps("transactionId")}
                        />
                    </div>
                    {touched.transactionId && errors.transactionId ? (
                        <div>{errors.transactionId}</div>
                    ) : null}
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" htmlFor="amount">
                        Amount
                    </label>
                    <div className="col-sm-4">
                        <input
                            id="amount"
                            className="form-control"
                            type="text"
                            {...getFieldProps("amount")}
                        />
                    </div>
                    {touched.amount && errors.amount ? (
                        <div>{errors.amount}</div>
                    ) : null}
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" htmlFor="remark">
                        Remark
                    </label>
                    <div className="col-sm-4">
                        <input
                            id="remark"
                            className="form-control"
                            type="text"
                            {...getFieldProps("remark")}
                        />
                    </div>
                    {touched.remark && errors.remark ? (
                        <div>{errors.remark}</div>
                    ) : null}
                </div>

                <div className="mb-3 row">
                    <label
                        className="col-sm-2 col-form-label"
                        htmlFor="location"
                    >
                        Location
                    </label>
                    <div className="col-sm-4">
                        <select
                            className="form-select"
                            name="location"
                            id="location"
                            {...getFieldProps("location")}
                        >
                            <option value="" label="Select a location" />
                            <option value="Mumbai" label="Mumbai" />
                            <option value="Pune" label="Pune" />
                        </select>
                    </div>
                    {touched.location && errors.location ? (
                        <div>{errors.location}</div>
                    ) : null}
                </div>

                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3 me-2">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning mb-3"
                        onClick={() => handleBackClick()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MaintenanceForm;
