import { Button, Col, Row, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  SkypeOutlined,
  GooglePlusOutlined,
  LinkedinOutlined,
  TwitterOutlined
} from '@ant-design/icons';

const FooterContent = () => {
  return (
    <Row
      justify='center'
      align='middle'
      style={{ backgroundColor: '#f0f2f5', padding: '20px 0' }}
    >
      <Col span={24} style={{ textAlign: 'center' }}>
        <Space size='large'>
          <Link to='#'>
            <FacebookOutlined />
          </Link>
          <Link to='#'>
            <YoutubeOutlined />
          </Link>
          <Link to='#'>
            <InstagramOutlined />
          </Link>
          <Link to='#'>
            <SkypeOutlined />
          </Link>
          <Link to='#'>
            <GooglePlusOutlined />
          </Link>
          <Link to='#'>
            <TwitterOutlined />
          </Link>
          <Link to='#'>
            <LinkedinOutlined />
          </Link>
        </Space>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <p>©2022 Your Company Name</p>
        <p>123 Street, City, Country</p>
        <p>info@yourcompany.com</p>
      </Col>
    </Row>
  );
};

export default FooterContent;
