import alertCss from "./alert.module.css";

interface AlertProps {
  readonly children?: React.ReactNode;
}

const twClass = [
  "flex",
  "flex-col",
  "wrap",
  "align-center",
  "rounded-md",
  "mx-10",
  "my-8",
  "px-6",
  "py-4",
  "text-lg",
  "bg-dookey-green",
  "text-xl",
  "text-renft-purple",
  "overflow-y-auto",
  alertCss.shadow,
].join(" ");

export const Alert = ({ children }: AlertProps) => {
  return <div className={`${twClass}`}>{children}</div>;
};

interface AlertInfoProps {
  text?: string;
  children?: React.ReactNode;
}

export const AlertInfo = ({ text, children }: AlertInfoProps) => {
  return (
    <Alert>
      {text && (
        <div className="flex flex-row grow order-1">
          <div className="pl-6 font-semibold grow order-2 flex-wrap inline-flex justify-center">
            {text}
          </div>
        </div>
      )}
      {children && (
        <div className="flex grow-0 order-2 justify-center mt-5 md:mt-0">
          {children}
        </div>
      )}
    </Alert>
  );
};
