import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import { useVlayer } from "@/hooks/use-vlayer";


export const VlayerButton = ({ className }: { className?: string }) => {
    
  const { address } = useAccount();
  const [disabled, setDisabled] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    requestWebProof,
    webProof,
    callProver,
    isPending,
    isCallProverIdle,
    result,
    error,
  } = useVlayer();

  useEffect(() => {
    if (webProof && isCallProverIdle) {
      void callProver([webProof, address]);
    }
  }, [webProof, address, callProver, isCallProverIdle]);

  useEffect(() => {
    console.log("Proving result:", result);
  }, [result]);

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

    return (
       <div className={`flex justify-center flex-col items-center${className ? ` ${className}` : ""}`}>
        <button
          disabled={disabled}
          id="nextButton"
          onClick={() => {
            requestWebProof();
            setDisabled(true);
          }}
        >
          {isPending ? "Proving in progress..." : "Update CEX balance"}
        </button>
      </div>
    );
};
