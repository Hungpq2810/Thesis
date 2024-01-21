import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  SelectProps,
  message
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'antd/lib/form/Form';
import { userService } from '@/services/user.service';
import { useAppSelector } from '@/hooks/useRedux';
import { skillService } from '@/services/skill.service';
import { IUser } from '@/typeDefs/schema/user.type';
import dayjs from 'dayjs';
import InputUpload from '@/components/common/UploadInput';
import { CheckCircleOutlined } from '@ant-design/icons';
import DashboardLayout from '../shared/layouts/DashboardLayout';
type Props = {
  next: any;
};
const Profile = ({ next }: Props) => {
  const [form] = useForm();
  const { user } = useAppSelector((state) => state.appSlice);
  const { data, refetch } = useQuery(['userDetail'], () =>
    userService.getUserByAuth()
  );
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatar);

  const [skillsDefault, setSkillsDefault] = useState<any[] | undefined>(
    data?.data.data.skills?.map((skill) => ({
      label: skill.name,
      value: skill.id
    }))
  );

  const { data: skills } = useQuery(
    ['skills'],
    () => skillService.getAllSkill(),
    {
      select(data) {
        const result = data.data.data;
        if (!result) return;
        const res = result.skills.map((skill) => ({
          label: skill.name,
          value: skill.id
        }));
        return res;
      }
    }
  );

  const updateProfile = useMutation({
    mutationKey: 'updateProfile',
    mutationFn: (body: IUser) => userService.updateProfile(body),
    onSuccess(data, _variables, _context) {
      if (data.data.data) {
        message.success('Cập nhật thành công');
      }
    },
    onError(error, variables, context) {
      message.error('Cập nhật không thành công');
    }
  });
  //Handle submit form Login
  function handleCreate(value: IUser) {
    updateProfile.mutate(value);
    next();
  }

  useEffect(() => {
    if (user && data) {
      setSkillsDefault(
        data.data.data.skills?.map((skill) => ({
          label: skill.name,
          value: skill.id
        }))
      );
      form.setFieldsValue({
        // @ts-ignore
        ...data.data.data.user
      });
    }
  }, [user, data]);

  useEffect(() => {
    refetch();
  }, [user]);

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
  const handleAvatarChange = (newAvatarUrl: string) => {
    const updatedAvatarUrl = newAvatarUrl || '';
    setAvatarUrl(updatedAvatarUrl);
    // Kiểm tra nếu formData tồn tại, thì cập nhật avatar trong formData
    if (user && data) {
      form.setFieldsValue({
        // @ts-ignore
        ...data.data.data.user,
        avatar: updatedAvatarUrl
      });
    }
  };

  return (
    <React.Fragment>
      <Card
        title='Thông tin cá nhân'
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
          form={form}
          name='basic'
          onFinish={handleCreate}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item label='Avatar' name='avatar'>
            <InputUpload initSrc={avatarUrl} onChange={handleAvatarChange} />
          </Form.Item>
          <Form.Item
            label='Tên'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
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
                message: 'Chưa điền email'
              },
              {
                validator: (_, value) => {
                  const regex =
                    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                  return regex.test(value)
                    ? Promise.resolve()
                    : Promise.reject('Định dạng email không hợp lệ');
                }
              }
            ]}
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
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Giới tính'
            name='gender'
            rules={[{ required: true, message: 'Chưa điền giới tính' }]}
          >
            <Select
              placeholder='Chọn giới tính của bạn'
              defaultValue={['']}
              optionLabelProp='label'
              options={options}
            />
          </Form.Item>

          <Form.Item
            label='Ngày sinh'
            name='birthday'
            rules={[{ required: true, message: 'Chưa điền ngày sinh' }]}
            getValueFromEvent={(onChange) =>
              dayjs(onChange).format('YYYY-MM-DD')
            }
            getValueProps={(i) => ({ value: dayjs(i) })}
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

          {skillsDefault && user?.role_id === 1 && (
            <Form.Item
              label='Kỹ năng'
              name='skills'
              rules={[{ required: false, message: 'Chưa điền kỹ năng' }]}
            >
              <Select
                defaultValue={skillsDefault}
                mode='multiple'
                placeholder='Chọn kỹ năng bạn thông thạo'
                optionLabelProp='label'
                options={skills}
              />
            </Form.Item>
          )}
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={updateProfile.isLoading}
            >
              Cập nhật
              <Popconfirm
                title='Bạn có chắc chắn muốn cập nhật hồ sơ của mình không?'
                onConfirm={() => {
                  handleCreate;
                }}
              >
                <CheckCircleOutlined />
              </Popconfirm>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
};
Profile.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default Profile;
