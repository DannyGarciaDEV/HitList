
import Part from './Part';
import Button from './Button';

const CompanyForm = ({
  onSubmit,
  newName,
  newTitle, 
  newLocation,
  newUrl,
  newDescription,
  handleNewName,
  handleNewTitle, 
  handleNewLocation,
  handleNewUrl,
  handleNewDescription,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add New Company</h2>
      <div className="input-group">
        <Part text="Name of Company:" value={newName} handleNewChange={handleNewName} />
        <Part text="Job Title:" value={newTitle} handleNewChange={handleNewTitle} />
        <Part text="Location:" value={newLocation} handleNewChange={handleNewLocation} />
        <Part text="Post Url:" value={newUrl} handleNewChange={handleNewUrl} />
        <Part text="Description:" value={newDescription} handleNewChange={handleNewDescription} />
      </div>
      <Button text="Add Company" type="submit" />
    </form>
  );
};

export default CompanyForm;
