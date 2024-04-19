import { useEffect, useRef } from "react";

type FuncAction = () => void;

function useClickOutside(funcAction: FuncAction) {
  const ReferenceElement = useRef<HTMLDivElement>(null); //la referencia debe apuntar al contenedor

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        ReferenceElement.current &&
        !ReferenceElement.current.contains(event.target as Node)
      ) {
        funcAction();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return ReferenceElement;
}

export default useClickOutside;
