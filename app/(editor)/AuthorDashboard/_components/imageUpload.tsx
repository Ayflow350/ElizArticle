"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { SkewLoader } from "react-spinners";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback(
    (result: any) => {
      setLoading(false);
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={() => setLoading(true)} // Set loading to true when upload starts
      onSuccess={handleUpload} // Set loading to false when upload finishes
      uploadPreset="Airbnb-clone"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 rounded-md transition border-dashed border-2 p-20 border-black flex flex-col items-center justify-center gap-4 text-black bg-white"
          >
            {loading ? (
              <SkewLoader color="#000" size={30} />
            ) : (
              <>
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
                {value && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      alt="upload"
                      fill
                      style={{ objectFit: "cover" }}
                      src={value}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
