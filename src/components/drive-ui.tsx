"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Download,
  File,
  FileImage,
  FileText,
  Folder,
  Grid3X3,
  Home,
  Info,
  List,
  MoreVertical,
  Plus,
  Share2,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

// Mock data for files and folders
const mockData = {
  root: {
    name: "My Drive",
    type: "folder",
    path: "root",
    children: ["documents", "images", "projects", "resume.pdf", "budget.xlsx", "presentation.pptx"],
  },
  documents: {
    name: "Documents",
    type: "folder",
    path: "documents",
    parent: "root",
    children: ["work", "personal", "important-doc.docx", "notes.txt"],
  },
  work: {
    name: "Work",
    type: "folder",
    path: "documents/work",
    parent: "documents",
    children: ["report.pdf", "meeting-notes.docx"],
  },
  personal: {
    name: "Personal",
    type: "folder",
    path: "documents/personal",
    parent: "documents",
    children: ["passport-scan.pdf", "tax-2023.pdf"],
  },
  images: {
    name: "Images",
    type: "folder",
    path: "images",
    parent: "root",
    children: ["vacation", "profile-pic.jpg", "screenshot.png"],
  },
  vacation: {
    name: "Vacation Photos",
    type: "folder",
    path: "images/vacation",
    parent: "images",
    children: ["beach.jpg", "mountain.jpg", "sunset.jpg"],
  },
  projects: {
    name: "Projects",
    type: "folder",
    path: "projects",
    parent: "root",
    children: ["website", "app", "project-plan.pdf"],
  },
  website: {
    name: "Website",
    type: "folder",
    path: "projects/website",
    parent: "projects",
    children: ["index.html", "styles.css", "script.js"],
  },
  app: {
    name: "Mobile App",
    type: "folder",
    path: "projects/app",
    parent: "projects",
    children: ["wireframes.pdf", "requirements.docx"],
  },
  "resume.pdf": {
    name: "Resume.pdf",
    type: "file",
    fileType: "pdf",
    size: "1.2 MB",
    modified: "May 15, 2023",
    path: "resume.pdf",
    parent: "root",
    url: "#",
  },
  "budget.xlsx": {
    name: "Budget.xlsx",
    type: "file",
    fileType: "xlsx",
    size: "856 KB",
    modified: "Jun 2, 2023",
    path: "budget.xlsx",
    parent: "root",
    url: "#",
  },
  "presentation.pptx": {
    name: "Presentation.pptx",
    type: "file",
    fileType: "pptx",
    size: "4.5 MB",
    modified: "Apr 28, 2023",
    path: "presentation.pptx",
    parent: "root",
    url: "#",
  },
  "important-doc.docx": {
    name: "Important-doc.docx",
    type: "file",
    fileType: "docx",
    size: "725 KB",
    modified: "May 10, 2023",
    path: "documents/important-doc.docx",
    parent: "documents",
    url: "#",
  },
  "notes.txt": {
    name: "Notes.txt",
    type: "file",
    fileType: "txt",
    size: "12 KB",
    modified: "Jun 15, 2023",
    path: "documents/notes.txt",
    parent: "documents",
    url: "#",
  },
  "report.pdf": {
    name: "Report.pdf",
    type: "file",
    fileType: "pdf",
    size: "2.8 MB",
    modified: "May 5, 2023",
    path: "documents/work/report.pdf",
    parent: "work",
    url: "#",
  },
  "meeting-notes.docx": {
    name: "Meeting-notes.docx",
    type: "file",
    fileType: "docx",
    size: "450 KB",
    modified: "Jun 8, 2023",
    path: "documents/work/meeting-notes.docx",
    parent: "work",
    url: "#",
  },
  "passport-scan.pdf": {
    name: "Passport-scan.pdf",
    type: "file",
    fileType: "pdf",
    size: "1.5 MB",
    modified: "Jan 12, 2023",
    path: "documents/personal/passport-scan.pdf",
    parent: "personal",
    url: "#",
  },
  "tax-2023.pdf": {
    name: "Tax-2023.pdf",
    type: "file",
    fileType: "pdf",
    size: "3.2 MB",
    modified: "Apr 15, 2023",
    path: "documents/personal/tax-2023.pdf",
    parent: "personal",
    url: "#",
  },
  "profile-pic.jpg": {
    name: "Profile-pic.jpg",
    type: "file",
    fileType: "jpg",
    size: "2.1 MB",
    modified: "Mar 20, 2023",
    path: "images/profile-pic.jpg",
    parent: "images",
    url: "#",
  },
  "screenshot.png": {
    name: "Screenshot.png",
    type: "file",
    fileType: "png",
    size: "1.8 MB",
    modified: "Jun 10, 2023",
    path: "images/screenshot.png",
    parent: "images",
    url: "#",
  },
  "beach.jpg": {
    name: "Beach.jpg",
    type: "file",
    fileType: "jpg",
    size: "3.5 MB",
    modified: "Jul 5, 2022",
    path: "images/vacation/beach.jpg",
    parent: "vacation",
    url: "#",
  },
  "mountain.jpg": {
    name: "Mountain.jpg",
    type: "file",
    fileType: "jpg",
    size: "4.2 MB",
    modified: "Jul 6, 2022",
    path: "images/vacation/mountain.jpg",
    parent: "vacation",
    url: "#",
  },
  "sunset.jpg": {
    name: "Sunset.jpg",
    type: "file",
    fileType: "jpg",
    size: "2.8 MB",
    modified: "Jul 7, 2022",
    path: "images/vacation/sunset.jpg",
    parent: "vacation",
    url: "#",
  },
  "project-plan.pdf": {
    name: "Project-plan.pdf",
    type: "file",
    fileType: "pdf",
    size: "1.7 MB",
    modified: "May 25, 2023",
    path: "projects/project-plan.pdf",
    parent: "projects",
    url: "#",
  },
  "index.html": {
    name: "Index.html",
    type: "file",
    fileType: "html",
    size: "15 KB",
    modified: "Jun 1, 2023",
    path: "projects/website/index.html",
    parent: "website",
    url: "#",
  },
  "styles.css": {
    name: "Styles.css",
    type: "file",
    fileType: "css",
    size: "8 KB",
    modified: "Jun 1, 2023",
    path: "projects/website/styles.css",
    parent: "website",
    url: "#",
  },
  "script.js": {
    name: "Script.js",
    type: "file",
    fileType: "js",
    size: "12 KB",
    modified: "Jun 1, 2023",
    path: "projects/website/script.js",
    parent: "website",
    url: "#",
  },
  "wireframes.pdf": {
    name: "Wireframes.pdf",
    type: "file",
    fileType: "pdf",
    size: "5.2 MB",
    modified: "Apr 10, 2023",
    path: "projects/app/wireframes.pdf",
    parent: "app",
    url: "#",
  },
  "requirements.docx": {
    name: "Requirements.docx",
    type: "file",
    fileType: "docx",
    size: "950 KB",
    modified: "Apr 12, 2023",
    path: "projects/app/requirements.docx",
    parent: "app",
    url: "#",
  },
}

