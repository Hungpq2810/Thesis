import { Col, Image, Popconfirm, Row, Space, Table, message } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import React from 'react';
import { volunteerService } from '@/services/volunteer.service';
import { IRequestVolunteer } from '@/typeDefs/schema/volunteer.type';
import { useAppSelector } from '@/hooks/useRedux';
import { CloseOutlined } from '@ant-design/icons';

type Props = {};

const VolunteersManagement = ({}: Props) => {
  const { user } = useAppSelector((state) => state.appSlice);
  const { data: dataVolunteer, refetch } = useQuery(['listVolunteer'], () =>
    volunteerService.getVolunteerGroupOrganizer()
  );
  const removeMutation = useMutation({
    mutationKey: ['removeMutation'],
    mutationFn: (id: number) => volunteerService.removeVolunteerByOrganizer(id),
    onSuccess: () => {
      message.success('Xoá thành công');
      refetch();
    },
    onError() {
      message.error('Xoá không thành công');
    }
  });
  const columns: ColumnType<IRequestVolunteer>[] = [
    {
      title: '#',
      key: 'id',
      render: (value, record, index) => (
        <div>
          <p>{index + 1}</p>
        </div>
      )
    },
    {
      title: 'Tên tình nguyện viên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Popconfirm
            okButtonProps={{ loading: removeMutation.isLoading }}
            onConfirm={() => {
              removeMutation.mutate(record.id);
            }}
            title={'Xác nhận xóa TNV khỏi tổ chức?'}
          >
            <CloseOutlined className='cursor-pointer'></CloseOutlined>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      {dataVolunteer && dataVolunteer.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý tình nguyện viên</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search
                  className='bg-blue-300 rounded-lg'
                  placeholder='Tìm kiếm'
                  onSearch={() => {}}
                  enterButton
                />
              </div>
            </Col>
          </Row>
          <Table
            dataSource={dataVolunteer.data.data as any}
            columns={columns}
          />
        </React.Fragment>
      )}
    </>
  );
};
VolunteersManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default VolunteersManagement;
