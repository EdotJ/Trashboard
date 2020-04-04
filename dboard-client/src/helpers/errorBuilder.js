export const buildErrors = (errorObject) => {
    return errorObject.errors.map((x) => {
        return x.message + '\n';
    }).join(',').replace(',', '');
};