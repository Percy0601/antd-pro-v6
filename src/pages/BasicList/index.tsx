import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from './builder/ActionBuilder';
import ColumnBuilder from './builder/ColumnBuilder';
import Modal from './component/Modal';

import styles from './index.less';

const Index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUri, setModalUri] = useState('');
  const init = useRequest<{ data: BasicListApi.ListData }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: '胡彦斌',
  //     age: 32,
  //     address: '西湖区湖底公园1号',
  //   },
  //   {
  //     key: '2',
  //     name: '胡彦祖',
  //     age: 42,
  //     address: '西湖区湖底公园1号',
  //   },
  // ];
  //
  // const columns = [
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: '年龄',
  //     dataIndex: 'age',
  //     key: 'age',
  //   },
  //   {
  //     title: '住址',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  // ];

  /**
   * init.run() 触发条件: page, per_page变更
   */
  useEffect(() => {
    init.run();
  }, [page, per_page]);

  const actionHandler = (action: BasicListApi.Action) => {
    switch (action.action) {
      case 'modal':
        setModalUri(action.uri as string);
        setModalVisible(true);
        break;
      default:
        break;
    }
  };
  const searchLayout = () => {
    return '';
  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles['table-toolbar']}>
          {/*<Button type="primary">Add</Button>*/}
          <Space>
            {ActionBuilder(init?.data?.layout.tableToolBar, actionHandler)}
          </Space>
        </Col>
      </Row>
    );
  };

  const paginationChangeHandler = (page: any, pageSize: any) => {
    setPage(page);
    setPerPage(pageSize);
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={8}>
          ...
        </Col>
        <Col xs={24} sm={16}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showQuickJumper
            showSizeChanger
            showTotal={(total) => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
            align="end"
          />
        </Col>
      </Row>
    );
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(
            init?.data?.layout?.tableColumn,
            actionHandler,
          )}
          pagination={false}
          loading={init?.loading}
        />
        {afterTableLayout()}
      </Card>
      <Modal
        modalVisible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
        }}
        modalUri={modalUri}
      />
    </PageContainer>
  );
};

export default Index;
