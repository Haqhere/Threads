import React from 'react';
import './postModal.css'



type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const PostModal: React.FC<propTypes> = ({ open, onClose, children }) => {
  if (!open) return null; // Don't render modal if not open

  return (
    <div className="modal-background" onClick={onClose} >
      <div className="modal-box" onClick={(e) => e.stopPropagation()} >
        <button className="modal-close" onClick={onClose} >
          ✕
        </button>
        <h2 className="modal-header">New Thread</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default PostModal;
