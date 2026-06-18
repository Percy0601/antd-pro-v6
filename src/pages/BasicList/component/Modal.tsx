import React, {useEffect, useState} from 'react';
import {Modal as AntdModal, Form, Button, Input} from 'antd';
import {useRequest} from 'umi';
import moment from 'moment';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';
import {setFieldsConverter, submitFieldAdaptor} from '../helper';

const Modal = ({ modalVisible, hideModal, modalUri }: {modalVisible: boolean; hideModal: () => void; modalUri: string}) => {
    const [form] = Form.useForm();
    const init = useRequest<{ data: BasicListApi.PageData }>(
        // `https://public-api-v2.aspirantzhang.com/api/admins/add?X-API-KEY=antd`,
        `https://public-api-v2.aspirantzhang.com${modalUri}?X-API-KEY=antd`, {
            manual: true,
        }
    );

    // const [uri, setUri] = useState('');
    // const [method, setMethod] = useState('');
    // const [values, setValues] = useState({});

    const request = useRequest(
        (values: any) => {
            const {uri, method, ...formValues} = values;
            console.log("#######, formValues".concat(JSON.stringify(formValues)));
            return {
                url: `https://public-api-v2.aspirantzhang.com${uri}`,
                method: method,
                data: {
                    ...submitFieldAdaptor(formValues),
                    'X-API-KEY': 'antd',
                    // 'create_time': moment(formValues.create_time).format(),
                    // 'update_time': moment(formValues.update_time).format(),
                },
            };
        },
        {
            manual: true,
        }
    );

    useEffect(() => {
        if(modalVisible) {
            form.resetFields();
            init.run();
        }
    }, [modalVisible]);

    // 等待init请求返回值后， 然后对表单进行初始化操作。
    useEffect(() => {
        if(init.data) {
            form.setFieldsValue(setFieldsConverter(init.data));
        }
    }, [init.data]);

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const onFinish = (values: any) => {
        console.log("########:".concat(JSON.stringify(values)));
        // setValues(values);
        request.run(values);
    };

    const actionHandler = (action: BasicListApi.Action) => {

        switch(action.action) {
            case 'submit':
                // setUri(action.uri);
                // setMethod(action.method);
                form.setFieldsValue({uri: action.uri, method: action.method});
                form.submit();
                break;

            default:
                break;
        }
    };

    return (
        <div>
            <AntdModal
                title={init?.data?.page?.title}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modalVisible}
                // onOk={handleOk}
                onCancel={hideModal}
                footer={ActionBuilder(init?.data?.layout?.actions[0].data, actionHandler)}
                maskClosable={false}
            >
                <Form form={form} {...layout} initialValues={{
                    create_time: moment(),
                    update_time: moment(),
                    status: true,
                }} onFinish={onFinish}>
                    {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
                    <Form.Item name="uri" key="uri" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="method" key="method" hidden>
                        <Input />
                    </Form.Item>
                </Form>

            </AntdModal>
        </div>
    )
}

export default Modal;