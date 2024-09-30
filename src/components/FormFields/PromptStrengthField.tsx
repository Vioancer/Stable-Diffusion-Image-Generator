interface PromptStrengthFieldProps {
  value: number;
  onChange: (value: number) => void;
}

const PromptStrengthField: React.FC<PromptStrengthFieldProps> = ({
  value,
  onChange,
}: PromptStrengthFieldProps) => (
  <div className="mb-4">
    <label
      htmlFor="promptStrength"
      className="block text-left mb-1 font-medium"
    >
      Prompt Strength
    </label>
    <label className="block text-left mb-2">
      (Prompt Strength for img2img / max is corresponding to full destruction of
      information in image.)
    </label>
    <input
      id="promptStrength"
      type="range"
      min="0"
      max="1"
      step="0.05"
      className="w-full accent-purple-600"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
  </div>
);

export default PromptStrengthField;
