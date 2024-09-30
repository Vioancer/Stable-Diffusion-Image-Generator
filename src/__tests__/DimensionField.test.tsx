import { render, screen, fireEvent } from "@testing-library/react";
import DimensionField from "@/components/FormFields/DimensionField";

describe("DimensionField Component", () => {
  const mockSetWidth = jest.fn();
  const mockSetHeight = jest.fn();

  beforeEach(() => {
    render(
      <DimensionField
        width={768}
        height={768}
        setWidth={mockSetWidth}
        setHeight={mockSetHeight}
      />
    );
  });

  test("renders width and height inputs", () => {
    expect(screen.getByLabelText("Width")).toBeInTheDocument();
    expect(screen.getByLabelText("Height")).toBeInTheDocument();
  });

  test("calls setWidth when width input changes", () => {
    const widthInput = screen.getByLabelText("Width");
    fireEvent.change(widthInput, { target: { value: "800" } });
    expect(mockSetWidth).toHaveBeenCalledWith(800);
  });

  test("calls setHeight when height input changes", () => {
    const heightInput = screen.getByLabelText("Height");
    fireEvent.change(heightInput, { target: { value: "800" } });
    expect(mockSetHeight).toHaveBeenCalledWith(800);
  });
});
