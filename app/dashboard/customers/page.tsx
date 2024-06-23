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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!data || !data.components) {
    return <div className="flex items-center justify-center min-h-screen">Error fetching data.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        {data.components.map((component, index) => {
          const Component = componentMap[component.type];
          return Component ? (
            <div key={index} className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700">{component.name}</label>
              <Component
                name={component.name}
                value={formData[component.name] || ''}
                onChange={handleChange}
                size={component.size}
                options={component.options.filter(option => option.Value && option.DisplayValue)}
                className="p-2 border rounded"
              />
            </div>
          ) : null;
        })}
        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IndexPage;
