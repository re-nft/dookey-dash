import type { NextPage } from "next";
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
  const { address, isConnected } = useAccount();

  // It's generated in the call to register({}); just pass it the object of the config we want,
  // then the signature will be computed prior to the API request.
  const signature = "needs to come from...?";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register } = useRegister();

  console.log(isConnected);

  if (!isConnected) {
    return (
      <div className="flex flex-wrap flex-col content-center text-center">
        <p className="mb-2">Connect a wallet first!</p>
      </div>
    );
  }

  return (
    <form
      action="/api/player/register"
      className="max-w-md mx-auto"
      method="POST"
    >
      <input type="hidden" name="address" value={address} />
      <input type="hidden" name="signature" value={signature} />

      <p className="mb-4">
        <label className="block mb-2" htmlFor="message">
          Your message
        </label>
        <textarea
          className="block border px-4 py-2 rounded w-full"
          id="message"
          name="message"
          placeholder="I would like to play Dookey Dash because..."
        ></textarea>
      </p>

      <p className="flex justify-center">
        <button className="bg-black px-4 py-2 rounded text-white" type="submit">
          Register
        </button>
      </p>
    </form>
  );
};

export default Register;
