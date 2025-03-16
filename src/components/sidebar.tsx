"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const sidebarVariants = cva("relative flex flex-col h-full w-full transition-all duration-200 ease-in-out", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted",
    },
    size: {
      default: "w-64",
      sm: "w-48",
      lg: "w-80",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(sidebarVariants({ variant, size, className }))} {...props} />
))
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col flex-1 overflow-auto", className)} {...props} />
  ),
)
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("py-2", className)} {...props} />,
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-3 py-1 text-sm font-medium text-muted-foreground", className)} {...props} />
  ),
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between", className)} {...props} />
  ),
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    data-active={isActive}
    className={cn(
      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      isActive && "bg-accent text-accent-foreground",
      className,
    )}
    {...props}
  />
))
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSub = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pl-6 space-y-1", className)} {...props} />,
)
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs font-medium text-muted-foreground", className)} {...props} />
  ),
)
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-transparent hover:bg-muted-foreground/30",
        className,
      )}
      {...props}
    />
  ),
)
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-1 flex-col overflow-hidden", className)} {...props} />
  ),
)
SidebarInset.displayName = "SidebarInset"

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={cn("relative flex h-full transition-all duration-300 ease-in-out", collapsed ? "w-16" : "w-64")}>
        {children}
      </div>
    </div>
  )
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  ),
)
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
}

