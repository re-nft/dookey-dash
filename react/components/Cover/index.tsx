import { Image } from "@/react/components/Image";

interface CoverProps {
  image: string;
  title: string;
  intro: string;
  fallBackImage: string;
  children?: React.ReactNode;
}

export const Cover = ({
  title,
  intro,
  image,
  fallBackImage,
  children,
}: CoverProps) => (
  <section className="relative overflow-hidden h-96 m-0 md:h-80">
    <div className="relative h-screen w-full">
      <div className="h-screen w-full left-0 top-0">
        <Image
          className="blur-sm w-full h-full object-cover"
          src={image}
          alt="Cover Photo"
          fallbackSrc={fallBackImage}
          sizes="100vw"
          fill
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-40 z-[2] bg-white/80"></div>
        <div
          className="absolute top-0 left-0 w-full h-full z-[2]"
          id="grained_container"
        ></div>
      </div>
    </div>
    <div className="absolute top-0 left-0 z-[2] align-center flex flex-col w-full h-full align-middle text-justify">
      <div className="w-full flex-auto grow-0">
        <h1 className="text-center text-white text-5xl font-semibold mt-20 mb-10 capitalize align-middle">
          {title}
        </h1>
      </div>
      <div className="relative flex-auto grow-0 text-center text-white align-middle text-base">
        {intro}
      </div>
      <div className="flex-auto grow-0 flex flex-row flex-wrap justify-center">
        {children}
      </div>
    </div>
  </section>
);
