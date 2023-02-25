"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const core_1 = require("@mikro-orm/core");
const core_2 = require("@mikro-orm/core");
const core_3 = require("@mikro-orm/core");
const core_4 = require("@mikro-orm/core");
const User_1 = require("./User");
const type_graphql_1 = require("type-graphql");
let Note = class Note {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_3.PrimaryKey)(),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Note.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)({ type: "date", default: Date.now() }),
    __metadata("design:type", Date)
], Note.prototype, "createdDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)({ default: Date.now(), onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Note.prototype, "updatedDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Note.prototype, "priority", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, core_2.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Note.prototype, "user", void 0);
Note = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_4.Entity)({ tableName: "notes" })
], Note);
exports.Note = Note;
//# sourceMappingURL=Note.js.map