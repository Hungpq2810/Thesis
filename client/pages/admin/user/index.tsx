import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, message, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import { useMemo, useState } from 'react';
import FormUser from './form';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import { userService } from '@/services/user.service';
import React from 'react';
import { IUser } from '@/typeDefs/schema/user.type';
import { organizationService } from '../../../shared/services/organization.service';

type Props = {};

const UserManagement = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<string>('');
  const [rowId, setRowId] = useState<number>();
  const { data: dataUser, refetch } = useQuery(['listUser'], () =>
    userService.getAllUser()
  );
  const { data: dataOrganization } = useQuery(['listOrganizationAdmin'], () =>
    organizationService.listOrganizationAdmin()
  );
  // const deleteMutation = useMutation({
  //   mutationKey: ['deleteUserMutation'],
  //   mutationFn: (userId: number) => userService.deleteUser(userId),
  //   onSuccess: () => {
  //     message.success('Xoá thành công');
  //     refetch();
  //   },
  //   onError() {
  //     message.error('Xoá không thành công');
  //   }
  // });
  const organizationNameMap = useMemo(() => {
    const map: any = {};

    (dataOrganization?.data.data.organizations || []).forEach((item) => {
      map[item.id] = item.name;
    });

    return map;
  }, [dataOrganization]);

  const columns: ColumnType<IUser>[] = [
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (value) => {
        switch (value) {
          case 2:
            return 'Ban tổ chức';
          case 1:
            return 'Tình nguyện viên';
          default:
            return 'Chưa xác định';
        }
      }
    },
    {
      title: 'Thuộc tổ chức',
      dataIndex: 'organization_id',
      render: (_, record) => (
        <p>{organizationNameMap[record.organization_id]}</p>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        return value === 0 ? 'Hoạt động' : 'Không hoạt động';
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <div
            className='cursor-pointer'
            onClick={() => {
              setAction('edit');
              setOpen(true);
              setRowId(record.id);
            }}
          >
            <EditOutlined />
          </div>
        </Space>
      )
    }
  ];

  return (
    <>
      {dataUser && dataUser.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý tài khoản</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search
                  className='bg-blue-300 rounded-lg'
                  placeholder='Tìm kiếm'
                  onSearch={() => {}}
                  enterButton
                />
                <Button
                  onClick={() => {
                    setAction('create');
                    setRowId(NaN);
                    setOpen(true);
                  }}
                >
                  Tạo mới
                </Button>
              </div>
            </Col>
          </Row>
          <Table
            dataSource={dataUser.data.data.users}
            columns={columns}
            pagination={{
              pageSize: 10
            }}
          />
          {action === 'create' && !rowId ? (
            <FormUser refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormUser
              refetch={refetch}
              editId={rowId}
              open={open}
              setOpen={setOpen}
            />
          )}
        </React.Fragment>
      )}
    </>
  );
};
UserManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default UserManagement;
