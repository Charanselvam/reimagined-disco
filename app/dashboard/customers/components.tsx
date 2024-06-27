// components/TextBox.js
export const TextBox = ({ name, value, onChange, size ,placeholder,required}) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="p-2 border rounded"
      size={size}
    />
  );
};

// components/SecretTextBox.js
export const SecretTextBox = ({ name, value, onChange, size }) => {
  return (
    <input
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
      size={size}
    />
  );
};

// components/DateInput.js
export const DateInput = ({ name, value, onChange }) => {
  return (
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
    />
  );
};

// components/FileInput.js
export const FileInput = ({ name, value, onChange }) => {
  return (
    <input
      type="file"
      name={name}
      onChange={onChange}
      className="p-2 border rounded"
    />
  );
};

// components/TelInput.js
export const TelInput = ({ name, value, onChange, size }) => {
  return (
    <input
      type="tel"
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
      size={size}
    />
  );
};

// components/ResetButton.js
export const ResetButton = ({ name, onClick }) => {
  return (
    <button
      type="reset"
      name={name}
      onClick={onClick}
      className="p-2 border rounded"
    >
      Reset
    </button>
  );
};

// components/EmailInput.js
export const EmailInput = ({ name, value, onChange, size }) => {
  return (
    <input
      type="email"
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
      size={size}
    />
  );
};

// components/RadioButton.js
export const RadioButton = ({ name, value, onChange, options }) => {
  return options.map((option, index) => (
    <label key={index} className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={option.Value}
        checked={value === option.Value}
        onChange={onChange}
      />
      {option.DisplayValue}
    </label>
  ));
};

// components/CheckBox.js
export const CheckBox = ({ name, value, onChange, options }) => {
  return options.map((option, index) => (
    <label key={index} className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        value={option.Value}
        checked={value.includes(option.Value)}
        onChange={onChange}
      />
      {option.DisplayValue}
    </label>
  ));
};

// components/Dropdown.js
export const Dropdown = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
    >
      {options.map((option, index) => (
        <option key={index} value={option.Value}>
          {option.DisplayValue}
        </option>
      ))}
    </select>
  );
};
