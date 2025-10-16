import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ text = "Yüklənir..." }) => {
    return (
        <div className="d-flex align-items-center justify-content-center flex-column py-4">
            <Spinner animation="border" role="status" variant="primary" />
            <span className="mt-2 text-muted">{text}</span>
        </div>
    );
};

export default LoadingSpinner;