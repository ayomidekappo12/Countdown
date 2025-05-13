import { useContext, createContext, ReactNode } from "react";
//import { useAuth } from "./AuthProvider";

const ErrorHandlerContext = createContext((error: any) => {
  //log
  console.log(error.message);
});

interface ErrorHandlerProviderProps {
  children?: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorHandlerProviderProps) => {
  //const auth = useAuth();

  const handleError = (error: any) => {
    //log
    console.log(error.message);

    if (error.code == 401) {
      //auth.logout();
    }
  };

  return (
    <ErrorHandlerContext.Provider value={handleError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export const useErrorHandler = () => {
  return useContext(ErrorHandlerContext);
};
