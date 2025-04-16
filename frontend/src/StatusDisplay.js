import React from 'react';

const StatusDisplay = ({ status, recordCount }) => {
    return (
        <div>
            <h3>Status</h3>
            <p>{status}</p>
            {recordCount !== null && <p>Total Records Processed: {recordCount}</p>}
        </div>
    );
};

export default StatusDisplay;
