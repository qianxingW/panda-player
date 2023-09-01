import { useContext } from 'react';

import { Popover } from 'antd';
import {
  MinusOutlined,
  BorderOutlined,
  CloseOutlined,
  MenuOutlined,
} from '@ant-design/icons'

import { Menu } from '../index'
import logo from '../../../../../resources/icon.png'
import { WIN_INVOKE } from '@common/events/constants';
import PlayerContext from '@renderer/store';

import './index.scss'

const TitleBar: React.FC = () => {
  const {state, dispath} = useContext(PlayerContext)
  const { openMenu } = state;
  const handClick = (action: string): void  => {
    window.electron.ipcRenderer.send(WIN_INVOKE, action)
  }

  const onOpenMenuChange = () => {
    dispath({ type: 'setOpenMenu', data: !openMenu })
  }
  console.log(dispath);
  
  return (
    <div className='titlebar-container'>
      <div className='titlebar-logo'>
        <img src={logo} alt="熊猫播放器" />
      </div>
      <div className='titlebar-title'>熊猫播放器</div>
      <div className='titlebar-options'>
        <div className='titlebar-menu'>
          <Popover
            arrow={false}
            trigger="click"
            content={<Menu />}
          >
            <MenuOutlined
              className='titlebar-icon'
              onClick={onOpenMenuChange}
            />
          </Popover>
        </div>
        <div className='titlebar-action'>
          <MinusOutlined
            className='titlebar-icon'
            onClick={() => { handClick('min') }}
          />
          <BorderOutlined
            className='titlebar-icon'
            onClick={() => { handClick('max') }}
          />
          <CloseOutlined
            className='titlebar-icon titlebar-icon-close'
            onClick={() => { handClick('close') }}
          />
        </div>
      </div>
    </div>
  )
}

export default TitleBar