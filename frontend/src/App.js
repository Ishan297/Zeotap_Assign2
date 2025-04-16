import React, { useState } from 'react';
import axios from 'axios';
import ConnectionForm from './ConnectionForm';
import ColumnSelector from './ColumnSelector';
import IngestionPanel from './IngestionPanel';
import StatusDisplay from './StatusDisplay';

function App() {
  const [sourceType, setSourceType] = useState('clickhouse');
  const [clickhouseConfig, setClickhouseConfig] = useState({});
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [recordCount, setRecordCount] = useState(null);

  const loadColumns = async () => {
    setStatus('Loading columns...');
    try {
      let res;
      if (sourceType === 'clickhouse') {
        res = await axios.post('http://localhost:5000/get-columns', {
          source: 'clickhouse',
          table: clickhouseConfig.table,
          clickhouseConfig,
        });
      } else {
        const formData = new FormData();
        formData.append('file', file);
        res = await axios.post('http://localhost:5000/get-columns', {
          source: 'file',
          filePath: file.name,
        });
      }
      setColumns(res.data.columns);
      setStatus('Columns loaded.');
    } catch (err) {
      setStatus('Failed to load columns');
    }
  };

  const handleIngest = async () => {
    setStatus('Ingesting...');
    try {
      let res;
      if (sourceType === 'clickhouse') {
        res = await axios.post('http://localhost:5000/ingest-to-file', {
          clickhouseConfig,
          table: clickhouseConfig.table,
          selectedColumns,
          delimiter: ',',
        });
      } else {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('table', clickhouseConfig.table);
        formData.append('selectedColumns', selectedColumns);
        formData.append('clickhouseConfig', JSON.stringify(clickhouseConfig));
        res = await axios.post('http://localhost:5000/ingest-to-clickhouse', formData);
      }
      setRecordCount(res.data.count);
      setStatus('Ingestion completed.');
    } catch (err) {
      setStatus('Ingestion failed: ' + err.message);
    }
  };

  return (
    <div className="App">
      <h1>ClickHouse ↔ Flat File Ingestion</h1>
      <ConnectionForm
        sourceType={sourceType}
        setSourceType={setSourceType}
        clickhouseConfig={clickhouseConfig}
        setClickhouseConfig={setClickhouseConfig}
        file={file}
        setFile={setFile}
      />
      <button onClick={loadColumns}>Load Columns</button>
      <ColumnSelector columns={columns} selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
      <IngestionPanel onIngest={handleIngest} />
      <StatusDisplay status={status} recordCount={recordCount} />
    </div>
  );
}

export default App;
