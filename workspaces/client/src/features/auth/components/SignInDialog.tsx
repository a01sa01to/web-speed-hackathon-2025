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
    <>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <div className="a-adiv">
          <div className='a-bdiv'>
            {/* biome-ignore lint/a11y/useAltText: <explanation> */}
            <img className="a-img" height={36} src="https://wsh2025-a01sa01to.pages.dev/arema.svg" width={98} />
          </div>

          <h2 className='a-h2'>ログイン</h2>

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
              <form className="a-form" onSubmit={(ev) => void handleSubmit(ev)}>
                <Field name="email">
                  {({ input, meta }) => {
                    return (
                      <div className="a-form-div">
                        <div className="a-form-div2">
                          <label className="a-form-divlabel" htmlFor={emailId} >
                            メールアドレス
                          </label>
                          {meta.modified && Array.isArray(meta.error) ? (
                            <span className="a-form-divspan">{meta.error[0]}</span>
                          ) : null}
                        </div>
                        <input
                          {...input}
                          required
                          className="a-input"
                          id={emailId}
                          placeholder="メールアドレスを入力"
                          type="email"
                        />
                      </div>
                    );
                  }}
                </Field>

                <Field name="password">
                  {({ input, meta }) => {
                    return (
                      <div className="a-form-div">
                        <div className="a-form-div2">
                          <label className="a-form-divlabel" htmlFor={passwordId} >
                            パスワード
                          </label>
                          {meta.modified && Array.isArray(meta.error) ? (
                            <span className="a-form-divspan">{meta.error[0]}</span>
                          ) : null}
                        </div>
                        <input
                          {...input}
                          required
                          className="a-input"
                          id={passwordId}
                          placeholder="パスワードを入力"
                          type="password"
                        />
                      </div>
                    );
                  }}
                </Field>

                {submitError ? (
                  <div className="a-suberrdiv">
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                      className="a-suberrSvg"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" fill="currentColor" />
                    </svg>
                    <span>{submitError}</span>
                  </div>
                ) : null}

                <div className="a-subdiv">
                  <button
                    className="a-subbtn"
                    disabled={submitting || hasValidationErrors}
                    type="submit"
                  >
                    ログイン
                  </button>
                </div>
              </form>
            )}
          </Form>

          <div className="a-regdiv">
            <button
              className="a-regbtn"
              type="button"
              onClick={onOpenSignUp}
            >
              アカウントを新規登録する
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
