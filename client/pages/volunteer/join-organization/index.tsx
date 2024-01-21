import { ColumnType } from 'antd/lib/table';
import { useMutation, useQuery } from 'react-query';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import { organizationService } from '../../../shared/services/organization.service';
import { IOrganization } from '../../../shared/typeDefs/schema/organization.type';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Table, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { userService } from '@/services/user.service';
import { volunteerService } from '../../../shared/services/volunteer.service';

type Props = {
  next: any;
};

const JoinOrganization = ({ next }: Props) => {
  const { user } = useAppSelector((state) => state.appSlice);
  const [form] = useForm();
  const { data: dataOrganization } = useQuery(['organizers'], () =>
    organizationService.getAllOrganization()
  );

  const { data: dataUser } = useQuery(['userDetail'], () =>
    userService.getUserByAuth()
  );

  const [disabled, setDisabled] = useState(false);
  if (dataUser?.data.data.organization_id) {
    setDisabled(true);
  }
  const { data: organizers } = useQuery(
    ['organizers'],
    () => organizationService.getAllOrganization(),
    {
      select(data) {
        const result = data.data.data;
        if (!result) return;
        const res = result.organizations.map((organization) => ({
          label: organization.name,
          value: organization.id
        }));
        return res;
      }
    }
  );
  const { data: dataVolunteerRequest, refetch } = useQuery(
    'getCurrentRequestOrganization',
    () => volunteerService.getCurrentRequestToOrganization()
  );

  const handleForm = useMutation({
    mutationKey: 'requestToOrganization',
    mutationFn: (body: { organization_id: number }) =>
      volunteerService.requestToOrganization(body),
    onSuccess(data, _variables, _context) {
      message.success('Gửi yêu cầu thành công');
      window.location.reload();
    },
    onError(error, variables, context) {
      message.error('Gửi yêu cầu thất bại');
    }
  });

  const handleCancellation = useMutation({
    mutationKey: 'cancelRequestToOrganization',
    mutationFn: () => volunteerService.cancelRequestToOrganization(),
    onSuccess(data, _variables, _context) {
      message.success('Yêu cầu đã được hủy');
      window.location.reload();
    },
    onError(error, variables, context) {
      message.error('Hủy yêu cầu thất bại');
    }
  });

  const handleRequest = (organization_id: number) => {
    handleForm.mutate({ organization_id });
    next();
  };

  // useEffect(() => {
  //   refetch()
  // }, [dataVolunteerRequest]);

  const columns: ColumnType<IOrganization>[] = [
    {
      title: '#',
      key: 'no.',
      render: (value, record, index) => (
        <div>
          <p>{index + 1}</p>
        </div>
      )
    },
    {
      title: 'Id tổ chức',
      key: 'id',
      render: (_, record) => <p>{record.id}</p>
    },
    {
      title: 'Tên tổ chức',
      key: 'name',
      render: (_, record) => <p>{record.name}</p>
    },
    {
      title: 'Người đứng đầu',
      dataIndex: 'creator',
      render: (_, record) => <p>{record.creator.name}</p>
    },
    {
      title: 'Thông tin liên hệ',
      key: 'contact',
      render: (_, record) => {
        return (
          <div>
            <p>
              <strong>Email:</strong> {record.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {record.phone}
            </p>
          </div>
        );
      }
    }
  ];

  return (
    <>
      {
        <React.Fragment>
          <h3 className='flex flex-col justify-center items-center gap-10 mb-12 text-4xl leading-8 text-bold text-[#0F147F]'>
            Gửi yêu cầu gia nhập tổ chức
          </h3>
          <h3>
            Bạn đã gia nhập tổ chức:{' '}
            {dataUser?.data.data.organization_id || 'Không'}
          </h3>
          <div className='flex items-center'>
            <h3 className='mr-4'>
              Hiện tại bạn đang xin gia nhập tổ chức:{' '}
              {dataVolunteerRequest?.data?.data?.organization_id || 'Không'}
            </h3>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => handleCancellation.mutate()}
            >
              Hủy yêu cầu
            </Button>
          </div>
          <Form form={form} onFinish={handleRequest}>
            <div className='flex'>
              <Form.Item
                label='Chọn tổ chức bạn muốn gia nhập'
                name='organization_id'
                className='text-style flex-grow mr-2'
              >
                <Select
                  placeholder='Chọn tổ chức'
                  optionLabelProp='label'
                  options={organizers}
                />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button type='primary' htmlType='submit' disabled={disabled}>
                  Gửi yêu cầu
                </Button>
              </Form.Item>
            </div>
          </Form>
          <h1 className='flex flex-col justify-center items-center gap-10 mb-12 text-4xl leading-8 text-bold text-[#0F147F]'>
            Danh sách tổ chức
          </h1>
          <Table
            columns={columns}
            dataSource={dataOrganization?.data?.data?.organizations}
            pagination={{
              pageSize: 10
            }}
          />
        </React.Fragment>
      }
    </>
  );
};

JoinOrganization.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default JoinOrganization;
