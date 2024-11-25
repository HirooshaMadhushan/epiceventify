
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';

const AddToActive = ({ visible, onCancel, onConfirm, eventDetails }) => {
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        setLoading(true);
        try {
            console.log(eventDetails.event_id);
            const response = await axios.put(`http://localhost:8000/AddToActiveEvent/${eventDetails.event_id}`); // Update the URL with the correct endpoint
            console.log(response.data); // Optional: Handle success message from backend
            setLoading(false);
            onConfirm(); // Close modal after successful action
        } catch (error) {
            console.error('Error updating event type:', error);
            setLoading(false);
            // Handle error
        }
    };

    const handleCancel = () => {
        onCancel(); // Close the modal without performing any action
    };

    return (
        <Modal
            title="Confirm Update"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText="Ok"
            cancelText="Cancel"
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Back
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Ok
                </Button>,
            ]}
        >
            <p>Are you sure, you want to active this event?</p>
        </Modal>
    );
};

export default AddToActive;
