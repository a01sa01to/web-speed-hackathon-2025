import { BetterFetchError } from '@better-fetch/fetch';
import { FORM_ERROR } from 'final-form';
import { useId } from 'react';
import { Field, Form } from 'react-final-form';
import { z } from 'zod';

import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { isValidEmail } from '@wsh-2025/client/src/features/auth/logics/isValidEmail';
import { isValidPassword } from '@wsh-2025/client/src/features/auth/logics/isValidPassword';
import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';

interface SignInFormValues {
  email: string;
  password: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const SignInDialog = ({ isOpen, onClose, onOpenSignUp }: Props) => {
  const authActions = useAuthActions();
  const emailId = useId();
  const passwordId = useId();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await authActions.signIn({
        email: values.email,
        password: values.password,
      });

      alert('ログインに成功しました');
      onClose();
      return;
    } catch (e) {
      if (e instanceof BetterFetchError && e.status === 401) {
        return { [FORM_ERROR]: 'アカウントが存在しないか入力した情報が間違っています' };
      }
      return { [FORM_ERROR]: '不明なエラーが発生しました' };
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '16px', width: '100%' }}>
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img height={36} src="https://wsh2025-a01sa01to.pages.dev/arema.svg" style={{ objectFit: 'contain' }} width={98} />
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>ログイン</h2>

        <Form
          validate={(values) => {
            const schema = z.object({
              email: z
                .string({ required_error: 'メールアドレスを入力してください' })
                .and(z.custom(isValidEmail, { message: 'メールアドレスが正しくありません' })),
              password: z
                .string({ required_error: 'パスワードを入力してください' })
                .and(z.custom(isValidPassword, { message: 'パスワードが正しくありません' })),
            });
            const result = schema.safeParse(values);
            return result.success ? undefined : result.error.formErrors.fieldErrors;
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, hasValidationErrors, submitError, submitting }) => (
            <form style={{ marginBottom: '16px' }} onSubmit={(ev) => void handleSubmit(ev)}>
              <style>{`
                input::placeholder {
                  color: #999999;
                }
              `}</style>
              <Field name="email">
                {({ input, meta }) => {
                  return (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', fontSize: '14px', fontWeight: 'bold', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label htmlFor={emailId} style={{ flexGrow: 0, flexShrink: 0 }}>
                          メールアドレス
                        </label>
                        {meta.modified && Array.isArray(meta.error) ? (
                          <span style={{ color: '#F0163A', flexGrow: 0, flexShrink: 0 }}>{meta.error[0]}</span>
                        ) : null}
                      </div>
                      <input
                        {...input}
                        required
                        id={emailId}
                        placeholder="メールアドレスを入力"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #FFFFFF1F',
                          borderRadius: '4px',
                          color: '#212121',
                          fontSize: '14px',
                          padding: '12px',
                          width: '100%',
                        }}
                        type="email"
                      />
                    </div>
                  );
                }}
              </Field>

              <Field name="password">
                {({ input, meta }) => {
                  return (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', fontSize: '14px', fontWeight: 'bold', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label htmlFor={passwordId} style={{ flexGrow: 0, flexShrink: 0 }}>
                          パスワード
                        </label>
                        {meta.modified && Array.isArray(meta.error) ? (
                          <span style={{ color: '#F0163A', flexGrow: 0, flexShrink: 0 }}>{meta.error[0]}</span>
                        ) : null}
                      </div>
                      <input
                        {...input}
                        required
                        id={passwordId}
                        placeholder="パスワードを入力"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #FFFFFF1F',
                          borderRadius: '4px',
                          color: '#212121',
                          fontSize: '14px',
                          padding: '12px',
                          width: '100%',
                        }}
                        type="password"
                      />
                    </div>
                  );
                }}
              </Field>

              {submitError ? (
                <div style={{ alignItems: 'center', backgroundColor: '#ffeeee', border: '2px solid #F0163A', borderRadius: '4px', color: '#F0163A', display: 'flex', flexDirection: 'row', fontSize: '14px', fontWeight: 'bold', justifyContent: 'flex-start', marginBottom: '8px', padding: '8px', width: "100%" }}>
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    style={{ height: '20px', margin: '4px', width: '20px' }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" fill="currentColor" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              ) : null}

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <button
                  disabled={submitting || hasValidationErrors}
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#1c43d1',
                    borderRadius: '4px',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: "row",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    opacity: submitting || hasValidationErrors ? 0.5 : 1,
                    padding: '12px',
                    width: '160px',
                  }}
                  type="submit"
                >
                  ログイン
                </button>
              </div>
            </form>
          )}
        </Form>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button
            style={{
              backgroundColor: 'transparent',
              color: '#999999',
              display: 'block',
              fontSize: '14px',
              textDecoration: 'underline',
            }}
            type="button"
            onClick={onOpenSignUp}
          >
            アカウントを新規登録する
          </button>
        </div>
      </div>
    </Dialog>
  );
};
