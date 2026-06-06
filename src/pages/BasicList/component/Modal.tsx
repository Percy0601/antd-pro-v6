import React, {useEffect} from 'react';
import {Modal as AntdModal, Form} from 'antd';
import {useRequest} from 'umi';

import FormBuilder from '../builder/FormBuilder';

const Modal = ({ modalVisible, hideModal, modalUri }: {modalVisible: boolean; hideModal: () => void; modalUri: string}) => {
    const init = useRequest<{ data: PageApi.Data }>(
        // `https://public-api-v2.aspirantzhang.com/api/admins/add?X-API-KEY=antd`,
        `${modalUri}`
    );

    useEffect(() => {
        if(modalVisible) {
            init.run();
        }
    }, [modalVisible]);

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    }
    return (
        <div>
            <AntdModal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modalVisible}
                // onOk={handleOk}
                onCancel={hideModal}
            >
                <Form {...layout}>
                    {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
                </Form>

            </AntdModal>
        </div>
    )
}

export default Modal;