import { FileText, FolderClosed } from "lucide-react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react"

// Import markdown files directly
import workMd from '../content/work.md?raw'
import sideProjectsMd from '../content/side-projects.md?raw'
import personalMd from '../content/personal.md?raw'
import quickLinksMd from '../content/quick-links.md?raw'

interface SidebarProps {
  onFileSelect: (content: string) => void
}

export function Sidebar({ onFileSelect }: SidebarProps) {
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({})
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'work': true, // Default open state
  })

  useEffect(() => {
    // Load all markdown files
    const loadMarkdownFiles = () => {
      const content: Record<string, string> = {
        'work': workMd,
        'side projects': sideProjectsMd,
        'personal': personalMd,
        'quick links': quickLinksMd
      }

      setMarkdownContent(content)
      // Load "work" content by default
      onFileSelect(content['work'])
    }

    loadMarkdownFiles()
  }, [onFileSelect])

  const handleFolderClick = (name: string) => {
    // Only toggle folder open state
    setOpenFolders(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const handleFileClick = (name: string) => {
    // Only trigger content selection
    const content = markdownContent[name]
    if (content) {
      onFileSelect(content)
    }
  }

  return (
    <div className="w-60 bg-[#181818] flex flex-col border-r border-[#333]">
      <div className="p-2 text-sm font-medium flex items-center justify-between">
        <span>Jatin's Work (workspace)</span>
        <ChevronDownIcon className="w-4 h-4" />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="px-2 py-1">
          <FileTreeItem 
            name="work" 
            type="folder" 
            isOpen={openFolders['work']} 
            dotColor="green" 
            onFolderClick={() => handleFolderClick('work')}
            onFileClick={() => handleFileClick('work')}
            filePath="/src/content/work.md"
          />
          <FileTreeItem 
            name="quick links" 
            type="folder" 
            isOpen={openFolders['quick links']}
            onFolderClick={() => handleFolderClick('quick links')}
            onFileClick={() => handleFileClick('quick links')}
            filePath="/src/content/quick-links.md"
          />
        </div>
      </div>
    </div>
  )
}

interface FileTreeItemProps {
  name: string
  type: "file" | "folder"
  dotColor?: "blue" | "orange" | "green"
  isOpen?: boolean
  onFolderClick?: () => void
  onFileClick?: () => void
  filePath?: string
}

function FileTreeItem({ 
  name, 
  type, 
  dotColor, 
  isOpen, 
  onFolderClick, 
  onFileClick, 
  filePath 
}: FileTreeItemProps) {
  return (
    <div>
      <div 
        className="flex items-center py-0.5 px-2 hover:bg-[#2a2d2e] rounded group cursor-pointer"
        onClick={onFolderClick}
      >
        {type === "folder" && (
          <div className="flex items-center" onClick={(e) => {
            e.stopPropagation()
            onFolderClick?.()
          }}>
            <ChevronDownIcon className={`w-4 h-4 mr-1 ${!isOpen && "-rotate-90"}`} />
            <FolderClosed className="w-4 h-4 mr-1" />
          </div>
        )}
        {type === "file" && <FileText className="w-4 h-4 mr-1" />}
        <span className="text-sm">{name}</span>
        {dotColor && (
          <div
            className={`w-2 h-2 rounded-full ml-2 
              ${dotColor === "blue" ? "bg-blue-500" : dotColor === "orange" ? "bg-orange-500" : "bg-green-500"}`}
          />
        )}
      </div>
      {type === "folder" && isOpen && filePath && (
        <div 
          className="ml-6 py-0.5 px-2 flex items-center hover:bg-[#2a2d2e] rounded group cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onFileClick?.()
          }}
        >
          <FileText className="w-4 h-4 mr-1" />
          <span className="text-sm text-gray-400">{filePath.split('/').pop()}</span>
        </div>
      )}
    </div>
  )
}

