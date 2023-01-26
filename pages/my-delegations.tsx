import * as React from 'react';
import {DelegationScroll} from "@/react/delegator";
import {CONTRACT_ADDRESS_SEWER_PASS} from "@/utils/consts";
import {useAccount} from "wagmi";

export default function MyDelegations(): JSX.Element {
  return (
    <div className="w-full flex flex-col h-full">
      <DelegationScroll
        vault="0xbbc92cc8c8b73daaedfec30c01dad525f52b7c29"
        contractAddress={CONTRACT_ADDRESS_SEWER_PASS}
        renderDelegatedTo={(address: string) => (<span>hello {address}</span>)}
      />
    </div>
  );
}
