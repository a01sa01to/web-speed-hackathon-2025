import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';

import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignOutDialog = ({ isOpen, onClose }: Props) => {
  const authActions = useAuthActions();

  const onSubmit = async () => {
    try {
      await authActions.signOut();

      alert('ログアウトしました');
      onClose();
      return;
    } catch {
      return { [FORM_ERROR]: '不明なエラーが発生しました' };
    }
  };

  return (
    <>
      <link href="https://wsh2025-a01sa01to.pages.dev/styles/feat/auth/signout.css" rel="stylesheet" />

      <Dialog isOpen={isOpen} onClose={onClose}>
        <div className="b-div1">
          <div className="b-div2">
            {/* biome-ignore lint/a11y/useAltText: <explanation> */}
            <img className="b-img" height={36} src="https://wsh2025-a01sa01to.pages.dev/arema.svg" width={98} />
          </div>

          <h2 className="b-h2">ログアウト</h2>

          <Form onSubmit={onSubmit}>
            {({ handleSubmit, submitError }) => (
              <form className="b-form" onSubmit={(ev) => void handleSubmit(ev)}>
                <div className="b-form-div">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg className="b-form-svg" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zm1.725-2h15.1L12 6zM12 18q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15m0-2.5" fill="currentColor" />
                  </svg>
                  <span>プレミアムエピソードが視聴できなくなります。</span>
                </div>

                {submitError ? (
                  <div className="b-suberr-div">
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg className="b-suberr-svg" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" fill="currentColor" />
                    </svg>
                    <span>{submitError}</span>
                  </div>
                ) : null}

                <div className="b-div3">
                  <button className='b-divbtn' type="submit">
                    ログアウト
                  </button>
                </div>
              </form>
            )}
          </Form>
        </div>
      </Dialog>
    </>
  );
};
