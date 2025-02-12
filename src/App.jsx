import React, { useState, useEffect } from 'react';
import companiesServices from './services/companies';
import './HitList.css';
import Heading from './components/Heading';
import Filter from './components/Filter';
import CompanyForm from './components/CompanyForm';
import Companies from './components/Companies';
import Notification from './components/Notification';

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newAbout, setNewAbout] = useState('');
  const [filterName, setFilterName] = useState('');
  const [changeMessage, setChangeMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    companiesServices.getAll().then((initialCompanies) => {
      console.log("Fetched Companies:", initialCompanies);
      setCompanies(initialCompanies);
    });
  }, []);

  const addCompany = async (event) => {
    event.preventDefault();
    
   
    if (!newName || !newNumber) {
      setNotificationType('error');
      setChangeMessage('Name and number are required!');
      return;
    }

    const newCompany = { name: newName, number: newNumber, about: newAbout };

    const existingCompany = companies.find(
      (c) => c.name.toLowerCase() === newCompany.name.toLowerCase()
    );

    if (existingCompany) {
      if (existingCompany.number === newCompany.number) {
        setNotificationType('error');
        setChangeMessage(`${newName} is already added to the list`);
      } else if (window.confirm(`${newName} already exists. Update the address?`)) {
        try {
          const updatedCompany = await companiesServices.update(existingCompany.id, { ...existingCompany, number: newNumber });
          setCompanies(companies.map((c) => (c.id !== existingCompany.id ? c : updatedCompany)));
          setNewName('');
          setNewNumber('');
          setNewAbout('');
          setNotificationType('success');
          setChangeMessage(`Updated ${newName}`);
          setTimeout(() => {
            setChangeMessage('');
            setNotificationType('');
          }, 4000); 
        } catch (error) {
          console.error("Error updating company:", error);
          setNotificationType('error');
          setChangeMessage(`Error updating ${newName}`);
        }
      }
    } else {
      try {
        const addedCompany = await companiesServices.create(newCompany);
        setCompanies(companies.concat(addedCompany));
        setNewName('');
        setNewNumber('');
        setNewAbout('');
        setNotificationType('success');
        setChangeMessage(`Added ${newName}`);
        setTimeout(() => {
          setChangeMessage('');
          setNotificationType('');
        }, 4000);
      } catch (error) {
        console.error("Error adding company:", error);
        setNotificationType('error');
        setChangeMessage(`Error: ${error.response?.data?.error || "Failed to add company"}`);
      }
    }
  };

  const deleteCompany = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await companiesServices.removeCompany(id);  // Updated method name here
        setCompanies(companies.filter((c) => c.id !== id));
        setNotificationType('success');
        setChangeMessage(`Deleted ${name}`);
        setTimeout(() => {
          setChangeMessage('');
          setNotificationType('');
        }, 4000); // Clear notification after 5 seconds
      } catch (error) {
        console.error("Error deleting company:", error);
        setNotificationType('error');
        setChangeMessage(`Error deleting ${name}: ${error.message}`);
      }
    }
  };

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleNewAbout = (event) => setNewAbout(event.target.value);
  const handleNewFilter = (event) => setFilterName(event.target.value);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <Heading text="HitList" />
      <Notification message={changeMessage} notificationType={notificationType} />
      <Filter text="Filter shown with" value={filterName} handleNewChange={handleNewFilter} />
      <Heading text="Add a new company" />
      <CompanyForm 
        onSubmit={addCompany} 
        newName={newName} 
        newNumber={newNumber} 
        newAbout={newAbout} 
        handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber} 
        handleNewAbout={handleNewAbout} 
      />
      <Heading text="Companies" />
      <Companies companies={filteredCompanies} deleteCompany={deleteCompany} />
    </div>
  );
};

export default App;
