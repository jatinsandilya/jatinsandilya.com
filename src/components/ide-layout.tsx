import { Sidebar } from "./sidebar"
import { StatusBar } from "./status-bar"
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, GearIcon } from "@radix-ui/react-icons"
import { useState } from 'react'
import { MarkdownViewer } from './markdown-viewer'

export default function IDELayout() {
  const [activeMarkdown, setActiveMarkdown] = useState<string>('')

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#181818] text-gray-300">
      {/* Top Navigation */}
      <header className="flex-none flex items-center px-2 h-12 bg-[#1e1e1e] border-b border-[#333]">
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-[#333] rounded">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-[#333] rounded">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 mx-4">
          <div className="flex items-center px-3 py-1 bg-[#252526] rounded">
            <MagnifyingGlassIcon className="w-4 h-4 mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Jatin's Work (Workspace)"
              className="bg-transparent w-full focus:outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-[#333] rounded">
            <GearIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        <Sidebar onFileSelect={setActiveMarkdown} />
        <main className="flex-1 overflow-auto bg-[#181818]">
          {activeMarkdown && <MarkdownViewer content={activeMarkdown} />}
        </main>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  )
}

