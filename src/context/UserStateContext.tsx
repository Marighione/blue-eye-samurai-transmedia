'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserState } from '@/types/user';
import { DEFAULT_USER_STATE } from '@/types/user';
import { getUserState } from '@/lib/user-state';

interface UserStateContextValue {
  state: UserState;
  refreshState: () => void;
}

const UserStateContext = createContext<UserStateContextValue>({
  state: DEFAULT_USER_STATE,
  refreshState: () => {},
});

export function UserStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(DEFAULT_USER_STATE);

  useEffect(() => {
    setState(getUserState());
  }, []);

  const refreshState = () => {
    setState(getUserState());
  };

  return (
    <UserStateContext.Provider value={{ state, refreshState }}>
      {children}
    </UserStateContext.Provider>
  );
}

export const useUserState = () => useContext(UserStateContext);
