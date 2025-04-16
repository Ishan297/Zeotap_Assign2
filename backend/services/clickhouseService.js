const { ClickHouse } = require('clickhouse');
const fs = require('fs');

const getClickHouseClient = (config) => {
    return new ClickHouse({
        url: `http://${config.host}:${config.port}`,
        basicAuth: {
            username: config.user,
            password: '', // If required
        },
        headers: {
            Authorization: `Bearer ${config.jwt}`
        },
        database: config.database,
    });
};

const getClickHouseColumns = async (config, table) => {
    const clickhouse = getClickHouseClient(config);
    const query = `DESCRIBE TABLE ${table}`;
    const result = await clickhouse.query(query).toPromise();
    return result.map(col => col.name);
};

const ingestToFile = async (config, table, columns, delimiter = ',') => {
    const clickhouse = getClickHouseClient(config);
    const query = `SELECT ${columns.join(',')} FROM ${table}`;
    const result = await clickhouse.query(query).toPromise();

    const filePath = `./uploads/output_${Date.now()}.csv`;
    const writeStream = fs.createWriteStream(filePath);
    let count = 0;

    result.forEach(row => {
        const line = columns.map(col => row[col]).join(delimiter);
        writeStream.write(line + '\n');
        count++;
    });

    writeStream.end();
    return count;
};

const ingestToClickHouse = async (config, filePath, columns, table) => {
    const clickhouse = getClickHouseClient(config);
    const rows = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
    let count = 0;

    for (let row of rows) {
        const values = row.split(',').map(v => `'${v.trim()}'`).join(',');
        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${values})`;
        await clickhouse.query(query).toPromise();
        count++;
    }

    return count;
};

module.exports = {
    getClickHouseColumns,
    ingestToFile,
    ingestToClickHouse,
};
