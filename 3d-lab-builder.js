"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLQueryBuilder = exports.PostgreSQLQueryBuilder = exports.QueryBuilderDirector = exports.QueryConfig = void 0;
var QueryConfig;
(function (QueryConfig) {
    QueryConfig["getYoungPeople"] = "getYoungPeople";
    QueryConfig["getOldPeople"] = "getOldPeople";
})(QueryConfig || (exports.QueryConfig = QueryConfig = {}));
var QueryBuilderDirector = /** @class */ (function () {
    function QueryBuilderDirector() {
    }
    QueryBuilderDirector.prototype.getQuery = function (builder, queryConfig) {
        // special director logic
        if (queryConfig === QueryConfig.getYoungPeople) {
            builder.select('people', 'Id,Name,Srname,Age,Position');
            builder.where('Age < 40');
            builder.limit(100);
        }
        else {
            builder.select('people', 'Id,Name,Srname,Age,Position');
            builder.where('Age > 40');
            builder.limit(100);
        }
        return builder.getSQL();
    };
    return QueryBuilderDirector;
}());
exports.QueryBuilderDirector = QueryBuilderDirector;
var PostgreSQLQueryBuilder = /** @class */ (function () {
    function PostgreSQLQueryBuilder() {
        this.query = 'Postgre SQL QUERY: ';
    }
    PostgreSQLQueryBuilder.prototype.select = function (table, columns) {
        // special postgre logic
        this.query += "SELECT ".concat(columns, " FROM ").concat(table);
    };
    PostgreSQLQueryBuilder.prototype.where = function (condition) {
        // special postgre logic
        this.query += " WHERE ".concat(condition);
    };
    PostgreSQLQueryBuilder.prototype.limit = function (count) {
        // special postgre logic
        this.query += " LIMIT ".concat(count);
    };
    PostgreSQLQueryBuilder.prototype.getSQL = function () {
        return this.query;
    };
    return PostgreSQLQueryBuilder;
}());
exports.PostgreSQLQueryBuilder = PostgreSQLQueryBuilder;
var MySQLQueryBuilder = /** @class */ (function () {
    function MySQLQueryBuilder() {
        this.query = 'MY SQL QUERY: ';
    }
    MySQLQueryBuilder.prototype.select = function (table, columns) {
        // special MySql logic
        this.query += "SELECT ".concat(columns, " FROM ").concat(table);
    };
    MySQLQueryBuilder.prototype.where = function (condition) {
        // special MySql logic
        this.query += " WHERE ".concat(condition);
    };
    MySQLQueryBuilder.prototype.limit = function (count) {
        // special MySql logic
        this.query += " LIMIT ".concat(count);
    };
    MySQLQueryBuilder.prototype.getSQL = function () {
        return this.query;
    };
    return MySQLQueryBuilder;
}());
exports.MySQLQueryBuilder = MySQLQueryBuilder;
//usage
var director = new QueryBuilderDirector();
// postgre query
var postgreBuilder = new PostgreSQLQueryBuilder();
var postgreQuery = director.getQuery(postgreBuilder, QueryConfig.getYoungPeople);
console.log(postgreQuery);
// my sql query
var mySqlBuilder = new MySQLQueryBuilder();
var mySqlQuery = director.getQuery(mySqlBuilder, QueryConfig.getYoungPeople);
console.log(mySqlQuery);
