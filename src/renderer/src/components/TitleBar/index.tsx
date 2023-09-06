import {
  MinusOutlined,
  BorderOutlined,
  CloseOutlined,
} from '@ant-design/icons'

import { Menu } from '../index'
import logo from '../../../../../resources/icon.png'
import { WIN_INVOKE } from '@common/events/constants';
import './index.scss'

const TitleBar: React.FC = () => {
  const handClick = (action: string): void  => {
    window.electron.ipcRenderer.send(WIN_INVOKE, action)
  }

  return (
    <div className='titlebar-container'>
      <div className='titlebar-logo'>
        <img src={logo} alt="熊猫播放器" />
      </div>
      <div className='titlebar-title'>熊猫播放器</div>
      <div className='titlebar-options'>
        <div className='titlebar-tool'>
          <Menu />
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
          {/* <SwitcherOutlined /> */}
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
