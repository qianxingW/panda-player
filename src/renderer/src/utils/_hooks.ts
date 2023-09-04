import { IpcRendererListener } from "@electron-toolkit/preload"
import { useEffect } from "react"

/**
 * 子进程监听
 * @param channel 
 * @param listener 
 * @returns 
 */
export const useIpcRendererOn = (channel: string, listener: IpcRendererListener) => {
  useEffect(() => {
    window.electron.ipcRenderer.on(channel, listener)
    return () => {
      window.electron.ipcRenderer.removeAllListeners(channel)
    }
  }, [])
}