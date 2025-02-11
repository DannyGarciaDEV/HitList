const Part = ({ text, value, handleNewChange }) => {
    return (
      <div>
        {text} <input value={value} onChange={handleNewChange} />
      </div>
    );
  };
  
  export default Part;
  