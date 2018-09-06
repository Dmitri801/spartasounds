import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Zoom from '@material-ui/core/Zoom';



  const Transition = (props) => {
    return <Zoom in={true} {...props} />;
  }

const Modal = props => {
  return (
    <Dialog
      TransitionComponent={Transition}
      onBackdropClick={props.onBackDropClick}
      fullWidth={props.fullWidth}
      transitionDuration={{
        enter: 300,
        exit: 80
      }}
      BackdropProps={{
          style: {
              backgroundColor: 'rgba(14,29,36, 0.5)'
          }
      }}
      PaperProps={{
          style: {
              backgroundColor: '#1a1a1d',
              height: '500px',
              color: '#fff'
          }
      }}
      open={props.modalOpen}
    >
      <DialogTitle
      className={props.titleClassName}
      disableTypography={true}
      >{props.modalTitle}
       {props.closeIcon()}
      </DialogTitle> 
      {props.hr ? (
        <hr />
      ) : null}
      {props.children}
    </Dialog>
  );
};

export default Modal;
