// IndexPage.js
"use client";

import { useState, useEffect } from 'react';
import {
  TextBox,
  SecretTextBox,
  DateInput,
  FileInput,
  TelInput,
  ResetButton,
  EmailInput,
  RadioButton,
  CheckBox,
  Dropdown
} from './components';
import CreateComponent from './CreateComponent'; // Import the CreateComponent

const componentMap = {
  text: TextBox,
  password: SecretTextBox,
  date: DateInput,
  file: FileInput,
  tel: TelInput,
  reset: ResetButton,
  email: EmailInput,
  radio: RadioButton,
  checkbox: CheckBox,
  select: Dropdown
};

const IndexPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [components, setComponents] = useState([]);
  const [newComponents, setNewComponents] = useState([]); // State for newly added components

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        masterName: 'Components',
        childName: 'GetComponentes'
      });

      try {
        const response = await fetch(`/api/retriever?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData.results);
        setComponents(jsonData.results.components || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
          ? [...(prev[name] || []), value]
          : prev[name].filter(v => v !== value)
        : value
    }));
  };

  const handleCreateComponent = (newComponent) => {
    setComponents(prev => [...prev, newComponent]);
    setNewComponents(prev => [...prev, newComponent]); // Add to new components list
    setShowCreateComponent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formName: 'DynamicForm',
          formData: formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      alert(`Form submitted successfully with ID: ${result.id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  const handleSaveComponentsToDB = async () => {
    if (newComponents.length === 0) {
      alert('No new components to save');
      return;
    }

    try {
      const response = await fetch('/api/save-components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ components: newComponents })
      });

      if (!response.ok) {
        throw new Error('Failed to save components to database');
      }

      const result = await response.json();
      alert(`Components saved successfully with IDs: ${result.ids.join(', ')}`);
      setNewComponents([]); // Clear the new components list after saving
    } catch (error) {
      console.error('Error saving components:', error);
      alert('Failed to save components to database');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!data || !data.components) {
    return <div className="flex items-center justify-center min-h-screen">Error fetching data.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Form</h1>
      <button
        onClick={() => setShowCreateComponent(!showCreateComponent)}
        className="mb-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
      >
       {showCreateComponent ? 'x' : '+'}
      </button>
      {showCreateComponent && (
        <CreateComponent
          onCreate={handleCreateComponent}
          onClose={() => setShowCreateComponent(false)}
        />
      )}
<form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
    {components.map((component, index) => {
      const Component = componentMap[component.type];
      return Component ? (
        <div key={index} className="grid grid-cols-2 gap-4 items-center">
          <label className="font-semibold text-gray-700">{component.name}</label>
          <Component
            name={component.name}
            value={formData[component.name] || ''}
            onChange={handleChange}
            placeholder={component.placeholder}
            required={component.required}
            size={component.size}
            options={component.options?.filter(option => option.Value && option.DisplayValue)}
            className="p-2 border rounded"
          />
        </div>
      ) : null;
    })}
  </div>
  <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
    Submit
  </button>
  <button type="button" onClick={handleSaveComponentsToDB} className="w-full py-3 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
    Save Components to DB
  </button>
</form>

    </div>
  );
};

export default IndexPage;
