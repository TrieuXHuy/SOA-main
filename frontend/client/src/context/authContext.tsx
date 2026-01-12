import { createContext, useState } from 'react';
import { ExtendedCartItem } from 'src/types/cart.type';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getUserFromLs } from 'src/utils/getTokenfromLS';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchases: ExtendedCartItem[];
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedCartItem[]>>;
  reset: () => void;
};

const initialValue = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getUserFromLs(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({
  children,
  defaultValue = initialValue
}: {
  children: React.ReactNode;
  defaultValue?: AuthContextType;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(initialValue.profile);
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedCartItem[]>(defaultValue.extendedPurchases);

  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchases([]);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
