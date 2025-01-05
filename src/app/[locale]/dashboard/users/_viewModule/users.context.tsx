import { createContext, useContext } from 'react';
import { IUsersVM, useUsersVM } from './users.vm';

export const UsersContext = createContext({} as IUsersVM);
export const useUsersContext = () => useContext(UsersContext);
export const UsersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const vmValues = useUsersVM();
  return (
    <UsersContext.Provider value={vmValues}>{children}</UsersContext.Provider>
  );
};
