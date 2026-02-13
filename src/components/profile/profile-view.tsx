'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Edit, Mail, Phone, User as UserIcon, Calendar, Briefcase, 
  ShieldCheck, MapPin, Hash, Clock, CheckCircle2, XCircle,
  Fingerprint, AtSign
} from "lucide-react"
import { ProfileEditForm } from "./profile-edit-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProfileViewProps {
  user: any
  person: any
}

export function ProfileView({ user, person }: ProfileViewProps) {
  const [open, setOpen] = useState(false)

  // Merge and format data for display
  const displayName = person?.PeopleName || user.UserName
  const displayMobile = person?.MobileNo || user.MobileNo
  const displayDescription = person?.Description || "No bio provided yet."
  const displayImage = user.ProfileImage
  const isActive = person?.IsActive !== false // Default to true if null or undefined, only false if explicitly false
  const empCode = person?.PeopleCode || "N/A"
  
  // Format dates
  const createdDate = new Date(user.Created).toLocaleDateString(undefined, { dateStyle: 'medium' })
  const modifiedDate = new Date(user.Modified).toLocaleDateString(undefined, { dateStyle: 'medium' })

  // Determine emails
  const loginEmail = user.EmailAddress
  const contactEmail = person?.Email && person.Email !== loginEmail ? person.Email : null

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Hero / Header Section */}
      <div className="relative group rounded-xl border bg-background overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 h-32 bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-500/10 dark:via-amber-500/10 dark:to-yellow-500/10 opacity-100">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
             <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          <div className="relative px-6 pb-6 pt-16 md:pt-20">
              <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                      <div className="absolute -inset-1 bg-white dark:bg-slate-950 rounded-full opacity-50"></div>
                      <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-950 shadow-xl relative z-10">
                          <AvatarImage src={displayImage} alt={displayName} className="object-cover" />
                          <AvatarFallback className="text-4xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                              {displayName?.slice(0, 2).toUpperCase() || 'CN'}
                          </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                          "absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-white dark:border-slate-950 z-20 shadow-sm flex items-center justify-center",
                          isActive ? "bg-emerald-500" : "bg-slate-400"
                      )} title={isActive ? "Active" : "Inactive"}>
                        {isActive && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={4} />}
                      </div>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 mb-2 md:mb-0 space-y-2 text-center md:text-left">
                      <div>
                          <h1 className="text-3xl font-bold text-foreground">{displayName}</h1>
                          <div className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                              @{user.UserName}
                              {user.Role === 'ADMIN' && (
                                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                                  <ShieldCheck className="w-3 h-3 mr-1" /> Admin
                                </Badge>
                              )}
                          </div>
                      </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 mb-4 md:mb-0">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button size="lg" className="shadow-sm font-medium transition-all">
                             <Edit className="mr-2 h-4 w-4" />
                             Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                              Update your personal information and profile settings.
                            </DialogDescription>
                          </DialogHeader>
                          <ProfileEditForm 
                              user={user} 
                              person={person} 
                              onSuccess={() => setOpen(false)} 
                          />
                        </DialogContent>
                      </Dialog>
                  </div>
              </div>
          </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Contact Information */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-blue-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                        <Mail className="h-5 w-5" />
                    </div>
                    Contact Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <div className="space-y-1 group">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <AtSign className="h-3 w-3" /> Login Email
                    </p>
                    <p className="text-sm font-semibold truncate" title={loginEmail}>{loginEmail}</p>
                </div>
                
                {contactEmail && (
                    <div className="space-y-1 group pt-2 border-t border-dashed">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Mail className="h-3 w-3" /> Contact Email
                        </p>
                        <p className="text-sm font-semibold truncate" title={contactEmail}>{contactEmail}</p>
                    </div>
                )}

                <div className="space-y-1 group pt-2 border-t border-dashed">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="h-3 w-3" /> Mobile Number
                    </p>
                    <p className="text-sm font-semibold truncate">{displayMobile || "Not provided"}</p>
                </div>
            </CardContent>
        </Card>

        {/* System Information */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-purple-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                        <Fingerprint className="h-5 w-5" />
                    </div>
                    System Info
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Hash className="h-3 w-3" /> User ID
                        </p>
                        <p className="text-sm font-mono font-semibold">#{user.UserID}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Briefcase className="h-3 w-3" /> Emp Code
                        </p>
                        <p className="text-sm font-mono font-semibold">{empCode}</p>
                    </div>
                 </div>

                 <div className="space-y-1 pt-2 border-t border-dashed">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Joined Date
                    </p>
                    <p className="text-sm font-semibold">{createdDate}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-dashed">
                     <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> Last Updated
                    </p>
                    <p className="text-sm font-semibold">{modifiedDate}</p>
                </div>
            </CardContent>
        </Card>
        
        {/* Status & Bio */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-emerald-500 lg:col-span-1 md:col-span-2">
             <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <UserIcon className="h-5 w-5" />
                    </div>
                    About & Status
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                     <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account Status</p>
                     <Badge variant={isActive ? "default" : "destructive"} className={cn(
                         isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""
                     )}>
                         {isActive ? "Active Account" : "Inactive Account"}
                     </Badge>
                </div>

                <div className="pt-2 border-t border-dashed">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Bio / Description</p>
                    <div className="bg-muted/50 rounded-md p-3 text-sm text-foreground/80 min-h-[5rem] italic text-pretty">
                        "{displayDescription}"
                    </div>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  )
}
