import React from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";

export default ({ show, message, status }) => {

    return (
        <div>
            <AlertContainer
                position="top-left"
            >
                {show
                    ? (
                        <Alert
                            type={status}
                            headline={status}
                        >
                            {message}
                        </Alert>
                    )
                    : null}
            </AlertContainer>
        </div>
    );

}
