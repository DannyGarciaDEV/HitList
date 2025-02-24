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
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
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
    
    if (!newName || !newTitle || !newLocation || !newUrl || !newDescription) {
      setNotificationType('error');
      setChangeMessage('All fields are required!');
      return;
    }

    const newCompany = { 
      companyName: newName, 
      jobTitle: newTitle, 
      location: newLocation, 
      postUrl: newUrl, 
      description: newDescription 
    };

    const existingCompany = companies.find(
      (c) => c.companyName.toLowerCase() === newCompany.companyName.toLowerCase()
    );

    if (existingCompany) {
      if (window.confirm(`${newName} already exists. Update the details?`)) {
        try {
          const updatedCompany = await companiesServices.update(existingCompany.id, { ...existingCompany, ...newCompany });
          setCompanies(companies.map((c) => (c.id !== existingCompany.id ? c : updatedCompany)));
          resetForm();
          setNotificationType('success');
          setChangeMessage(`Updated ${newName}`);
          clearNotification();
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
        resetForm();
        setNotificationType('success');
        setChangeMessage(`Added ${newName}`);
        clearNotification();
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
        await companiesServices.removeCompany(id);
        setCompanies(companies.filter((c) => c.id !== id));
        setNotificationType('success');
        setChangeMessage(`Deleted ${name}`);
        clearNotification();
      } catch (error) {
        console.error("Error deleting company:", error);
        setNotificationType('error');
        setChangeMessage(`Error deleting ${name}: ${error.message}`);
      }
    }
  };

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewTitle = (event) => setNewTitle(event.target.value);
  const handleNewLocation = (event) => setNewLocation(event.target.value);
  const handleNewUrl = (event) => setNewUrl(event.target.value);
  const handleNewDescription = (event) => setNewDescription(event.target.value);
  const handleNewFilter = (event) => setFilterName(event.target.value);

  const resetForm = () => {
    setNewName('');
    setNewTitle('');
    setNewLocation('');
    setNewUrl('');
    setNewDescription('');
  };

  const clearNotification = () => {
    setTimeout(() => {
      setChangeMessage('');
      setNotificationType('');
    }, 4000);
  };

  const filteredCompanies = companies.filter((c) =>
    c.companyName.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <Heading text="HitList" />
      <Notification message={changeMessage} notificationType={notificationType} />
    
      <Heading text="Add a new company" />
    
      <CompanyForm 
        onSubmit={addCompany} 
        newName={newName} 
        newTitle={newTitle} 
        newLocation={newLocation} 
        newUrl={newUrl} 
        newDescription={newDescription} 
        handleNewName={handleNewName} 
        handleNewTitle={handleNewTitle} 
        handleNewLocation={handleNewLocation} 
        handleNewUrl={handleNewUrl} 
        handleNewDescription={handleNewDescription} 
      />
        <Filter text="Filter shown with" value={filterName} handleNewChange={handleNewFilter} />
      <Heading text="Companies" />
      <Companies companies={filteredCompanies} deleteCompany={deleteCompany} />
    </div>
  );
};

export default App;
