import Image from "next/image";
import { Download } from "lucide-react";

interface HistoryListProps {
  loading: boolean;
  history: any[];
  downloadImage: (url: string) => Promise<unknown>;
}

const HistoryList: React.FC<HistoryListProps> = ({
  loading,
  history,
  downloadImage,
}) => {
  return (
    <>
      {history.length
        ? history.map((frame, index) => (
            <div
              key={index}
              className="p-8 bg-white shadow-lg rounded-lg border w-full"
            >
              <label className="block text-left mb-2 bg-slate-200 rounded-md px-3.5 py-1.5">
                ✨ {frame.prompt}
              </label>
              <div className="my-4 flex flex-wrap gap-4">
                {Array.isArray(frame?.output) &&
                  frame.output.map((url: string, index: number) => (
                    <div className="relative rounded-md grow overflow-hidden group">
                      <Image
                        className="w-full"
                        key={index}
                        src={url}
                        width={300}
                        height={300}
                        alt="generated image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      <button
                        className="absolute bottom-2 right-2 bg-purple-600 text-white rounded-md px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => {
                          downloadImage(url)
                            .then((message) => {
                              console.log(message);
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                        }}
                      >
                        <Download />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))
        : !loading && (
            <div className="p-8 bg-white shadow-lg rounded-lg border w-full">
              <label className="block text-left mb-2 bg-slate-200 rounded-md px-3.5 py-1.5">
                ✨ An astronaut riding a rainbow unicorn, cinematic, dramatic
              </label>
              <div className="my-4 flex flex-wrap gap-4">
                <div className="relative rounded-md grow overflow-hidden group">
                  <Image
                    className="w-full"
                    src="https://pbxt.replicate.delivery/YXbcLudoHBIYHV6L0HbcTx5iRzLFMwygLr3vhGpZI35caXbE/out-0.png"
                    width={300}
                    height={300}
                    alt="image"
                  />
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default HistoryList;
