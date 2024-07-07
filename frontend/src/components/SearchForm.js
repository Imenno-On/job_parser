import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword || !location || !salaryFrom || !salaryTo) {
      alert('Please fill all fields');
      return;
    }
    onSearch(keyword, location, parseInt(salaryFrom, 10), parseInt(salaryTo, 10));
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salary From"
        value={salaryFrom}
        onChange={(e) => setSalaryFrom(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salary To"
        value={salaryTo}
        onChange={(e) => setSalaryTo(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
