import React from 'react';

const ColumnSelector = ({ columns, selectedColumns, setSelectedColumns }) => {
    const toggleColumn = (col) => {
        if (selectedColumns.includes(col)) {
            setSelectedColumns(selectedColumns.filter(c => c !== col));
        } else {
            setSelectedColumns([...selectedColumns, col]);
        }
    };

    return (
        <div>
            <h3>Select Columns</h3>
            {columns.length === 0 ? <p>No columns loaded.</p> : (
                <div>
                    {columns.map((col, idx) => (
                        <label key={idx}>
                            <input
                                type="checkbox"
                                value={col}
                                checked={selectedColumns.includes(col)}
                                onChange={() => toggleColumn(col)}
                            />
                            {col}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColumnSelector;
