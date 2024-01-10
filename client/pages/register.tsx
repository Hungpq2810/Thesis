import { authService } from '@/services/auth.service';
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  SelectProps,
  message
} from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import BlankLayout from '@/layouts/BlankLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { validateVNPhone } from '../shared/utils/formValidator';
type Props = {};

const Register = ({}: Props) => {
  const router = useRouter();
  const registerMutation = useMutation({
    mutationKey: 'Register',
    mutationFn: (body: {
      username: string;
      password: string;
      name: string;
      email: string;
      phone: string;
      gender: number;
      birthday: Date;
      address: string;
      avatar: string;
    }) => authService.register(body),
    onSuccess(data, _variables, _context) {
      const res = data.data.data;
      if (res) {
        message.success('Đăng ký thành công');
        router.push('/login');
      }
    },
    onError(error, variables, context) {
      message.error('Đăng ký không thành công');
    }
  });
  //Handle submit form Register
  function handleRegister(value: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    gender: number;
    birthday: Date;
    address: string;
    avatar: string;
  }) {
    registerMutation.mutate(value);
  }
  const options: SelectProps['options'] = [
    {
      label: 'Nam',
      value: 0
    },
    {
      label: 'Nữ',
      value: 1
    }
  ];
  return (
    <React.Fragment>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <Card
        title='Đăng ký ngay'
        style={{ minWidth: 700 }}
        extra={
          <img
            style={{ maxWidth: 100, maxHeight: 100 }}
            alt='logo'
            src='/logo.svg'
          />
        }
      >
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={handleRegister}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label='Tên tài khoản'
            name='username'
            rules={[
              { type: 'string', required: true, message: 'Vui lòng tên đăng nhập' },
              { validator: (_,value) => {
                if (value.length < 8) {
                  return Promise.reject('Tên đăng nhập phải có ít nhất 8 ký tự');
                } else {
                  return Promise.resolve();
                }
              }, },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Chưa điền email',
              },
              {
                validator: (_,value) => {
                  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                  return regex.test(value) ? Promise.resolve() : Promise.reject('Định dạng email không hợp lệ');
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Tên'
            name='name'
            rules={[{ required: true, message: 'Chưa điền tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Số điện thoại'
            name='phone'
            rules={[
              { required: true, message: 'Chưa điền số điện thoại' },
              {
                
                message: 'Số điện thoại có 10 chữ số',
                validator: (_, value) => {
                  if (/(0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('Số điện thoại có 10 chữ số');
                  }
                 }
               }
            ]}
            hasFeedback
          >
            <Input type='string' />
          </Form.Item>

          <Form.Item
            label='Giới tính'
            name='gender'
            rules={[{ required: true, message: 'Chưa điền giới tính' }]}
          >
            <Select
              placeholder='Giới tính của bạn'
              defaultValue={['']}
              optionLabelProp='label'
              options={options}
            />
          </Form.Item>

          <Form.Item
            label='Ngày sinh'
            name='birthday'
            rules={[{ required: true, message: 'Chưa điền ngày sinh' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label='Địa chỉ'
            name='address'
            rules={[{ required: true, message: 'Chưa điền địa chỉ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[
              { type: 'string', required: true, message: 'Vui lòng nhập mật khẩu' },
              { validator: (_,value) => {
                if (value.length < 6) {
                  return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự');
                } else {
                  return Promise.resolve();
                }
              }, },
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
                  if (!value || getFieldValue('password') === value) {
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
              htmlType='submit'
              loading={registerMutation.isLoading}
            >
              Đăng ký
            </Button>
            <p className='mt-5 p-0 cursor-pointer text-black'>
              Đã có tài khoản?{' '}
              <span
                className='text-blue-400 hover:text-blue-500'
                onClick={() => router.push('/register')}
              >
                Đăng nhập ngay
              </span>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
};
Register.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);
export default Register;
