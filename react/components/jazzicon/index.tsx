// @ts-expect-error Missing a declaration for this component.
import jazzicon from "@metamask/jazzicon";
import { ethers } from "ethers";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import React from "react";

type JazziconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  address: string;
  diameter?: number;
};

const defaultIconClasses = "relative h-[40px] w-[40px]";

const Jazzicon: React.FC<JazziconProps> = ({
  address,
  diameter = 24,
  className,
  ...rest
}: JazziconProps) => {
  // HACK: Avoid ssr errors. (Jazzicon attempts to consume window.)
  if (!global.window) return null;

  return (
    <figure
      {...rest}
      className={
        className ? `${defaultIconClasses} ${className}` : defaultIconClasses
      }
      dangerouslySetInnerHTML={{
        __html: jazzicon(
          diameter,
          parseInt((address || ethers.constants.AddressZero).substring(2))
        ).outerHTML,
      }}
    />
  );
};

export default React.memo(Jazzicon);
