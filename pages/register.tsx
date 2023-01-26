import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import React from "react";
import { useAccount } from "wagmi";

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
  const signature = "needs to come from...?";

  console.log(isConnected);

  if (!isConnected) {
    return (
      <div className="flex flex-wrap flex-col content-center text-center">
        <p className="mb-2">Connect a wallet first!</p>
        <ConnectButton />
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
