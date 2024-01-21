import { useForm } from 'antd/lib/form/Form';
import DashboardLayout from '../shared/layouts/DashboardLayout';
import { useMutation } from 'react-query';
import { IChangePassword } from '../shared/typeDefs/schema/user.type';
import { userService } from '../shared/services/user.service';
import { Button, Form, Input, Popconfirm, message } from 'antd';
import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

type Props = {
  next: any;
};

const changePassword = ({ next }: Props) => {
  const [form] = useForm();

  const handleChangePassword = useMutation({
    mutationKey: 'changePassword',
    mutationFn: (body: IChangePassword) => userService.changePassword(body),
    onSuccess() {
      message.success('Đổi mật khẩu thành công');
    },
    onError() {
      message.error('Đổi mật khẩu không thành công');
    }
  });

  function handleForm(value: IChangePassword) {
    handleChangePassword.mutate(value);
    next();
  }

  return (
    <React.Fragment>
      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 8 }}
        layout='horizontal'
        onFinish={handleForm}
      >
        <Form.Item
          name='currentPassword'
          label='Mật khẩu hiện tại'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='Mật khẩu mới'
          name='newPassword'
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Vui lòng nhập mật khẩu'
            },
            {
              validator: (_, value) => {
                if (value.length < 6) {
                  return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự');
                } else {
                  return Promise.resolve();
                }
              }
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Xác nhận mật khẩu'
          name='confirmPassword'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Mật khẩu xác nhận không khớp')
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            type='primary'
            // htmlType='submit'
            loading={handleChangePassword.isLoading}
          >
            Cập nhật
            <Popconfirm
              title='Bạn có chắc chắn muốn cập nhật mật khẩu không?'
              onConfirm={() => form.submit()}
            >
              <CheckCircleOutlined />
            </Popconfirm>
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

changePassword.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export default changePassword;
