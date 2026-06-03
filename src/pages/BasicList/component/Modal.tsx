import React from 'react';
import {Modal as AntdModal} from 'antd';
const Modal = () => {
    return (
        <div>
            <AntdModal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={true}
                // onOk={handleOk}
                // onCancel={handleCancel}
            >
            </AntdModal>
        </div>
    )
}

export default Modal;