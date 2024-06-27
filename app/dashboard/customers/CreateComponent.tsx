"use client";

import { useState } from 'react';

const CreateComponent = ({ onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState({ DisplayValue: '', Value: '' });
  const [placeholder, setPlaceholder] = useState('');
  const [required, setRequired] = useState(false);
  const handleAddOption = () => {
    if (newOption.DisplayValue && newOption.Value) {
      setOptions([...options, newOption]);
      setNewOption({ DisplayValue: '', Value: '' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComponent = { name, type, options, placeholder, required };
    onCreate(newComponent);
    setName('');
    setType('text');
    setOptions([]);
    setPlaceholder('');
    setRequired(false);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full">
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
        <div>
          <label className="block mb-2 font-semibold">Placeholder:</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Required:</label>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="p-2 border rounded"
          />
        </div>
        {(type === 'radio' || type === 'checkbox' || type === 'select') && (
          <div>
            <label className="block mb-2 font-semibold">Options:</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Display Value"
                value={newOption.DisplayValue}
                onChange={(e) => setNewOption({ ...newOption, DisplayValue: e.target.value })}
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Value"
                value={newOption.Value}
                onChange={(e) => setNewOption({ ...newOption, Value: e.target.value })}
                className="p-2 border rounded w-full"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
            <ul>
              {options.map((option, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{option.DisplayValue} ({option.Value})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Save Component
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComponent;
