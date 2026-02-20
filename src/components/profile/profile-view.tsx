"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Mail,
  Phone,
  User as UserIcon,
  Calendar,
  Briefcase,
  ShieldCheck,
  MapPin,
  Hash,
  Clock,
  CheckCircle2,
  XCircle,
  Fingerprint,
  AtSign,
} from "lucide-react";
import { ProfileEditForm } from "./profile-edit-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileViewProps {
  user: any;
  person: any;
}

export function ProfileView({ user, person }: ProfileViewProps) {
  const [open, setOpen] = useState(false);

  // Merge and format data for display
  const displayName = person?.PeopleName || user.UserName;
  const displayMobile = person?.MobileNo || user.MobileNo;
  const displayDescription = person?.Description || "No bio provided yet.";
  const displayImage = user.ProfileImage;
  const isActive = person?.IsActive !== false; // Default to true if null or undefined, only false if explicitly false
  const empCode = person?.PeopleCode || "N/A";

  // Format dates
  const createdDate = new Date(user.Created).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
  const modifiedDate = new Date(user.Modified).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });

  // Determine emails
  const loginEmail = user.EmailAddress;
  const contactEmail =
    person?.Email && person.Email !== loginEmail ? person.Email : null;

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Hero / Header Section */}
      <div className="relative group rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm dark:shadow-xl dark:shadow-black/40 dark:border-white/10 dark:bg-card/95 transition-all duration-300">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 h-32 bg-primary/10 dark:bg-primary/15 opacity-100">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 dark:opacity-20 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20"></div>
             <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-card to-transparent dark:from-card/95"></div>
          </div>
          
          <div className="relative px-6 pb-6 pt-16 md:pt-20">
              <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0 group/avatar">
                      <div className="absolute -inset-2 bg-primary/20 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover/avatar:opacity-100 dark:bg-primary/30"></div>
                      <Avatar className="h-32 w-32 border-4 border-card dark:border-card/95 shadow-md dark:shadow-primary/10 relative z-10 transition-transform duration-300 group-hover/avatar:scale-105">
                          <AvatarImage src={displayImage} alt={displayName} className="object-cover" />
                          <AvatarFallback className="text-4xl font-bold bg-muted text-muted-foreground group-hover:text-primary transition-colors duration-300">
                              {displayName?.slice(0, 2).toUpperCase() || 'CN'}
                          </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                          "absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-card z-20 shadow-sm flex items-center justify-center transition-transform hover:scale-110",
                          isActive ? "bg-primary" : "bg-muted-foreground"
                      )} title={isActive ? "Active" : "Inactive"}>
                        {isActive && <CheckCircle2 className="w-3 h-3 text-primary-foreground" strokeWidth={4} />}
                      </div>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 mb-2 md:mb-0 space-y-2 text-center md:text-left">
                      <div>
                          <h1 className="text-3xl font-bold tracking-tight">{displayName}</h1>
                          <div className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                              <span className="text-sm">@{user.UserName}</span>
                              {user.Role === 'ADMIN' && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
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
                          <Button size="lg" className="shadow-sm font-medium transition-all dark:hover:shadow-primary/25 dark:border dark:border-white/10">
                             <Edit className="mr-2 h-4 w-4" />
                             Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto dark:border-white/10 dark:bg-card/95 backdrop-blur-xl">
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
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-card/50 dark:backdrop-blur-sm dark:border-white/10 dark:hover:border-primary/30">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                   <CardTitle className="text-lg flex items-center gap-2">
                       <div className="p-2 bg-primary/10 rounded-md text-primary dark:bg-primary/20 dark:text-primary-foreground">
                           <Mail className="h-5 w-5" />
                       </div>
                       Contact Details
                   </CardTitle>
                </div>
            </CardHeader>
          <CardContent className="space-y-4 pt-4 text-sm">
            <div className="space-y-1 group">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                <AtSign className="h-3 w-3" /> Login Email
              </p>
              <p className="font-semibold truncate dark:text-white" title={loginEmail}>
                {loginEmail}
              </p>
            </div>

            {contactEmail && (
              <div className="space-y-1 group pt-3 border-t border-dashed dark:border-white/10">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                  <Mail className="h-3 w-3" /> Contact Email
                </p>
                <p className="font-semibold truncate dark:text-white" title={contactEmail}>
                  {contactEmail}
                </p>
              </div>
            )}

            <div className="space-y-1 group pt-3 border-t border-dashed dark:border-white/10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                <Phone className="h-3 w-3" /> Mobile Number
              </p>
              <p className="font-semibold truncate dark:text-white">
                {displayMobile || "Not provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-card/50 dark:backdrop-blur-sm dark:border-white/10 dark:hover:border-primary/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md text-primary dark:bg-primary/20 dark:text-primary-foreground">
                        <Fingerprint className="h-5 w-5" />
                    </div>
                    System Info
                </CardTitle>
            </CardHeader>
          <CardContent className="space-y-4 pt-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                  <Hash className="h-3 w-3" /> User ID
                </p>
                <p className="font-mono font-semibold dark:text-white">
                  #{user.UserID}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                  <Briefcase className="h-3 w-3" /> Emp Code
                </p>
                <p className="font-mono font-semibold dark:text-white">
                  {empCode}
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-3 border-t border-dashed dark:border-white/10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                <Calendar className="h-3 w-3" /> Joined Date
              </p>
              <p className="font-semibold dark:text-white">{createdDate}</p>
            </div>

            <div className="space-y-1 pt-3 border-t border-dashed dark:border-white/10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 dark:text-muted-foreground/80">
                <Clock className="h-3 w-3" /> Last Updated
              </p>
              <p className="font-semibold dark:text-white">{modifiedDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Status & Bio */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 lg:col-span-1 md:col-span-2 dark:bg-card/50 dark:backdrop-blur-sm dark:border-white/10 dark:hover:border-primary/30">
             <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md text-primary dark:bg-primary/20 dark:text-primary-foreground">
                        <UserIcon className="h-5 w-5" />
                    </div>
                    About & Status
                </CardTitle>
            </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider dark:text-muted-foreground/80">
                Account Status
              </p>
              <Badge
                     variant={isActive ? "default" : "destructive"} className={cn(
                         isActive ? "bg-primary text-primary-foreground dark:shadow-md dark:shadow-primary/20 dark:border-primary/50" : "dark:border-red-500/50"
                     )}>
                {isActive ? "Active Account" : "Inactive Account"}
              </Badge>
            </div>

            <div className="pt-3 border-t border-dashed dark:border-white/10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 dark:text-muted-foreground/80">
                Bio / Description
              </p>
              <div className="bg-muted/50 dark:bg-muted/20 dark:border dark:border-white/5 rounded-md p-4 text-sm text-foreground/90 dark:text-white/90 min-h-[5rem] italic text-pretty">
                "{displayDescription}"
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
