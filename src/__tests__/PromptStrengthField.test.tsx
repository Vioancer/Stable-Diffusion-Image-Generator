import { render, screen, fireEvent } from "@testing-library/react";
import PromptStrengthField from "@/components/FormFields/PromptStrengthField";

describe("PromptStrengthField Component", () => {
  const mockSetValue = jest.fn();

  beforeEach(() => {
    render(<PromptStrengthField value={0.8} onChange={mockSetValue} />);
  });

  test("renders slider input", () => {
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue("0.8");
  });

  test("calls onChange when slider value changes", () => {
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "0.5" } });
    expect(mockSetValue).toHaveBeenCalledWith(0.5);
  });
});
