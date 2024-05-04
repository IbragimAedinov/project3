import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  
  return (
    props.isOpened && (<div
      className={`${Styles["overlay"]} ${Styles["overlay_is-opened"]}`} 
      onClick={props.onClose}
      >
    </div>
    )
  );
};
