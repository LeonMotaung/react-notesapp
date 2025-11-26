import { Feather, Search, Plus, Link, Bell, Settings, Menu, ArrowLeft } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onToggleSidebar: () => void;
    onBack?: () => void;
    showBackButton?: boolean;
    onAddNote: () => void;
    onOpenSettings: () => void;
}

export default function Header({
    searchQuery,
    setSearchQuery,
    onToggleSidebar,
    onBack,
    showBackButton,
    onAddNote,
    onOpenSettings
}: HeaderProps) {
    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 flex-shrink-0 z-20 relative transition-colors duration-200">
            {/* Left: Logo & Mobile Controls */}
            <div className="flex items-center gap-2 w-auto md:w-64">
                {/* Mobile Menu Button */}
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                    <Menu size={24} />
                </button>

                {/* Mobile Back Button */}
                {showBackButton && (
                    <button
                        onClick={onBack}
                        className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-2"
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}

                {/* Logo */}
                <div className={`flex items-center gap-2 ${showBackButton ? 'hidden sm:flex' : 'flex'}`}>
                    <div className="bg-orange-500 p-1.5 rounded-lg text-white">
                        <Feather size={20} />
                    </div>
                    <span className="font-bold text-lg text-gray-800 dark:text-white tracking-tight hidden sm:block">Leee Notes</span>
                </div>

                <button
                    onClick={onOpenSettings}
                    className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hidden md:block"
                >
                    <Settings size={18} />
                </button>
            </div>

            {/* Center: Search & Add */}
            <div className="flex-1 max-w-2xl px-2 md:px-8 flex items-center gap-2 md:gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900 focus:border-orange-300 dark:focus:border-orange-700 transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400"
                    />
                </div>
                <button
                    onClick={onAddNote}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg shadow-sm shadow-orange-200 dark:shadow-none transition-colors flex-shrink-0"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 w-auto md:w-64 justify-end">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden md:block">
                    <Link size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative hidden md:block">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                </button>
                {/* Mobile Settings */}
                <button
                    onClick={onOpenSettings}
                    className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                    <Settings size={20} />
                </button>
            </div>
        </header>
    );
}
