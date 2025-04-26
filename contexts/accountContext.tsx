import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@hooks/useStorageState";
import { Account } from "@customTypes/account";

const AccountContext = createContext<{
  login: () => void;
  logout: () => void;
  account?: Account | null;
  isLoading: boolean;
}>({
  login: () => null,
  logout: () => null,
  account: null,
  isLoading: false,
});

export const useAccount = () => {
  const value = useContext(AccountContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useAccount must be wrapped in <AccountContextProvider />"
      );
    }
  }

  return value;
};

export const AccountContextProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, account], setAccount] =
    useStorageState<Account>("account");

  return (
    <AccountContext.Provider
      value={{
        login: () => {
          // login logic
        },
        logout: () => {
          // logout logic
          setAccount(null);
        },
        account,
        isLoading,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
