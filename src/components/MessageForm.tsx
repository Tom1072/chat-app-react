import React, { useState } from "react";
import { sendMessage } from '../ClientSocket'


interface MessageFormProps {
    name: string
}

const MessageForm: React.FC<MessageFormProps> = ({ name }) => {
    const [message, setMessage] = useState("");

    // Preprocess before making connection request
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) {
            return // Nothing to do
        }
        sendMessage(name, message);
        setMessage("")
    }

    return (
        <form className="m-3" onSubmit={handleSubmit}>
            <div className="input-group mb-2 mt-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </div>
        </form >
    );
};

export default MessageForm;
