import { Dialog as HDialog, DialogPanel } from '@headlessui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog = ({ children, isOpen, onClose }: Props) => {
  return (
    <HDialog
      open={isOpen}
      style={{
        alignItems: 'center',
        backgroundColor: '#00000077',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 50,
      }}
      onClose={onClose}
    >
      <DialogPanel
        style={{
          backgroundColor: '#171717',
          border: '2px solid #FFFFFF1F',
          borderRadius: '8px',
          flexGrow: 0,
          flexShrink: 0,
          padding: '32px 16px',
          width: '480px',
        }}
      >
        {children}
      </DialogPanel>
    </HDialog>
  );
};
