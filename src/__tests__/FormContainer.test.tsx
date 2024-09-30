import { render, screen, fireEvent } from "@testing-library/react";
import FormContainer from "@/components/FormContainer";

// Mock form state
const mockFormState = {
  prompt: "Sample Prompt",
  setPrompt: jest.fn(),
  negative_prompt: "",
  setNegativePrompt: jest.fn(),
  advancedOptions: false,
  setAdvancedOptions: jest.fn(),
  width: 768,
  setWidth: jest.fn(),
  height: 768,
  setHeight: jest.fn(),
  num_outputs: 1,
  setNumOutputs: jest.fn(),
  image: "",
  setImageUrl: jest.fn(),
  mask: "",
  setMaskUrl: jest.fn(),
  prompt_strength: 0.8,
  setPromptStrength: jest.fn(),
  errorMessages: [],
  handleSubmit: jest.fn(),
  loading: false,
};

describe("FormContainer Component", () => {
  test("renders the form fields correctly", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);

    expect(screen.getByLabelText("Prompt")).toBeInTheDocument();
    expect(screen.getByText("Number of Outputs")).toBeInTheDocument();

    // Filter the buttons based on text content or other attributes
    const outputButtons = screen.getAllByRole("button", {
      name: /1|2|3|4/i, // Match buttons with the text 1, 2, 3, or 4
    });

    expect(outputButtons.length).toBe(4); // Check that the output buttons exist
  });

  test("displays error messages when validation fails", () => {
    const mockFormWithErrors = {
      ...mockFormState,
      errorMessages: ["Invalid prompt"],
    };
    render(<FormContainer formState={mockFormWithErrors} loading={false} />);
    expect(screen.getByText(/Oops! Validation Errors:/)).toBeInTheDocument();
    expect(screen.getByText(/Invalid prompt/i)).toBeInTheDocument(); // Use regex to match the error message
  });

  test("triggers handleSubmit when the generate button is clicked", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);
    const generateButton = screen.getByText("Generate");
    fireEvent.click(generateButton);
    expect(mockFormState.handleSubmit).toHaveBeenCalled();
  });

  test("toggles advanced options", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);
    const advancedOptionsButton = screen.getByText("Show Advanced Options");
    fireEvent.click(advancedOptionsButton);
    expect(mockFormState.setAdvancedOptions).toHaveBeenCalledWith(true);
  });

  test("renders advanced options when toggled", () => {
    const mockFormWithAdvancedOptions = {
      ...mockFormState,
      advancedOptions: true,
    };
    render(
      <FormContainer formState={mockFormWithAdvancedOptions} loading={false} />
    );
    expect(
      screen.getByLabelText("Negative Prompt (Optional)")
    ).toBeInTheDocument();
    expect(screen.getByText("Image (Optional)")).toBeInTheDocument();
    expect(screen.getByText("Mask (Optional)")).toBeInTheDocument();
    expect(screen.getByText("Prompt Strength")).toBeInTheDocument();
  });

  test("hides advanced options by default", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);
    expect(
      screen.queryByLabelText("Negative Prompt (Optional)")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Image (Optional)")).not.toBeInTheDocument();
    expect(screen.queryByText("Mask (Optional)")).not.toBeInTheDocument();
    expect(screen.queryByText("Prompt Strength")).not.toBeInTheDocument();
  });

  test("disables generate button when loading", () => {
    render(<FormContainer formState={mockFormState} loading={true} />);
    const generateButton = screen.getByText("Generating...");
    expect(generateButton).toBeDisabled();
  });

  test("updates prompt when input changes", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);
    const promptInput = screen.getByLabelText("Prompt");
    fireEvent.change(promptInput, { target: { value: "New prompt" } });
    expect(mockFormState.setPrompt).toHaveBeenCalledWith("New prompt");
  });

  test("updates dimensions when input changes", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);
    const widthInput = screen.getByLabelText("Width");
    const heightInput = screen.getByLabelText("Height");
    fireEvent.change(widthInput, { target: { value: "512" } }); // Pass as string
    fireEvent.change(heightInput, { target: { value: "512" } }); // Pass as string
    expect(mockFormState.setWidth).toHaveBeenCalledWith(512);
    expect(mockFormState.setHeight).toHaveBeenCalledWith(512);
  });

  test("updates number of outputs when a button is clicked", () => {
    render(<FormContainer formState={mockFormState} loading={false} />);
    const outputButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(outputButton); // Simulate clicking the button
    expect(mockFormState.setNumOutputs).toHaveBeenCalledWith(2); // Pass as a number
  });
});
