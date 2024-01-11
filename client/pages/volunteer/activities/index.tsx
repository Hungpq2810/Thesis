import { ColumnType } from 'antd/lib/table';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import { volunteerService } from '../../../shared/services/volunteer.service';
import { useMutation, useQuery } from 'react-query';
import { Col, Row, Table } from 'antd';
import { IAppliedVolunteer } from '../../../shared/typeDefs/schema/activity.type';
import React from 'react';

const VolunteerActivity = () => {
  const { user } = useAppSelector((state) => state.appSlice);
  const { data: dataVolunteerActivity } = useQuery(
    ['listVolunteerActivity'],
    () => volunteerService.getAppliedActivities(),
    {
      select(data) {
        return data.data.data.activityApplied;
      }
    }
  );

  const columns: ColumnType<IAppliedVolunteer>[] = [
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
      title: 'Tên hoạt động',
      key: 'name',
      render: (_, record) => <p>{record.activity?.name}</p>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <p>
          {record.status === 0
            ? 'Đăng ký'
            : record.status === 1
              ? 'Phê duyệt'
              : record.status === 2
                ? 'Không phê duyệt'
                : record.status === 3
                  ? 'Đã tham gia'
                  : 'Không tham gia'}
        </p>
      )
    }
  ];

  return (
    <>
      {
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>
                Quản lý đơn xin vào hoạt động
              </h1>
            </Col>
            {/* <Col span={12}>
           <div className='flex py-2 justify-between items-center gap-3'>
             <Search
               className='bg-blue-300 rounded-lg'
               placeholder='Tìm kiếm'
               onSearch={() => {}}
               enterButton
             />
           </div>
         </Col> */}
          </Row>
          <Table columns={columns} dataSource={dataVolunteerActivity} />
        </React.Fragment>
      }
    </>
  );
};

VolunteerActivity.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default VolunteerActivity;
