import React from 'react';

const IngestionPanel = ({ onIngest }) => {
    return (
        <div>
            <button onClick={onIngest}>Start Ingestion</button>
        </div>
    );
};

export default IngestionPanel;
