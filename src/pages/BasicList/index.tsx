import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Pagination, Row, Table } from 'antd';
import {useState, useEffect, useEffectEvent} from 'react';
import { useRequest } from 'umi';
import styles from './index.less';


const index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10)
  const init = useRequest<{ data: BasicListApi.ListData }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  /**
   * init.run() 触发条件: page, per_page变更
   */
  useEffect(() => {
    init.run();
  }, [page, per_page]);


  const searchLayout = () => {
    return ("");
  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles['table-toolbar']}>
          <Button type="primary">Add</Button>
        </Col>
      </Row>
    );
  };

  const paginationChangeHandler = (page: any, pageSize: any) => {
    setPage(page);
    setPerPage(pageSize);
  }
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
          align="end" />
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
          columns={init?.data?.layout?.tableColumn.filter((item) => {
            return item.hideInColumn !== true;
          })}
          pagination={false}
          loading={init?.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default index;
