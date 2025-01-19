"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconLayoutDashboard,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/components/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import logo from "@/public/logo.png";
import { User } from '@supabase/supabase-js';
import Avatar from './avatar';

type Props = {
  user: User;
};

export default function DashboardSidebar({ user }: Props) {
  // Remove console.log since we have proper typing now

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={cn(
        "flex h-full bg-gray-100 dark:bg-background overflow-hidden transition-[width] duration-300 ease-in-out",
        open ? "w-48" : "w-16"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col justify-between gap-4">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className={cn("flex", !open && "justify-center")}>
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="mt-8 flex flex-col gap-2 px-1">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="px-1">
                <ThemeSwitcher />
              </div>

              <Profile user={user} />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </nav>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-1 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="w-12 h-12 relative flex-shrink-0">
        <Image src={logo} alt="Logo" fill className="object-contain" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-black dark:text-white whitespace-pre"
      >
        Desk Hero
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="w-12 h-12 relative flex-shrink-0">
        <Image src={logo} alt="Logo" fill className="object-contain" />
      </div>
    </Link>
  );
};

export const Profile = ({ user }: Props) => {
  const name = user.user_metadata?.name || user.email?.charAt(0) || 'U';
  
  return (
    <SidebarLink
      link={{
        label: user.user_metadata?.name || user.email || 'User',
        href: `/account/${user.id}`,
        icon: (
          <div className="flex-shrink-0 w-8 h-8">
            {user.user_metadata?.avatarUrl ? (
              <div className="relative w-full h-full">
                <Avatar
                  uid={user.id}
                  url={user.user_metadata.avatarUrl}
                  size={32}
                  onUpload={() => {}}
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ),
      }}
    />
  );
};
