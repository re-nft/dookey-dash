import { Image } from "@/react/components/Image";

const footerLinks =
  "text-[#71717A] mx-1 font-semibold md:mx-4";

export const Footer = () => {
  return (
    <footer className="p-4 lg:p-8 flex flex-row flex-nowrap">
      <div className="flex-auto grow flex flex-col">
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
      </div>
      <div className="flex-auto grow-0 self-center">
        <a className={`${footerLinks} mr-0`} href="https://delegate.cash" target="_blank" rel="noreferrer">
          delegate.cash
        </a>
        <a
          className={`${footerLinks}`}
          href="https://discord.com/invite/4Ab8tknmhf"
          target="_blank" rel="noreferrer"
        >
          discord
        </a>
        <a className={`${footerLinks}`} href="https://twitter.com/renftlabs" target="_blank" rel="noreferrer">
          twitter
        </a>
      </div>
    </footer>
  );
};
