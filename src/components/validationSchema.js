import * as Yup from "yup";
import { parse, isDate } from "date-fns";

const parseDateString = (value, originalValue) =>
    isDate(originalValue)
        ? originalValue
        : parse(originalValue, "dd-MM-yyyy", new Date());

const validationSchema = Yup.object({
    monthYear: Yup.string().required("Required"),
    date: Yup.date().transform(parseDateString).required("Required"),
    transactionId: Yup.string().required("Required"),
    amount: Yup.number().required("Required"),
    remark: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
});

export default validationSchema;
