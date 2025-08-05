import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceRes = await fetch('http://127.0.0.1:5000/data/prices');
        const priceData = await priceRes.json();
        setPrices(priceData);

        const eventRes = await fetch('http://127.0.0.1:5000/data/events');
        const eventData = await eventRes.json();
        setEvents(eventData);

        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;

  return (
    <div>
      <h2>Data Summary</h2>
      <p><strong>Prices loaded:</strong> {prices.length}</p>
      <p><strong>Events loaded:</strong> {events.length}</p>

      <h3>Recent Events</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {events.slice(0, 10).map((event, idx) => (
            <tr key={idx}>
              <td>{new Date(event.StartDate).toLocaleDateString()}</td>
              <td>{event.Event}</td>
              <td>{event.Description}</td>
              <td>{event.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;