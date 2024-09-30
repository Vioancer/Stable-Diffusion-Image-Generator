import InputField from "./FormFields/InputField";
import DimensionField from "./FormFields/DimensionField";
import SelectField from "./FormFields/SelectField";
import FileInputField from "./FormFields/FileInputField";
import PromptStrengthField from "./FormFields/PromptStrengthField";

interface FormContainerProps {
  formState: any;
  loading: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  formState,
  loading,
}) => {
  const {
    prompt,
    setPrompt,
    negative_prompt,
    setNegativePrompt,
    advancedOptions,
    setAdvancedOptions,
    width,
    setWidth,
    height,
    setHeight,
    num_outputs,
    setNumOutputs,
    image,
    setImageUrl,
    mask,
    setMaskUrl,
    prompt_strength,
    setPromptStrength,
    errorMessages,
    handleSubmit,
  } = formState;

  return (
    <div className="md:flex-1 w-full sm:min-w-[14rem] lg:min-w-[28rem] grow lg:grow-0 items-center text-center">
      <div className="w-full p-8 bg-white shadow-lg rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">
          Stable Diffusion AI Image Generator
        </h2>
        <hr className="mb-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />

        {errorMessages?.length! > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Oops! Validation Errors:</strong>
            <ul className="mt-2">
              {errorMessages.map((message: string, index: number) => (
                <li key={index} className="text-sm">
                  • {message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <InputField
          label="Prompt"
          value={prompt}
          onChange={setPrompt}
          placeholder="Input prompt"
        />

        <DimensionField
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
        />

        <SelectField
          label="Number of Outputs"
          options={[1, 2, 3, 4]}
          value={num_outputs}
          onChange={setNumOutputs}
        />

        {advancedOptions && (
          <>
            <InputField
              label="Negative Prompt (Optional)"
              value={negative_prompt}
              onChange={setNegativePrompt}
              placeholder="Input negative prompt"
            />

            <FileInputField
              label="Image (Optional)"
              description="(Input image for img2img or inpaint mode.)"
              onChange={setImageUrl}
              value={image}
            />

            <FileInputField
              label="Mask (Optional)"
              description="(Input mask for inpaint mode.)"
              onChange={setMaskUrl}
              value={mask}
            />

            <PromptStrengthField
              onChange={setPromptStrength}
              value={prompt_strength}
            />
          </>
        )}

        <button
          className="text-purple-600 mb-4 hover:underline"
          onClick={() => setAdvancedOptions(!advancedOptions)}
        >
          {advancedOptions ? "Hide Advanced Options" : "Show Advanced Options"}
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-600/70 text-white p-2 rounded w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default FormContainer;
