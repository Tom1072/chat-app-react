import React, { useState } from "react";
import { connect } from '../ClientSocket'


interface FormProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
  setGlobalName: React.Dispatch<React.SetStateAction<string>>
  handleNewMessage: (name: string, message: string) => void
}

const ConnectForm: React.FC<FormProps> = ({ setConnected, handleNewMessage, setGlobalName }) => {
  const [name, setName] = useState<string>("");

  // Preprocess before making connection request
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name")
      return
    }
    connect(handleNewMessage);
    setConnected(true);
    setGlobalName(name);
  }

  return (
    <form className="m-3" onSubmit={handleSubmit}>
      <div className="input-group mb-2 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Connect
      </button>
    </form>
  );
};

export default ConnectForm;
