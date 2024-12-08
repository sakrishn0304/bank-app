import { Modal } from "@mui/material";
import React from 'react';


const CustomModal = (props:any) => {
    return (
        <React.Fragment>
            <Modal
                open={props.open}
                onClose={() => props.setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {props.children}
            </Modal>
        </React.Fragment>
    );
}

export default CustomModal;