"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT;
const data_source_1 = require("./configuration/data-source");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    const frontendUrl = process.env.FRONTEND_URL;
    if (frontendUrl) {
        res.header('Access-Control-Allow-Origin', frontendUrl);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    }
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    return next();
});
app.use(express_1.default.json());
app.use('/course');
// connectDB()
data_source_1.AppDataSource.initialize();
app.get("/", (req, res) => {
    res.send("Course service is running at port 3001");
});
app.listen(PORT, () => {
    console.log(`Course service started at port ${PORT}`);
});
exports.default = app;
