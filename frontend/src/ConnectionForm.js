import React from 'react';

const ConnectionForm = ({ sourceType, setSourceType, clickhouseConfig, setClickhouseConfig, file, setFile }) => {
    const handleChange = (e) => {
        setClickhouseConfig({
            ...clickhouseConfig,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2>Source Selection</h2>
            <label>
                <input
                    type="radio"
                    value="clickhouse"
                    checked={sourceType === 'clickhouse'}
                    onChange={(e) => setSourceType(e.target.value)}
                />
                ClickHouse
            </label>
            <label>
                <input
                    type="radio"
                    value="file"
                    checked={sourceType === 'file'}
                    onChange={(e) => setSourceType(e.target.value)}
                />
                Flat File
            </label>

            {sourceType === 'clickhouse' ? (
                <div>
                    <h3>ClickHouse Config</h3>
                    <input type="text" name="host" placeholder="Host" onChange={handleChange} />
                    <input type="text" name="port" placeholder="Port" onChange={handleChange} />
                    <input type="text" name="database" placeholder="Database" onChange={handleChange} />
                    <input type="text" name="user" placeholder="User" onChange={handleChange} />
                    <input type="text" name="jwt" placeholder="JWT Token" onChange={handleChange} />
                    <input type="text" name="table" placeholder="Table Name" onChange={handleChange} />
                </div>
            ) : (
                <div>
                    <h3>Upload Flat File (CSV)</h3>
                    <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
                </div>
            )}
        </div>
    );
};

export default ConnectionForm;
