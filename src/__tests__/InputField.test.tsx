import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/components/FormFields/InputField";

describe("InputField Component", () => {
  test("renders input field with label", () => {
    render(
      <InputField
        label="Prompt"
        value=""
        onChange={jest.fn()}
        placeholder="Enter prompt"
      />
    );
    expect(screen.getByLabelText("Prompt")).toBeInTheDocument();
  });

  test("calls onChange handler when value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Prompt"
        value=""
        onChange={handleChange}
        placeholder="Enter prompt"
      />
    );

    const input = screen.getByLabelText("Prompt");
    fireEvent.change(input, { target: { value: "New Prompt" } });
    expect(handleChange).toHaveBeenCalledWith("New Prompt");
  });
});