// Helper function to get file icon based on file type
const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return <FileText className="h-10 w-10 text-red-500" />
    case "docx":
      return <FileText className="h-10 w-10 text-blue-500" />
    case "xlsx":
      return <FileText className="h-10 w-10 text-green-500" />
    case "pptx":
      return <FileText className="h-10 w-10 text-orange-500" />
    case "jpg":
    case "png":
      return <FileImage className="h-10 w-10 text-purple-500" />
    default:
      return <File className="h-10 w-10 text-gray-500" />
  }
}

export function DriveUI() {
  const [currentPath, setCurrentPath] = useState("root")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  // Get current folder data
  const currentFolder = mockData[currentPath as keyof typeof mockData]

  // Get breadcrumb path
  const getBreadcrumbs = () => {
    const paths = currentPath.split("/")
    let currentPathSegment = ""

    return paths.map((path, index) => {
      currentPathSegment = index === 0 ? path : `${currentPathSegment}/${path}`
      const segment = mockData[currentPathSegment as keyof typeof mockData]

      return {
        name: segment?.name || path,
        path: currentPathSegment,
      }
    })
  }

  // Get children of current folder
  const getChildren = () => {
    if (!currentFolder || !currentFolder.children) return []

    return currentFolder.children.map((childId) => {
      const childPath = currentFolder.path === "root" ? childId : `${currentFolder.path}/${childId}`

      return mockData[childPath as keyof typeof mockData]
    })
  }

  // Handle folder click
  const handleFolderClick = (path: string) => {
    setCurrentPath(path)
  }

  // Handle navigation to parent folder
  const navigateToParent = () => {
    if (currentFolder && currentFolder.parent) {
      setCurrentPath(currentFolder.parent)
    }
  }

  // Handle file upload (mock)
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    setUploadDialogOpen(false)
    // In a real app, this would handle the file upload
  }

  const children = getChildren()
  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <Folder className="h-6 w-6 text-blue-500" />
            <span className="text-xl">Drive</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative w-64">
              <Input placeholder="Search in Drive" className="pl-8 rounded-full" />
              <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/40 p-4">
          <div className="mb-8">
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full gap-2 rounded-full">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload files</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4 pt-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                    <Input type="file" className="mt-2" multiple />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Upload</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <nav className="space-y-1">
            <Button
              variant={currentPath === "root" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPath("root")}
            >
              <Home className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Share2 className="h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Star className="h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
          </nav>

          <Separator className="my-4" />

          <div className="space-y-1">
            <h3 className="px-2 text-sm font-medium">Storage</h3>
            <div className="px-2 py-1">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>7.5 GB of 15 GB used</span>
                <span>50%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Breadcrumb and actions */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    <Button variant="ghost" size="sm" onClick={() => setCurrentPath(crumb.path)} className="h-8">
                      {crumb.name}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        className={viewMode === "grid" ? "bg-muted" : ""}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Grid view</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className={viewMode === "list" ? "bg-muted" : ""}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>List view</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Details</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="files" className="mb-4">
              <TabsList>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Files and folders */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {children.map((item, index) => (
                  <div key={index} className="group relative">
                    {item.type === "folder" ? (
                      <div
                        className="flex flex-col items-center p-4 rounded-lg border bg-card transition-colors hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleFolderClick(item.path)}
                      >
                        <Folder className="h-10 w-10 text-blue-500 mb-2" />
                        <div className="text-center">
                          <div className="font-medium truncate max-w-[120px]">{item.name}</div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.url}
                        className="flex flex-col items-center p-4 rounded-lg border bg-card transition-colors hover:bg-muted/50"
                      >
                        {getFileIcon(item.fileType)}
                        <div className="text-center mt-2">
                          <div className="font-medium truncate max-w-[120px]">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.size}</div>
                        </div>
                      </Link>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-3 font-medium text-muted-foreground">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2">Owner</div>
                  <div className="col-span-2">Last modified</div>
                  <div className="col-span-1">Size</div>
                  <div className="col-span-1"></div>
                </div>

                {children.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center border-t p-3 hover:bg-muted/50">
                    <div className="col-span-6 flex items-center gap-3">
                      {item.type === "folder" ? (
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => handleFolderClick(item.path)}
                        >
                          <Folder className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      ) : (
                        <Link href={item.url} className="flex items-center gap-3">
                          {getFileIcon(item.fileType)}
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">ME</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Me</span>
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {item.type === "file" ? item.modified : "—"}
                    </div>
                    <div className="col-span-1 text-sm text-muted-foreground">
                      {item.type === "file" ? item.size : "—"}
                    </div>
                    <div className="col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Details sidebar (hidden on smaller screens) */}
        <aside className="hidden w-64 border-l p-4 lg:block">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Details</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Users className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Storage</h4>
              <div className="text-sm text-muted-foreground">7.5 GB of 15 GB used</div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Quick access</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">Resume.pdf</span>
                    <span className="text-xs text-muted-foreground">Opened yesterday</span>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">Budget.xlsx</span>
                    <span className="text-xs text-muted-foreground">Opened 2 days ago</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

