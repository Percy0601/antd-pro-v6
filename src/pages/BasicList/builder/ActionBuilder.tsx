import React from 'react';
import { Button} from 'antd';
import {ButtonType} from 'antd/lib/button';

const ActionBuilder = (actions: BasicListApi.Action[] | undefined) => {
    return (actions || []).map((action: any) => {
        if(action.component === 'button') {
            return <Button type={action.type as ButtonType} key={action.text}>{action.text}</Button>
        }
        return null;
    });
}

export default ActionBuilder;
