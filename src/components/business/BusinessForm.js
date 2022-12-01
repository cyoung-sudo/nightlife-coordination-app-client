import "./BusinessForm.css";

export default function BusinessForm({setCategory, setLocation, handleSubmit}) {
  return (
    <form id="businessForm" onSubmit={handleSubmit}>
      <div className="businessForm-input">
        <input
          onChange={e => setCategory(e.target.value)}
          type="text" 
          placeholder="category"/>
      </div>      

      <div className="businessForm-input">
        <input
          onChange={e => setLocation(e.target.value)}
          type="text" 
          placeholder="location"/>
      </div>      

      <div className="businessForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};