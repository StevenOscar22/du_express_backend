export const logsRequest = (req, res, next) => {
    console.log("Request Made: ", {
        method: req.method,
        path: req.path
    });
    next();
}
