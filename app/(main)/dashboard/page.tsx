export default function Dashboard() {
  return (
    <div className="p-6 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 space-y-6 h-screen" style={{ borderTopLeftRadius: '3rem' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome back!</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Quick Stats */}
        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-medium text-gray-500 dark:text-gray-400">Total Items</h3>
          <p className="text-2xl font-bold mt-2">24</p>
        </div>
        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-medium text-gray-500 dark:text-gray-400">Categories</h3>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>
        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-medium text-gray-500 dark:text-gray-400">Total Value</h3>
          <p className="text-2xl font-bold mt-2">$2,450</p>
        </div>
        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-medium text-gray-500 dark:text-gray-400">Setups</h3>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-b dark:border-neutral-700 pb-4">
              <p className="text-gray-600 dark:text-gray-300">Added new keyboard to Setup #1</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <div className="border-b dark:border-neutral-700 pb-4">
              <p className="text-gray-600 dark:text-gray-300">Updated monitor settings</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-white dark:bg-neutral-800 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700">
              <p className="font-medium">Add Item</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track new equipment</p>
            </button>
            <button className="p-4 bg-white dark:bg-neutral-800 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700">
              <p className="font-medium">Create Setup</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Design new workspace</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 