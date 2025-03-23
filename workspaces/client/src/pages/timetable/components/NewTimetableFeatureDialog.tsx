import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';
import { useCloseNewFeatureDialog } from '@wsh-2025/client/src/pages/timetable/hooks/useCloseNewFeatureDialog';

interface Props {
  isOpen: boolean;
}

export const NewTimetableFeatureDialog = ({ isOpen }: Props) => {
  const onClose = useCloseNewFeatureDialog();

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="s-dialog-root">
        <div className="s-div2">
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img className="s-title-img" height={36} src="https://wsh2025-a01sa01to.pages.dev/arema.svg" width={98} />
        </div>

        <h2 className="s-dialog-h2">拡大・縮小機能を新しく追加</h2>

        <p className="s-dialog-desc">
          いつもAREMAをご利用いただきありがとうございます。この度、番組表の機能をさらに使いやすくするための新しい機能を追加しました。
        </p>
        <p className="s-dialog-desc">
          番組表にあるそれぞれの番組タイトルをクリック &
          ドラッグすることで、簡単に拡大・縮小が可能になりました。この機能を利用すると、表示幅が狭くて途切れていたタイトルや詳細情報も全て確認することができるようになります！
        </p>
        <p className='s-dialog-desc-last'>
          引き続き皆様に快適にご利用いただけるよう、サービスの改善に努めてまいります。今後ともどうぞよろしくお願いいたします。
        </p>

        <img alt="" className="s-dialog-img" height={249} src="/public/assets/feature-explain.avif" width={444} />

        <div className="s-dialog-btnc">
          <button
            className="s-dialog-btn"
            type="button"
            onClick={onClose}
          >
            試してみる
          </button>
        </div>
      </div>
    </Dialog>
  );
};
