import { ipcMain, BrowserWindow, dialog } from "electron";
import Store from 'electron-store'
import { basename } from 'path'

import * as events from '../common/events/constants';
import { VideoFile } from '../common/types';

const store = new Store();

const registerIpc = () => {
  ipcMain.on(events.OPEN_FILE_DIALOG, async (e) => {
    const extensions = ["mp4"]
    const win = BrowserWindow.fromWebContents(e.sender);
  
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

          e.sender.send(events.SELECT_VIDEO_FILE, videoFiles);
        }
      }).catch(err => {
        console.log(err, 'eee');
      })
  })

  ipcMain.on(events.SET_STORE, async (_, key, value) => {
    store.set(key, value)
  })

  ipcMain.handle(events.GET_STORE, (_, key) => {
    return store.get(key)
  })
}

export default registerIpc
