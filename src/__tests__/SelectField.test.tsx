import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "@/components/FormFields/SelectField";
import "@testing-library/jest-dom"; // Ensure this is available

describe("SelectField Component", () => {
  const options = [1, 2, 3, 4];
  const mockSetValue = jest.fn();

  beforeEach(() => {
    render(
      <SelectField
        label="Number of Outputs"
        options={options}
        value={1}
        onChange={mockSetValue}
      />
    );
  });

  test("renders select field with options", () => {
    // Check if the label is rendered correctly
    expect(screen.getByText("Number of Outputs")).toBeInTheDocument();

    // Check if all the options (buttons) are rendered
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test("calls onChange when an option is selected", () => {
    const button = screen.getByText("2");

    // Simulate clicking on the button
    fireEvent.click(button);

    // Verify that the onChange callback was called with the correct value
    expect(mockSetValue).toHaveBeenCalledWith(2);
  });
});
