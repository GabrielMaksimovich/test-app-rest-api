import React, { memo } from 'react';

type closeModal = {
  onClose: (value: boolean) => void;
};

export const Modal: React.FC<closeModal> = memo(({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2>User successfully registered!</h2>
        <button type="button" className="modal__close" onClick={() => onClose(false)}>
          Close
        </button>
      </div>
    </div>
  );
});
