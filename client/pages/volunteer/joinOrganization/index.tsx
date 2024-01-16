import { ColumnType } from 'antd/lib/table';
import { useMutation, useQuery } from 'react-query';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import { organizationService } from '../../../shared/services/organization.service';
import { IOrganization } from '../../../shared/typeDefs/schema/organization.type';
import React from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { volunteerService } from '../../../shared/services/volunteer.service';

const JoinOrganization = () => {
  const { user } = useAppSelector((state) => state.appSlice);
  const [form] = useForm();
  const { data: dataOrganization } = useQuery(['organizers'], () =>
    organizationService.getAllOrganization()
  );
  console.log(dataOrganization);
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
  const { data: dataVolunteerRequest } = useQuery(
    'getCurrentRequestOrganization',
    () => volunteerService.getCurrentRequestToOrganization()
  );

  const handleForm = useMutation({
    mutationKey: 'requestToOrganization',
    mutationFn: (body: { organization_id: number }) =>
      volunteerService.requestToOrganization(body),
    onSuccess(data, _variables, _context) {
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error);
    }
  });

  const handleRequest = (organization_id: number) => {
    handleForm.mutate({ organization_id });
  };

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
          <Form form={form} onFinish={handleRequest}>
            <Form.Item
              label='Chọn tổ chức bạn muốn gia nhập'
              name='organization_id'
            >
              <Select
                placeholder='Chọn tổ chức'
                optionLabelProp='label'
                options={organizers}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type='primary' htmlType='submit'>
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Form>
          <h1 className='flex flex-col justify-center items-center gap-10 mb-24 text-6xl leading-8 text-bold text-[#0F147F]'>
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
