import "./toggle.css";

export const Toggle = ({ handleChange, isChecked, label }) => {
    return(
        <div className="toggle-container">
            <input 
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">{label}</label>
        </div>
    );
};