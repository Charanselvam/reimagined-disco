"use client";

import { useState } from 'react';

const CreateComponent = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('text');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/save-component', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type }),
    });

    const result = await response.json();
    if (result.success) {
      alert('Component saved successfully');
      setName('');
      setType('text');
    } else {
      alert('Failed to save component');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Component</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="text">TextBox</option>
              <option value="password">SecretTextBox</option>
              <option value="date">DateInput</option>
              <option value="file">FileInput</option>
              <option value="tel">TelInput</option>
              <option value="reset">ResetButton</option>
              <option value="email">EmailInput</option>
              <option value="radio">RadioButton</option>
              <option value="checkbox">CheckBox</option>
              <option value="select">Dropdown</option>
            </select>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">Save Component</button>
        </form>
      </div>
    </div>
  );
};

export default CreateComponent;
