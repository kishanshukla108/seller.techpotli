'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';


export interface GuestGuardProps {
  children: React.ReactNode;
}

 
export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();

  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }
//console.log(user_sta);
    if (user?.ac_sta === 'done' || user?.admin_re === 'ok') {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      router.replace(paths.dashboard.overview);
      return;
    }
    if( user?.ac_sta === 'reg' || user?.admin_re  === '') {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      router.replace(paths.dashboard.account);
      return;
    }

    setIsChecking(false);
  };

   

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
