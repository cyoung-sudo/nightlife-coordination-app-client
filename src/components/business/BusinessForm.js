import "./BusinessForm.css";

export default function BusinessForm({setTerm, setLocation, setPrice, setOpen, handleSubmit}) {
  return (
    <form id="businessForm" onSubmit={handleSubmit}>
      <div className="businessForm-input">
        <input
          onChange={e => setTerm(e.target.value)}
          type="text" 
          placeholder="term"/>
      </div>      

      <div className="businessForm-input">
        <input
          onChange={e => setLocation(e.target.value)}
          type="text" 
          placeholder="location"/>
      </div>

      <div className="businessForm-checkbox">
        <label>Price: </label>
        <input type="radio" value={1} name="price" defaultChecked onChange={e => setPrice(e.target.value)}/> $
        <input type="radio" value={2} name="price" onChange={e => setPrice(e.target.value)}/> $$
        <input type="radio" value={3} name="price" onChange={e => setPrice(e.target.value)}/> $$$
        <input type="radio" value={4} name="price" onChange={e => setPrice(e.target.value)}/> $$$$
      </div>

      <div className="businessForm-radio">
        <label>Only show open? </label>
        <input type="radio" value={true} name="open" defaultChecked onChange={e => setOpen(e.target.value)}/> Yes
        <input type="radio" value={false} name="open" onChange={e => setOpen(e.target.value)}/> No
      </div>    

      <div className="businessForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};