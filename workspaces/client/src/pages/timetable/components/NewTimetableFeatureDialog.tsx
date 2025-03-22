import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';
import { useCloseNewFeatureDialog } from '@wsh-2025/client/src/pages/timetable/hooks/useCloseNewFeatureDialog';

interface Props {
  isOpen: boolean;
}

export const NewTimetableFeatureDialog = ({ isOpen }: Props) => {
  const onClose = useCloseNewFeatureDialog();

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '16px', width: '100%' }}>
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img height={36} src="https://wsh2025-a01sa01to.pages.dev/arema.svg" style={{ objectFit: 'contain' }} width={98} />
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>拡大・縮小機能を新しく追加</h2>

        <p style={{ color: '#999999', fontSize: '14px', marginBottom: '4px' }}>
          いつもAREMAをご利用いただきありがとうございます。この度、番組表の機能をさらに使いやすくするための新しい機能を追加しました。
        </p>
        <p style={{ color: '#999999', fontSize: '14px', marginBottom: '4px' }}>
          番組表にあるそれぞれの番組タイトルをクリック &
          ドラッグすることで、簡単に拡大・縮小が可能になりました。この機能を利用すると、表示幅が狭くて途切れていたタイトルや詳細情報も全て確認することができるようになります！
        </p>
        <p style={{ color: '#999999', fontSize: '14px', marginBottom: '24px' }}>
          引き続き皆様に快適にご利用いただけるよう、サービスの改善に努めてまいります。今後ともどうぞよろしくお願いいたします。
        </p>

        <img alt="" height={249} src="/public/assets/feature-explain.avif" style={{ marginBottom: '24px', width: '100%' }} width={444} />

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button
            style={{
              alignItems: 'center',
              backgroundColor: '#1c43d1',
              borderRadius: '4px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'row',
              fontSize: '14px',
              fontWeight: 'bold',
              justifyContent: 'center',
              padding: '12px',
              width: '160px',
            }}
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
