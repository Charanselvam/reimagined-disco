// pages/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/retriever', {
          params: {
            masterName: 'EmailListAPI',
            childName: 'GetEmailList'
          }
        });
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div>
      <h1>Email Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.active_emails && (
            <tr>
              <td colSpan="4">Active Emails</td>
            </tr>
          )}
          {data.active_emails && data.active_emails.map(email => (
            <tr key={email.id}>
              <td>{email.id}</td>
              <td>{email.email}</td>
              <td>{email.name}</td>
              <td>{email.status}</td>
            </tr>
          ))}
          {data.inactive_emails && (
            <tr>
              <td colSpan="4">Inactive Emails</td>
            </tr>
          )}
          {data.inactive_emails && data.inactive_emails.map(email => (
            <tr key={email.id}>
              <td>{email.id}</td>
              <td>{email.email}</td>
              <td>{email.name}</td>
              <td>{email.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
