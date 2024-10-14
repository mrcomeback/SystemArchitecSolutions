export interface QueryBuilder {
    select(table: string, columns: string): void;
    where(condition: string): void;
    limit(count: number): void;
    getSQL(): string;
}

export enum QueryConfig {
    getYoungPeople = 'getYoungPeople',
    getOldPeople = 'getOldPeople'
}

export class QueryBuilderDirector {
    getQuery(builder: QueryBuilder, queryConfig: QueryConfig): string {
        // special director logic
        if (queryConfig === QueryConfig.getYoungPeople) {
            builder.select('people', 'Id,Name,Srname,Age,Position');
            builder.where('Age < 40');
            builder.limit(100);
        } else {
            builder.select('people', 'Id,Name,Srname,Age,Position');
            builder.where('Age > 40');
            builder.limit(100);
        }

        return builder.getSQL();
    }
}

export class PostgreSQLQueryBuilder implements QueryBuilder {
    private query: string = 'Postgre SQL QUERY: ';

    select(table: string, columns: string): void {
        // special postgre logic
        this.query += `SELECT ${columns} FROM ${table}`;
    }

    where(condition: string): void {
        // special postgre logic
        this.query += ` WHERE ${condition}`;
    }

    limit(count: number): void {
        // special postgre logic
        this.query += ` LIMIT ${count}`;
    }

    getSQL(): string {
        return this.query;
    }
}

export class MySQLQueryBuilder implements QueryBuilder {
    private query: string = 'MY SQL QUERY: ';

    select(table: string, columns: string): void {
        // special MySql logic
        this.query += `SELECT ${columns} FROM ${table}`;
    }

    where(condition: string): void {
        // special MySql logic
        this.query += ` WHERE ${condition}`;
    }

    limit(count: number): void {
        // special MySql logic
        this.query += ` LIMIT ${count}`;
    }

    getSQL(): string {
        return this.query;
    }
}

//usage

const director = new QueryBuilderDirector();

// postgre query
const postgreBuilder = new PostgreSQLQueryBuilder();
const postgreQuery = director.getQuery(postgreBuilder, QueryConfig.getYoungPeople);
console.log(postgreQuery);


// my sql query
const mySqlBuilder = new MySQLQueryBuilder();
const mySqlQuery = director.getQuery(mySqlBuilder, QueryConfig.getYoungPeople);
console.log(mySqlQuery);




