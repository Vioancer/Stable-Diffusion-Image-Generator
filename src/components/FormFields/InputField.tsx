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
}: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-left mb-2 font-medium">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={true}
    />
  </div>
);

export default InputField;
