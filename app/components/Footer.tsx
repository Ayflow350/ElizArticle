import Image from "next/image";
import Container from "./Container";
import light from "@/assets/light.svg";
import instagram from "@/assets/instagram.svg";
import youtube from "@/assets/youtube.svg";

const Footer = () => {
  return (
    <div className=" pt-20">
      <div className=" flex  bg-black pt-20 flex-col    rounded-lg p-10">
        <div className="flex   flex-col  md:flex-row justify-between mb-5">
          <div className="space-y-5  ">
            <div className="relative">
              <Image src={light} alt="logo" className=" h-40 w-40" />
            </div>

            <div className="flex flex-row gap-x-3 items-center">
              <Image
                src={instagram}
                alt="instagram"
                className="cursor-pointer"
              />
              <Image src={youtube} alt="youtube" className="cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className=" text-white">
              <h1 className="font-bold text-lg mb-2">Pages</h1>
              <nav>
                <ul className="flex  flex-col space-y-4">
                  <li className="text-base cursor-pointer">Home</li>
                  <li className="text-base cursor-pointer">Interviews</li>
                  <li className="text-base cursor-pointer">Articles</li>
                  <li className="text-base cursor-pointer">Books</li>
                </ul>
              </nav>
            </div>
            <div className=" text-white">
              <h1 className="font-bold text-lg mb-2">Books</h1>
              <nav>
                <ul className="flex  flex-col space-y-4">
                  <li className="text-base cursor-pointer">
                    Good Fat For Boys
                  </li>
                  <li className="text-base cursor-pointer">
                    Good Fat For Boys
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-b   border-gray-400  w-full mb-3"></div>
        <div className="flex justify-between">
          <h1 className="text-white font-normal text-base">
            @ copyrights 2024
          </h1>
          <h1 className="text-white font-normal text-base">
            contact@elizbright.com
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
