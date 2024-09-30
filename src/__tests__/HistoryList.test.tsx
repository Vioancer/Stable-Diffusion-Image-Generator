import { render, screen, fireEvent } from "@testing-library/react";
import HistoryList from "@/components/HistoryList";

const mockDownloadImage = jest.fn().mockResolvedValue("Download successful");

describe("HistoryList Component", () => {
  const mockHistory = [
    {
      prompt: "Test prompt",
      output: [
        "https://example.com/image1.png",
        "https://example.com/image2.png",
      ],
    },
  ];

  test("renders history items when history is not empty", () => {
    render(
      <HistoryList
        loading={false}
        history={mockHistory}
        downloadImage={mockDownloadImage}
      />
    );
    expect(screen.getByText("✨ Test prompt")).toBeInTheDocument();
    expect(screen.getAllByAltText("generated image")).toHaveLength(2);
  });

  test("renders placeholder when history is empty and not loading", () => {
    render(
      <HistoryList
        loading={false}
        history={[]}
        downloadImage={mockDownloadImage}
      />
    );
    expect(
      screen.getByText(
        "✨ An astronaut riding a rainbow unicorn, cinematic, dramatic"
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("image")).toBeInTheDocument();
  });

  test("does not render placeholder when loading", () => {
    render(
      <HistoryList
        loading={true}
        history={[]}
        downloadImage={mockDownloadImage}
      />
    );
    expect(
      screen.queryByText(
        "✨ An astronaut riding a rainbow unicorn, cinematic, dramatic"
      )
    ).not.toBeInTheDocument();
  });

  test("calls downloadImage function when download button is clicked", () => {
    render(
      <HistoryList
        loading={false}
        history={mockHistory}
        downloadImage={mockDownloadImage}
      />
    );
    const downloadButtons = screen.getAllByRole("button");
    fireEvent.click(downloadButtons[0]);
    expect(mockDownloadImage).toHaveBeenCalledWith(
      "https://example.com/image1.png"
    );
  });

  test("renders correct number of images for each history item", () => {
    const multipleOutputHistory = [
      {
        prompt: "Multiple outputs",
        output: [
          "https://example.com/url1.png",
          "https://example.com/url2.png",
          "https://example.com/url3.png",
        ],
      },
    ];
    render(
      <HistoryList
        loading={false}
        history={multipleOutputHistory}
        downloadImage={mockDownloadImage}
      />
    );
    expect(screen.getAllByAltText("generated image")).toHaveLength(3);
  });

  test("handles history with no output gracefully", () => {
    const noOutputHistory = [
      {
        prompt: "No output",
        output: [],
      },
    ];
    render(
      <HistoryList
        loading={false}
        history={noOutputHistory}
        downloadImage={mockDownloadImage}
      />
    );
    expect(screen.getByText("✨ No output")).toBeInTheDocument();
    expect(screen.queryByAltText("generated image")).not.toBeInTheDocument();
  });
});
