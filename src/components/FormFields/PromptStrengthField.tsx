interface PromptStrengthFieldProps {
  value: number;
  onChange: (value: number) => void;
}

const PromptStrengthField: React.FC<PromptStrengthFieldProps> = ({
  value,
  onChange,
}: PromptStrengthFieldProps) => (
  <div className="mb-4">
    <label className="block text-left mb-1 font-medium">
      Prompt Strength (Optional)
    </label>
    <label className="block text-left mb-2">
      (Prompt Strength for img2img / inpaint. 1.0 stands for full destruction of
      information in image.)
    </label>
    <input
      type="number"
      min="0"
      max="1"
      step="0.05"
      className="w-full border p-2 rounded"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
  </div>
);

export default PromptStrengthField;
