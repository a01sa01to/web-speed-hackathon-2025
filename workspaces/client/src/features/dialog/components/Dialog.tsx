import { Dialog as HDialog, DialogPanel } from '@headlessui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog = ({ children, isOpen, onClose }: Props) => {
  return (
    <>
      <link href="/public/styles/feat/dialog.css" rel="stylesheet" />

      <HDialog
        className="d-dialog"
        open={isOpen}
        onClose={onClose}
      >
        <DialogPanel className="d-dp">
          {children}
        </DialogPanel>
      </HDialog>
    </>
  );
};
