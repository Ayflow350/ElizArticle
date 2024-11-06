import Image from "next/image";
import Container from "./Container";
import light from "@/assets/light.svg";
import instagram from "@/assets/instagram.svg";
import youtube from "@/assets/youtube.svg";

const Footer = () => {
  return (
    <div className="bg-black pt-20">
      <Container>
        <div className=" flex  flex-col space-y-10 md:flex-row justify-between ">
          <div className="space-y-5 ">
            <div className="relative">
              <Image src={light} alt="logo" className=" h-40 w-40" />

              {/* <div className="border-b border-white  w-40 absolute inset-[40px] -left-1"></div> */}
            </div>

            <div className="flex flex-row gap-x-3 items-center">
              <Image
                src={instagram}
                alt="instagram"
                className="cursor-pointer"
              />
              <Image src={youtube} alt="youtube" className="cursor-pointer" />
            </div>
            <h1 className="text-white font-bold text-xl">
              contact@elizbright.com
            </h1>
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

        <div className="h-[200px]"></div>
      </Container>
    </div>
  );
};

export default Footer;
