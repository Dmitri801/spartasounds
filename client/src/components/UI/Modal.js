import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Zoom from "@material-ui/core/Zoom";

const Transition = props => {
  return <Zoom in={true} {...props} />;
};

const Modal = props => {
  return (
    <Dialog
      TransitionComponent={Transition}
      onBackdropClick={props.onBackDropClick}
      fullWidth={props.fullWidth}
      onEnter={props.onEnter}
      onExited={props.onExited}
      transitionDuration={{
        enter: props.modalName === "cartModal" ? 350 : 300,
        exit: 80
      }}
      BackdropProps={{ 
        style: {
          backgroundColor: "rgba(14,29,36, 0.5)"
        }
      }}
      PaperProps={{
        style: {
          backgroundColor: props.modalName === "cartModal" ? "#000" : "#1a1a1d",
          height: props.modalName === "cartModal" ? "280px" : "470px",
          width: "3000px",
          border: props.modalName === "cartModal" ? "2px solid #1a1a1d" : "",
          color: "#fff"
        }
      }}
      open={props.modalOpen}
    >
      {props.modalName !== "cartModal" ? (
        <DialogTitle className={props.titleClassName} disableTypography={true}>
          {props.modalTitle}
          {props.closeIcon()}
        </DialogTitle>
      ) : null}
      {props.hr ? <hr /> : null}
      {props.children}
    </Dialog>
  );
};

export default Modal;
