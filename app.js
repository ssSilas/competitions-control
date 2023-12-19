import express from "express";
import createError from "http-errors"
import database from "./db/database.js";
import contest_router from "./routes/contest.router.js";

const host = '0.0.0.0';
const port = 3000;

// Create databases...
database.sync({logging: false, force: false}).then(result => {
    console.log(" * DB Synced!");
}).catch(reason => {
    console.log(reason);
});




// Start express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/ping', function (req, res, next) {
    res.send({'detail': "Ping GET!"});
})

app.use('/contest', contest_router);



app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        'error': true,
        'msg': err.message
    });
});

app.listen(port, host, () => {
    console.log(`Express is running at http://${host}:${port}`)
});
