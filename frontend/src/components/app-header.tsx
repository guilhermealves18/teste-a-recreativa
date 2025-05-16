'use client'

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

export function AppHeader() {
  return (
    <div className='flex items-center justify-between bg-white pr-16'>
      <Header className="flex items-center !bg-white">
        <Typography.Title level={5} className="!mb-0">Studio MIA - Planos de Aula</Typography.Title>
      </Header>

      <Space direction="vertical" size={16} >
        <Space wrap size={16}>
          <div className='!flex !items-center !justify-center gap-5'>
            <Avatar className='!bg-foreground' size="default" icon={<UserOutlined />} />
            <Typography.Title level={5} className="!mb-0">Professor</Typography.Title>
          </div>
        </Space>
      </Space>
    </div>
  )
}
