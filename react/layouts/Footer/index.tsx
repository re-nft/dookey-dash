import { Image } from "@/react/components/Image";

const footerLinks =
  "font-extralight text-[12px] text-[#71717A] mx-1 md:text-base md:mx-4";

export const Footer = () => {
  return (
    <footer className="p-4 lg:p-8 flex flex-row flex-nowrap">
      <div className="flex-auto grow flex flex-col">
        {false && (
          <>
            <span className="text-[#000000] text-[12px] md:text-base">
              Powered By
            </span>
            <a href="https://renft.io">
              <Image
                className="inline-block w-32 text-[#000000] md:w-60"
                width="100"
                height="100"
                src="/renft-logo-black-and-white.svg"
                fallbackSrc="/renft-logo-black-and-white.svg"
                alt="reNFT"
              />
            </a>
          </>
        )}
      </div>
      <div className="flex-auto grow-0 self-center">
        <a className={`${footerLinks} mr-0`} href="https://delegate.cash">
          delegate.cash
        </a>
        <a
          className={`${footerLinks}`}
          href="https://discord.com/invite/4Ab8tknmhf"
        >
          discord
        </a>
        <a className={`${footerLinks}`} href="https://twitter.com/renftlabs">
          twitter
        </a>
      </div>
    </footer>
  );
};
