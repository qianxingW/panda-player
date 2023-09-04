
import React from "react"

import { Dropdown } from "antd"
import type { MenuProps } from 'antd';
import {
  FolderOpenOutlined,
  CustomerServiceOutlined,
  VideoCameraOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import { OPEN_FILE_DIALOG } from "@common/events/constants";

import './index.scss'

const OpenFile: React.FC = () => {
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
  ]
  
  const menuProps = {
    items,
  };

  const handButtonClick = () => {
    window.electron.ipcRenderer.send(OPEN_FILE_DIALOG)
  }

  return (
    <Dropdown.Button
      className="open-file"
      menu={menuProps}
      size="small"
      onClick={handButtonClick}
    >
      <FolderOpenOutlined />
  </Dropdown.Button>
  )
}

export default OpenFile
