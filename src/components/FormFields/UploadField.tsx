import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";

interface UploadFieldProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}

const UploadField: React.FC<UploadFieldProps> = ({
  label,
  description,
  onChange,
  value,
}: UploadFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-left mb-1 font-medium">{label}</label>
      <label className="block text-left mb-4">{description}</label>
      {value ? (
        <div className="col-span-6 sm:col-span-4 mb-4 shadow relative">
          <Image
            src={value}
            alt="productImage"
            width="1000"
            height="1000"
            className="object-cover w-full aspect-auto"
          />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <UploadDropzone
          endpoint="productImage"
          className="border-gray-300 ut-button:bg-purple-600 hover:ut-button:bg-purple-600/70 ut-button:ut-uploading:bg-purple-600/70 after:ut-button:ut-uploading:bg-purple-600/70 ut-label:text-purple-600 hover:ut-label:text-purple-600/70 ut-button:w-full"
          onClientUploadComplete={(res) => {
            console.log("files", res);
            onChange(res[0].url);
            console.log("Upload completed");
          }}
          onUploadError={(error) => {
            console.log(`${error?.message}`);
          }}
          onUploadBegin={(name) => {
            console.log("Uploading: ", name);
          }}
        />
      )}
    </div>
  );
};

export default UploadField;
