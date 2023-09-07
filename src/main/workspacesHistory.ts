import { app, JumpListCategory, JumpListItem } from 'electron'
import { platform } from '@electron-toolkit/utils'
import { VideoInfo } from '../common/types';
import { sortBy } from 'lodash'

export const handleWindowsJumpList = (videoList: Array<VideoInfo>) => {
  const MAX_LENGTH = 5;

  if (!platform.isWindows) {
    return;
  }

  let jumpList: JumpListCategory[] = [];
  let videoJumpListItem: JumpListItem[] = [];

  const compareByLastPlayTime = (item: { lastPlayTime: any; }) => {
    return item.lastPlayTime;
  }

  // 按照播放时间进行排序
  const sortVideoList = sortBy(videoList, compareByLastPlayTime);

  sortVideoList.forEach((ite: { name: string; path: string; }, index: number) => {
    if(MAX_LENGTH < index) {
      throw Error();
    }

    videoJumpListItem.push({
      type: 'task',
      title: ite.name.substring(0, 255),
      description: ite.path.substring(0, 255),
      program: process.execPath,
      args: `--uri ${ite.path}`,
      iconPath: process.execPath,
      iconIndex: 0
    })
  });

  if(sortVideoList) {
    jumpList.push({
      type: 'custom',
      name: '最近播放的视频',
      items: videoJumpListItem
    })
  }
 

  jumpList.push({
    type: 'custom',
    name: '最近播放的音乐',
    items: []
  },)

  app.setJumpList(jumpList)
}