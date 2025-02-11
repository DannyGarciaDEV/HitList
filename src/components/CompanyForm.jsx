import React from 'react';

import Part from './Part';
import Button from './Button';

const CompanyForm = ({
  onSubmit,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  newAbout,
  handleNewAbout,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add New Company</h2>
      <div className="input-group">
        <Part text="Name of Company:" value={newName} handleNewChange={handleNewName} />
        <Part text="Location:" value={newNumber} handleNewChange={handleNewNumber} />
        <Part text="About:" value={newAbout} handleNewChange={handleNewAbout} />
      </div>
      <Button text="Add Company" type="submit" />
    </form>
  );
};

export default CompanyForm;
