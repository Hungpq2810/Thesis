import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Space, Popconfirm } from 'antd';
import { IAppliedVolunteer } from '../../../shared/typeDefs/schema/activity.type';
import { UseMutationResult } from 'react-query/types/react/types';
import { AxiosResponse } from 'axios';
import { ApplyActivityStatus } from '.';

type Props = {
  record: IAppliedVolunteer;
  updateMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      user_id: number;
      status: number;
    },
    unknown
  >;
};

export const ApplyAction = ({ record, updateMutation }: Props) => {
  if (new Date(record.activity?.register_to || '') > new Date()) {
    return (
      <Space size='middle'>
        <Popconfirm
          okButtonProps={{ loading: updateMutation.isLoading }}
          onConfirm={() => {
            const body = {
              user_id: record.user_id,
              status: 1
            };
            updateMutation.mutate(body);
          }}
          title={'Phê duyệt'}
        >
          <CheckOutlined className='cursor-pointer'></CheckOutlined>
        </Popconfirm>
        <Popconfirm
          okButtonProps={{ loading: updateMutation.isLoading }}
          onConfirm={() => {
            const body = {
              user_id: record.user_id,
              status: 2
            };
            updateMutation.mutate(body);
          }}
          title={'Từ chối'}
        >
          <CloseOutlined className='cursor-pointer'></CloseOutlined>
        </Popconfirm>
      </Space>
    );
  } else {
    return [
      ApplyActivityStatus.ACCEPTED,
      ApplyActivityStatus.JOINED,
      ApplyActivityStatus.ABSENT
    ].includes(record.status) ? (
      <Space size='middle'>
        <Popconfirm
          okButtonProps={{ loading: updateMutation.isLoading }}
          onConfirm={() => {
            const body = {
              user_id: record.user_id,
              status: 3
            };
            updateMutation.mutate(body);
          }}
          title={'Đã tham gia'}
        >
          <CheckCircleOutlined className='cursor-pointer'></CheckCircleOutlined>
        </Popconfirm>
        <Popconfirm
          okButtonProps={{ loading: updateMutation.isLoading }}
          onConfirm={() => {
            const body = {
              user_id: record.user_id,
              status: 4
            };
            updateMutation.mutate(body);
          }}
          title={'Không tham gia'}
        >
          <ExclamationCircleOutlined className='cursor-pointer'></ExclamationCircleOutlined>
        </Popconfirm>
      </Space>
    ) : null;
  }
};
