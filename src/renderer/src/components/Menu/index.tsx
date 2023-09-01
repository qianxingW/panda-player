import React from "react"

import { Dropdown } from "antd"
import type { MenuProps } from 'antd';
import {
  MenuOutlined,
  CustomerServiceOutlined,
  VideoCameraOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import './index.scss'

const MenuTool: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <CustomerServiceOutlined />,
      label: "音乐库",
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: "视频库",
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: "设置",
    },
  ];

  return (
    <Dropdown
      overlayClassName="menu-content"
      menu={{ items }}
      placement="bottomLeft"
      trigger={['click']}
    >
      <MenuOutlined className='titlebar-icon'/>
    </Dropdown>
  )
}

export default MenuTool
