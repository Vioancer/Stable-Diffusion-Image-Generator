interface SelectFieldProps {
  label: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) => (
  <div className="mb-4">
    <label className="block text-left mb-2 font-medium">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          className={`p-2 grow min-w-10 aspect-1/2 rounded-lg border ${
            value === option
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default SelectField;
