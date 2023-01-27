import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useAccount } from "wagmi";

import { useRegister } from "@/react/api";

const Register: NextPage = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <h1 className="text-4xl my-4 lg:my-6 text-center">
        Register as a player 😎
      </h1>
      <Form />
    </div>
  );
};

const Form = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register } = useRegister();

  const onPressRegister = React.useCallback(async () => {
    try {
      await register({});
      await router.push("/");
    } catch (e) {
      console.error(e);
    }
  }, [register, router]);

  console.log(isConnected);

  if (!isConnected) {
    return (
      <div className="flex flex-wrap flex-col content-center text-center">
        <p className="mb-2">Connect a wallet first!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <p className="flex justify-center">
        <button
          className="bg-black px-4 py-2 rounded text-white"
          onClick={onPressRegister}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Register;
