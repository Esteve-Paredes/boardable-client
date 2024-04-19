import { useContext } from "react";
import { Page } from "../App/App";

function useUpdatePage() {
  //hook que recarga la pagina
  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  return pageContext;
}

export default useUpdatePage;
