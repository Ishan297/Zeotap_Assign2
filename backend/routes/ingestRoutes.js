const express = require('express');
const multer = require('multer');
const {
    getClickHouseColumns,
    ingestToFile,
    ingestToClickHouse
} = require('../services/clickhouseService');
const { getFileColumns } = require('../services/fileService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/get-columns', async (req, res) => {
    const { source, table, clickhouseConfig, filePath } = req.body;

    try {
        if (source === 'clickhouse') {
            const columns = await getClickHouseColumns(clickhouseConfig, table);
            res.json({ columns });
        } else {
            const columns = await getFileColumns(`uploads/${filePath}`);
            res.json({ columns });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/ingest-to-file', async (req, res) => {
    const { clickhouseConfig, table, selectedColumns, delimiter } = req.body;

    try {
        const count = await ingestToFile(clickhouseConfig, table, selectedColumns, delimiter);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/ingest-to-clickhouse', upload.single('file'), async (req, res) => {
    try {
        const { selectedColumns, table, clickhouseConfig } = req.body;
        const count = await ingestToClickHouse(
            JSON.parse(clickhouseConfig),
            req.file.path,
            selectedColumns,
            table
        );
        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
