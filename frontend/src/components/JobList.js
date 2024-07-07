import React from 'react';

function JobList({ jobs }) {
  return (
    <div>
      <h2>Job Listings</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index} className='job'>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              {job.title} at {job.company}
            </a> <br />
            Salary: {job.salary_from} - {job.salary_to} <br />
            Location: {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
