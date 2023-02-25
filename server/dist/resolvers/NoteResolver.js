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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Note_1 = require("../entities/Note");
const User_1 = require("../entities/User");
let NoteResolver = class NoteResolver {
    constructor() { }
    notes(userId, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEm = em.fork();
            if (userId)
                return newEm.find(Note_1.Note, { user: userId });
            return newEm.find(Note_1.Note, {});
        });
    }
    note(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEm = em.fork();
            return newEm.findOne(Note_1.Note, { id });
        });
    }
    createNote(text, priority, userId, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEm = em.fork();
            const user = yield newEm.findOne(User_1.User, { id: userId });
            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }
            const note = new Note_1.Note();
            note.text = text;
            note.priority = priority;
            note.user = user;
            newEm.persist(note);
            yield newEm.flush();
            return note;
        });
    }
    updateNote(id, text, priority, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEm = em.fork();
            const note = yield newEm.findOne(Note_1.Note, { id });
            if (!note) {
                return null;
            }
            if (text) {
                note.text = text;
            }
            if (priority) {
                note.priority = priority;
            }
            yield newEm.flush();
            return note;
        });
    }
    deleteNote(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEm = em.fork();
            yield newEm.nativeDelete(Note_1.Note, { id });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Note_1.Note]),
    __param(0, (0, type_graphql_1.Arg)("userId", { nullable: true })),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "notes", null);
__decorate([
    (0, type_graphql_1.Query)(() => Note_1.Note, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "note", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Note_1.Note),
    __param(0, (0, type_graphql_1.Arg)("text")),
    __param(1, (0, type_graphql_1.Arg)("priority")),
    __param(2, (0, type_graphql_1.Arg)("userId")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "createNote", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Note_1.Note, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("text", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("priority", { nullable: true })),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "updateNote", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "deleteNote", null);
NoteResolver = __decorate([
    (0, type_graphql_1.Resolver)(Note_1.Note),
    __metadata("design:paramtypes", [])
], NoteResolver);
exports.NoteResolver = NoteResolver;
//# sourceMappingURL=NoteResolver.js.map