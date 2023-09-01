import {
  MinusOutlined,
  BorderOutlined,
  CloseOutlined,
} from '@ant-design/icons'

import logo from '../../../../../resources/icon.png'

import './index.scss'

const TitleBar: React.FC = () => {
  return (
    <div className='titlebar-container'>
      <div className='titlebar-logo'>
        <img src={logo} alt="熊猫播放器" />
      </div>
      <div className='titlebar-title'>熊猫播放器</div>
      <div className='titlebar-options'>
        <div className='titlebar-action'>
          <MinusOutlined
            className='titlebar-icon'
          />
          <BorderOutlined
            className='titlebar-icon'
          />
          <CloseOutlined
            className='titlebar-icon titlebar-icon-close'
          />
        </div>
      </div>
    </div>
  )
}

export default TitleBar
