import React from 'react';
import moment from 'moment';
import { Tag, Space} from 'antd';
import ActionBuilder from './ActionBuilder';


const ColumnBuilder = (tableColumn: BasicListApi.TableColumn[] | undefined) => {
    const newColumns: BasicListApi.TableColumn[] = [];
    newColumns.push({ title: 'ID', dataIndex: 'id', key: 'id' });
    (tableColumn || []).forEach((column: any) => {

        if(column.hideInColumn !== true) {

            switch (column.type) {
                case 'datetime':
                    column.render = (value: any) => {
                        return moment(value).format('YYYY-MM-DD HH:mm:ss')
                    }
                    break;
                case 'switch':
                    column.render = (value: any) => {
                        const option = column.data.find((item: any) => {
                            return item.value === value;
                        });
                        return <Tag color={value? 'blue': 'red'}>{option?.title}</Tag>
                    }
                    break;
                case 'actions':
                    column.render = () => {
                        return <Space>{ActionBuilder(column.actions)}</Space>;
                    }
                    break;
                default:
                    break;
            }
            newColumns.push(column);
        }
    })

    // return [{ title: 'ID', dataIndex: 'id', key: 'id'}].concat(init?.data?.layout?.tableColumn.filter((item) => {
    //   return item.hideInColumn !== true;
    // }) || []);
    return newColumns;
}

export default ColumnBuilder;