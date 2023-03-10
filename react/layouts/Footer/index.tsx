import c from "./footer.module.css";

const footerLinks =
  "text-dookey-green-dark text-lg p-3 text-dookey-green whitespace-nowrap md:mx-4 no-underline";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-row flex-wrap items-center justify-center gap-4 p-4 mt-20">
      <p className="flex flex-row flex-nowrap gap-4 items-center my-3">
        <a
          className={`${footerLinks} mr-0`}
          href="https://delegate.cash"
          target="_blank"
          rel="noreferrer"
        >
          delegate.cash
        </a>
        <a
          className={`${footerLinks}`}
          href="https://discord.com/invite/4Ab8tknmhf"
          target="_blank"
          rel="noreferrer"
        >
          discord
        </a>
        <a
          className={`${footerLinks}`}
          href="https://twitter.com/renftlabs"
          target="_blank"
          rel="noreferrer"
        >
          twitter
        </a>
      </p>

      <p className="w-full my-3">
        <a
          className="block max-w-[8rem] mx-auto text-dookey-green-dark no-underline"
          href="https://renft.io"
        >
          Made with 💩 by
          <svg
            className={`block mt-3 ${c.poop}`}
            viewBox="0 0 154 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.901 10.8867H45.8311V13.9115H54.901V10.8867Z"
              fill="currentColor"
            ></path>
            <path
              d="M151.427 12.2628H150.224V6.20405H147.199V3.17924H147.044V3.02482H144.019V0H134.341V3.17924H132.411V0H77.2691V6.04509H74.9982V3.17924H74.8392V3.02482H71.819V0H62.1541V9.08354H59.7379V6.04509H40.9895V9.08354H40.0311V6.04509H18.9028V3.17924H15.7236V0H6.04509V3.02482H3.02482V9.08354H0V15.7236H3.02482V21.7732H6.04509V24.7935H6.20405V24.9525H9.22433V27.9727H18.9028V24.7935H21.4371V27.9727H31.1157V18.8892H34.1405V15.8962H37.9692V21.8005H40.9895V24.8208H41.1484V24.9797H44.1687V28H62.9171V24.8208H65.3333V28H75.0118V18.9165H77.2827V24.8208H80.462V28H99.6918V18.9165H111.782V12.2628H108.603V9.83747H116.701V24.7935H119.88V27.9727H129.558V9.83747H135.604V6.65823H137.379V18.1398H134.355V24.7935H137.534V27.9727H147.199V24.9525H150.224V18.9028H153.244V12.2628H151.427ZM13.9069 4.84152H10.9002V10.9002H7.8618V13.9205H10.9002V19.9565H13.9205V22.9768H7.8618V19.9565H4.84152V13.9069H1.81671V10.9002H4.84152V4.84152H7.8618V1.81671H13.9069V4.84152ZM18.2579 21.3191H15.8962V9.83747H18.2579V21.3191ZM38.2144 10.9002H29.1309V13.9205H26.1197V23.0041H20.0746V7.8618H26.1197V10.9002H29.1445V7.8618H38.2281L38.2144 10.9002ZM60.946 16.9453H45.831V19.9702H57.9212V22.9904H42.8062V19.9565H39.7859V10.9002H42.8062V7.8618H57.9212V10.9002H60.946V16.9453ZM85.1309 22.9904H79.0858V16.9317H76.061V13.9069H73.0362V10.9002H70.0159V22.9768H63.9708V1.81671H70.0159V4.84152H73.0362V7.8618H76.061V10.9002H79.0858V1.81671H85.1309V22.9904ZM109.797 4.85515H94.6822V10.9002H106.772V13.9205H94.6822V23.0041H88.6371V1.81671H109.797V4.85515ZM130.594 4.85515H124.549V22.9768H118.504V4.84152H112.459V1.81671H130.594V4.85515ZM148.248 13.9387H145.228V19.9565H142.203V22.9768H136.158V19.9565H139.182V13.9069H142.203V10.9002H139.182V4.84152H136.158V1.81671H142.203V4.84152H145.228V10.9002H148.248V13.9387Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </p>
    </footer>
  );
};
