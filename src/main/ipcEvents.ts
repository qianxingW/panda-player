import { ipcMain, BrowserWindow, dialog } from "electron";
import { basename, extname } from 'path'

import { OPEN_FILE_DIALOG, SELECT_VIDEO_FILE } from '../common/events/constants';
import { VideoFile } from '../common/types';

const registerIpc = () => {
  ipcMain.on(OPEN_FILE_DIALOG, async (e) => {
    const extensions = ["mp4"]
    const win = BrowserWindow.fromWebContents(e.sender);
    console.log(win!, 'dds');
    
    win!.focus();
    dialog
      .showOpenDialog(win!, {
        title: 'Select Videos',
        properties: ['openFile', 'multiSelections'],
        filters: [{ extensions, name: 'Video' }]
      }).then((res) => {
        if(!res.canceled) {
          const videoFiles: VideoFile[] = [];

          res.filePaths.forEach(path => {
            const name = basename(path)
            videoFiles.push({
              name,
              path,
            });
          });

          e.sender.send(SELECT_VIDEO_FILE, videoFiles);
        }
      }).catch(err => {
        console.log(err, 'eee');
      })
  })
}

export default registerIpc
