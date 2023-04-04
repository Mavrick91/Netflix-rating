import type { FC } from "react";
import styles from "~/styles/modal.css";

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
};

export const links = () => [{ rel: "stylesheet", href: styles }];

const Modal: FC<Props> = ({ children, handleClose }) => {
  return (
    <>
      <div className="modal">
        <div className="modal-overlay" onClick={handleClose} />
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default Modal;
