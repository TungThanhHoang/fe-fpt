export default function Validate(value) {
    let errors = {};
    if (!/^[^0-9][a-zA-Z0-9]+@fsoft.com.vn$/.test(value.to)) {
        errors.to = true;
    }
    if (!value.subject) {
        errors.subject = true;
    }
    if (!value.content) {
        errors.content = true;
    }
    return errors;
};
