import { GitBranch, Play, Bug, Split, Bell } from "lucide-react"

export function StatusBar() {
  return (
    <div className="h-6 bg-[#181818] text-white flex items-center text-xs px-2 border-t border-[#333]">
      <div className="flex items-center space-x-4 bg-[#5a50e8] px-4">
        <div className="flex items-center ">
          <GitBranch className="w-3 h-3 mr-1" />
          <span>main</span>
        </div>
        <div className="flex items-center space-x-2">
          <Play className="w-3 h-3" />
          <Bug className="w-3 h-3" />
          <Split className="w-3 h-3" />
        </div>
        <div className="flex items-center">
          <span>86</span>
          <span className="mx-1">△</span>
          <span>1</span>
          <span className="mx-1">✗</span>
          <span>0</span>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center space-x-4 ">
        <span>Go Live</span>
        <span>VS Code</span>
        <Bell className="w-3 h-3 " />
      </div>
    </div>
  )
}

