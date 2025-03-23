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
              {
                isSignedIn ?
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg height="1em" style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }} viewBox="0 0 512 512" width="1em"
                    xmlns="http://www.w3.org/2000/svg" ><path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34M192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12" fill="currentColor" />
                  </svg>
                  :
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg height="1em" style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }} viewBox="0 0 448 512" width="0.88em"
                    xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4" fill="currentColor" />
                  </svg>
              }
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
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg height='1em' style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }} viewBox='0 0 16 16' width='1em' xmlns='http://www.w3.org/2000/svg' ><g fill='currentColor'><path d='M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z' /><path d='m8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z' /></g></svg>
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
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg height="1em" style={{ flexGrow: 0, flexShrink: 0, fontSize: '20px', margin: '4px' }} viewBox="0 0 448 512" width="0.88em"
                xmlns="http://www.w3.org/2000/svg"><path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12m436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12" fill="currentColor" />
              </svg>
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
          <Flipper flipKey={location.key} spring="noWobble" style={{ width: "100%", height: "100%" }}>
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
