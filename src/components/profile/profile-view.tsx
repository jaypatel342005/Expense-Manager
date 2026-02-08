'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Mail, Phone, User as UserIcon, Calendar, Briefcase, Hash, ShieldCheck, CheckCircle2, MapPin } from "lucide-react"
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

  // Merge data for display
  const displayName = person?.PeopleName || user.UserName
  const displayMobile = person?.MobileNo || user.MobileNo
  const displayDescription = person?.Description || "No bio provided yet."
  const displayImage = user.ProfileImage

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 p-1 space-y-6">
      
      {/* Header Section */}
      <div className={cn(
            "group relative overflow-hidden transition-all duration-300 rounded-xl border",
            "bg-gradient-to-br from-slate-100/50 via-white to-white dark:from-slate-800/20 dark:via-slate-950 dark:to-slate-950"
        )}>
          {/* Decorative accents */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
          <div className="absolute -right-10 -top-10 opacity-5 dark:opacity-5 pointer-events-none">
                <UserIcon className="h-64 w-64 text-slate-500 dark:text-slate-400" />
          </div>
          
          <div className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="relative group/avatar shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-20 blur-md group-hover/avatar:opacity-40 transition-opacity"></div>
                      <Avatar className="h-28 w-28 border-4 border-white dark:border-slate-950 shadow-xl relative z-10">
                          <AvatarImage src={displayImage} alt={displayName} className="object-cover" />
                          <AvatarFallback className="text-3xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                              {displayName?.slice(0, 2).toUpperCase() || 'CN'}
                          </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-950 z-20 shadow-sm" title="Online"></div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-3 min-w-0 flex flex-col justify-center">
                      <div>
                          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground truncate leading-tight">{displayName}</h1>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2.5">
                            <Badge variant="secondary" className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-medium rounded-full">
                                <UserIcon className="w-3 h-3 mr-1.5 opacity-70" />
                                @{user.UserName}
                            </Badge>
                            <Badge variant="outline" className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/30 font-medium rounded-full">
                                <ShieldCheck className="w-3 h-3 mr-1.5" />
                                {user.Role}
                            </Badge>
                          </div>
                      </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="shadow-sm font-medium bg-white dark:bg-slate-900 text-foreground border hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
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

      <div className="grid gap-6 md:grid-cols-2 items-start">
        {/* Contact Details Card */}
        <Card className={cn(
            "group relative overflow-hidden transition-all duration-300 py-0 gap-0 h-full flex flex-col",
            "hover:shadow-xl hover:-translate-y-1 border",
            "bg-gradient-to-br from-indigo-50/50 via-white to-white dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950"
        )}>
             <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                <Mail className="h-40 w-40 text-indigo-500 dark:text-indigo-400" />
            </div>

            <div className="flex items-center justify-between px-4 pt-3 pb-0 relative z-20">
                 <Badge 
                    variant="secondary" 
                    className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full border shadow-sm bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900/30"
                >
                    Contact Info
                </Badge>
            </div>

            <CardContent className="pt-3 pb-6 px-6 relative z-10 flex-1 flex flex-col justify-center">
                 <div className="grid grid-cols-2 gap-3 text-xs w-full">
                    <div className="p-3 rounded-lg border bg-background/50 backdrop-blur-sm shadow-sm group/item hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                        <p className="text-muted-foreground mb-1.5 font-medium text-[9px] uppercase tracking-wider flex items-center gap-1.5">
                            <Mail className="h-3 w-3 opacity-70" />
                            Email Address
                        </p>
                        <div className="font-semibold text-foreground truncate text-sm" title={user.EmailAddress}>
                             {user.EmailAddress}
                        </div>
                    </div>
                    <div className="p-3 rounded-lg border bg-background/50 backdrop-blur-sm shadow-sm group/item hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                        <p className="text-muted-foreground mb-1.5 font-medium text-[9px] uppercase tracking-wider flex items-center gap-1.5">
                            <Phone className="h-3 w-3 opacity-70" />
                            Mobile Number
                        </p>
                        <div className="font-semibold text-foreground text-sm">
                            {displayMobile || "Not provided"}
                        </div>
                    </div>
                 </div>
            </CardContent>
        </Card>

        {/* Account Details Card */}
        <Card className={cn(
            "group relative overflow-hidden transition-all duration-300 py-0 gap-0 h-full flex flex-col",
            "hover:shadow-xl hover:-translate-y-1 border",
            "bg-gradient-to-br from-purple-50/50 via-white to-white dark:from-purple-900/20 dark:via-slate-950 dark:to-slate-950"
        )}>
             <div className="absolute -left-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                <Briefcase className="h-40 w-40 text-purple-500 dark:text-purple-400" />
            </div>

            <div className="flex items-center justify-between px-4 pt-3 pb-0 relative z-20">
                 <Badge 
                    variant="secondary" 
                    className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full border shadow-sm bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900/30"
                >
                    Account Info
                </Badge>
            </div>

            <CardContent className="pt-3 pb-6 px-6 relative z-10 flex-1 flex flex-col justify-center">
                 <div className="grid grid-cols-2 gap-3 text-xs w-full">
                    <div className="p-3 rounded-lg border bg-background/50 backdrop-blur-sm shadow-sm group/item hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                        <p className="text-muted-foreground mb-1.5 font-medium text-[9px] uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 opacity-70" />
                            Joined
                        </p>
                        <div className="font-semibold text-foreground text-sm">
                             {new Date(user.Created).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </div>
                    </div>
                    <div className="p-3 rounded-lg border bg-background/50 backdrop-blur-sm shadow-sm group/item hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                        <p className="text-muted-foreground mb-1.5 font-medium text-[9px] uppercase tracking-wider flex items-center gap-1.5">
                            <Briefcase className="h-3 w-3 opacity-70" />
                            Emp Code
                        </p>
                        <div className="font-semibold text-foreground text-sm">
                            {person?.PeopleCode || "N/A"}
                        </div>
                    </div>
                 </div>
            </CardContent>
        </Card>
      </div>

       {/* About Section */}
       <Card className={cn(
            "group relative overflow-hidden transition-all duration-300 py-0 gap-0",
            "hover:shadow-xl hover:-translate-y-1 border",
            "bg-gradient-to-br from-slate-100/50 via-white to-white dark:from-slate-800/20 dark:via-slate-950 dark:to-slate-950"
        )}>
             <div className="absolute right-0 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                <UserIcon className="h-40 w-40 text-slate-500 dark:text-slate-400" />
            </div>

            <div className="flex items-center justify-between px-4 pt-3 pb-0 relative z-20">
                 <Badge 
                    variant="secondary" 
                    className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full border shadow-sm bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800"
                >
                    Bio / About
                </Badge>
            </div>

            <CardContent className="pt-3 pb-6 px-6 relative z-10">
                 <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800 min-h-[4.5rem]">
                    <p className="text-sm text-muted-foreground leading-relaxed break-words">
                        {displayDescription}
                    </p>
                 </div>
            </CardContent>
        </Card>
    </div>
  )
}
