"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./configuration/data-source");
require("reflect-metadata");
const campus_route_1 = __importDefault(require("./routes/campus.route"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.json());
app.use('/campus', campus_route_1.default);
data_source_1.AppDataSource.initialize();
app.get("/", (req, res) => {
    res.send("Course service is running at port 3001");
});
app.listen(PORT, () => {
    console.log(`Course service started at port ${PORT}`);
});
// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Node TS server is running",
    });
});
exports.default = app;
