"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./entities/User");
const Note_1 = require("./entities/Note");
const constant_1 = require("./utils/constant");
exports.default = {
    entities: [User_1.User, Note_1.Note],
    dbName: "viral_nation",
    password: "Aryan@411",
    type: "postgresql",
    debug: constant_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map