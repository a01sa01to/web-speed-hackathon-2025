import { type ReactNode, useEffect, useState } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { Link, useLocation, useNavigation } from 'react-router';

import { SignInDialog } from '@wsh-2025/client/src/features/auth/components/SignInDialog';
import { SignOutDialog } from '@wsh-2025/client/src/features/auth/components/SignOutDialog';
import { SignUpDialog } from '@wsh-2025/client/src/features/auth/components/SignUpDialog';
import { AuthDialogType } from '@wsh-2025/client/src/features/auth/constants/auth_dialog_type';
import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { useAuthDialogType } from '@wsh-2025/client/src/features/auth/hooks/useAuthDialogType';
import { useAuthUser } from '@wsh-2025/client/src/features/auth/hooks/useAuthUser';
import { Loading } from '@wsh-2025/client/src/features/layout/components/Loading';
import { useSubscribePointer } from '@wsh-2025/client/src/features/layout/hooks/useSubscribePointer';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  useSubscribePointer();

  const navigation = useNavigation();
  const isLoading =
    navigation.location != null && (navigation.location.state as { loading?: string } | null)?.['loading'] !== 'none';

  const location = useLocation();
  const isTimetablePage = location.pathname === '/timetable';

  const authActions = useAuthActions();
  const authDialogType = useAuthDialogType();
  const user = useAuthUser();

  const [scrollTopOffset, setScrollTopOffset] = useState(0);
  const [shouldHeaderBeTransparent, setShouldHeaderBeTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTopOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setShouldHeaderBeTransparent(scrollTopOffset > 80);
  }, [scrollTopOffset]);

  const isSignedIn = user != null;

  return (
    <>
      <div
        style={{
          display: 'grid',
          flexDirection: 'column',
          gridTemplateAreas: "'a1 b1' 'a2 b2' 'a3 b3'",
          gridTemplateColumns: '188px minmax(0,1fr)',
          gridTemplateRows: '80px calc(100vh - 80px) minmax(0,1fr)',
          height: 'auto',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <header
          style={{
            background: !isLoading && shouldHeaderBeTransparent
              ? 'linear-gradient(to bottom, #171717, transparent)'
              : 'linear-gradient(to bottom, #171717, #171717)',
            display: 'flex',
            flexDirection: 'row',
            gridArea: 'a1 / a1 / b1 / b1',
            height: '80px',
            order: 1,
            position: 'sticky',
            top: '0px',
            width: '100%',
            zIndex: 10,
          }}
        >
          <Link
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: '8px',
              paddingRight: '8px',
              width: '188px',
            }}
            to="/"
          >
            <img
              alt="AREMA"
              height={36}
              src="https://wsh2025-a01sa01to.pages.dev/arema.svg"
              style={{ objectFit: 'contain' }}
              width={98}
            />
          </Link>
        </header>

        <aside
          style={{
            alignItems: 'center',
            backgroundColor: '#171717',
            display: 'flex',
            flexDirection: 'column',
            gridArea: 'a1 / a1 / a2 / a2',
            height: '100vh',
            paddingTop: '80px',
            position: 'sticky',
            top: '0px',
          }}
        >
          <nav>
            <button
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                display: 'flex',
                height: '56px',
                justifyContent: 'center',
                padding: '8px 8px 8px 20px',
                width: '188px',
              }}
              type="button"
              onClick={isSignedIn ? authActions.openSignOutDialog : authActions.openSignInDialog}
            >
              <div
                className={`i-fa-solid:${isSignedIn ? 'sign-out-alt' : 'user'}`}
                style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }}
              />
              <span
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginLeft: '16px',
                  textAlign: 'left',
                }}
              >
                {isSignedIn ? 'ログアウト' : 'ログイン'}
              </span>
            </button>

            <Link
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '56px',
                justifyContent: 'center',
                padding: '8px 8px 8px 20px',
                width: '188px',
              }}
              to="/"
            >
              <div
                className="i-bi:house-fill"
                style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }}
              />
              <span
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginLeft: '16px',
                  textAlign: 'left',
                }}
              >
                ホーム
              </span>
            </Link>

            <Link
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '56px',
                justifyContent: 'center',
                padding: '8px 8px 8px 20px',
                width: '188px',
              }}
              to="/timetable"
            >
              <div
                className="i-fa-solid:calendar"
                style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }}
              />
              <span
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginLeft: '16px',
                  textAlign: 'left',
                }}
              >
                番組表
              </span>
            </Link>
          </nav>
        </aside>

        <main
          style={{
            gridArea: isTimetablePage ? 'b2' : 'b2 / b2 / b3 / b3',
          }}
        >
          <Flipper className="size-full" flipKey={location.key} spring="noWobble">
            {children}
          </Flipper>
        </main>

        {isLoading ? (
          <div
            style={{
              gridArea: 'b2',
              position: 'sticky',
              top: '80px',
              zIndex: 50,
            }}
          >
            <Loading />
          </div>
        ) : null}
      </div>

      <SignInDialog
        isOpen={authDialogType === AuthDialogType.SignIn}
        onClose={authActions.closeDialog}
        onOpenSignUp={authActions.openSignUpDialog}
      />
      <SignUpDialog
        isOpen={authDialogType === AuthDialogType.SignUp}
        onClose={authActions.closeDialog}
        onOpenSignIn={authActions.openSignInDialog}
      />
      <SignOutDialog isOpen={authDialogType === AuthDialogType.SignOut} onClose={authActions.closeDialog} />
    </>
  );
};
