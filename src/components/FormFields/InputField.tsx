interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
}: InputFieldProps) => {
  const inputId = label.replace(/\s+/g, "-").toLowerCase(); // Create an id from the label

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-left mb-2 font-medium">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        className="w-full border p-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={true}
      />
    </div>
  );
};

export default InputField;
