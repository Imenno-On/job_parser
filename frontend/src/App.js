import React, { useState } from 'react';
import axios from 'axios';
import JobList from './components/JobList';
import SearchForm from './components/SearchForm';
import './styles/App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (keyword, location, salaryFrom, salaryTo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/api/jobs/search/', {
        params: {
          keyword: keyword,
          location: location,
          salary_from: salaryFrom,
          salary_to: salaryTo,
        },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      setError('Failed to fetch jobs.');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Search</h1>
      </header>
      <SearchForm onSearch={handleSearch}/>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;