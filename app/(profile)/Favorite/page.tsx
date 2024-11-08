import Container from "@/app/components/Container";
import Banner from "@/assets/userbanner.svg";
import Image from "next/image";
import human from "@/assets/human.svg";

const Favorite = () => {
  return (
    <Container>
      <div className="justify-center flex mt-10 relative">
        <Image src={Banner} alt="" />
      </div>
      <div className="justify-center flex mt-10 relative">
        <Image src={human} alt="" className="justify-center flex -mt-40 " />
      </div>
    </Container>
  );
};

export default Favorite;
