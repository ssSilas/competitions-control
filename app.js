import express from "express";
import cors from "cors";
import createError from "http-errors"
import contest_router from "./routes/contest.router.js";
import sync from "./db/syncDatabase.js";

const host = '127.0.0.1';
const port = 5000;

// Create databases...
sync()


// Start express
const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:4200'
}));
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
