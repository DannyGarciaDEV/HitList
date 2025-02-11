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
                <strong>{company.name}</strong> | {company.number}
                <p className="company-about"> <strong>About:</strong> {company.about}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteCompany(company.id, company.name)}
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
