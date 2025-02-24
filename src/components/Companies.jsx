import React from 'react';
import '../Companies.css'; 

const Companies = ({ companies, deleteCompany }) => {
  return (
    <div className="companies-container">
      {companies.length === 0 ? (
        <p>No companies available.</p>
      ) : (
        <ul className="companies-list">
          {companies.map((company) => (
            <li key={company.id} className="company-item">
              <div className="company-info">
                <strong>{company.companyName}</strong> | {company.jobTitle} | {company.location}
                <p className="company-about"> <strong>Description:</strong> {company.description}</p>
                <p className="company-url"> <strong>Post URL:</strong> <a href={company.postUrl} target="_blank" rel="noopener noreferrer">{company.postUrl}</a></p>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteCompany(company.id, company.companyName)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Companies;
