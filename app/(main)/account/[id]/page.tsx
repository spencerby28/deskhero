"use client";

import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import { IconUserCircle, IconLock } from "@tabler/icons-react";
import { useUser } from "@/contexts/UserContext";
import { updateProfileAction, updateAvatarAction } from "@/components/auth/actions";
import { useSearchParams, useRouter } from "next/navigation";
import Avatar from "@/components/avatar";
import { createClient } from '@/utils/supabase/client';
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function AccountPage() {
  const { user, revalidate } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [bio, setBio] = useState(user?.user_metadata?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatarUrl || null);
  const supabase = createClient();

  useEffect(() => {
    if (success) {
      revalidate();
      
      const timer = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        params.delete("success");
        const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
        router.replace(newUrl);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, router, revalidate]);

  useEffect(() => {
    setName(user?.user_metadata?.name || "");
    setBio(user?.user_metadata?.bio || "");
    setAvatarUrl(user?.user_metadata?.avatarUrl || null);
  }, [user]);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div
      className="p-6 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 space-y-6 h-screen relative"
      style={{ borderTopLeftRadius: "3rem" }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Account Settings</h1>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "profile"
              ? "bg-gray-50 dark:bg-neutral-800"
              : "hover:bg-gray-50 dark:hover:bg-neutral-800"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "password"
              ? "bg-gray-50 dark:bg-neutral-800"
              : "hover:bg-gray-50 dark:hover:bg-neutral-800"
          }`}
        >
          Password
        </button>
      </div>

      <div className="flex justify-center">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 max-w-[800px] w-full"
        >
          {activeTab === "profile" && (
            <form
              action={(formData) => {
                startTransition(() => {
                  updateProfileAction(formData);
                });
              }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <Avatar
                  uid={user?.id || ""}
                  showUpload={true}
                  url={avatarUrl}
                  size={96}
                  onUpload={(url) => {
                    const fullUrl = `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${url}`;
                    setAvatarUrl(fullUrl);
                    startTransition(() => {
                      const formData = new FormData();
                      formData.append("avatarUrl", fullUrl);
                      updateAvatarAction(formData);
                    });
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-not-allowed opacity-60"
                    value={user?.email || ""}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <motion.button
                  type="button"
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-brand-theme hover:bg-brand-theme/90 text-white rounded-lg transition-colors"
                >
                  Sign Out
                </motion.button>
              </div>
            </form>
          )}

          {activeTab === "password" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <IconLock className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                <div>
                  <h2 className="font-medium">Password Settings</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your password
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className={`mt-4 p-4 rounded-lg bg-green-100 text-green-700 w-1/3`}>
              {success}
            </div>
          )}
          {error && (
            <div className={`mt-4 p-4 rounded-lg bg-red-100 text-red-700 w-1/3`}>
              {error}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
