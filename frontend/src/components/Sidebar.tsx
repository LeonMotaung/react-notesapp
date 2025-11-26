import {
    FileText, Star, Archive, Trash2, X
} from 'lucide-react';
import { categories } from '../data';

interface SidebarProps {
    activeSection: string;
    onSelectSection: (section: string) => void;
    isOpen: boolean;
    onClose: () => void;
    counts: {
        all: number;
        favorites: number;
        archived: number;
        deleted: number;
    };
}

export default function Sidebar({ activeSection, onSelectSection, isOpen, onClose, counts }: SidebarProps) {
    const quickLinks = [
        { name: 'All Notes', icon: FileText, count: counts?.all || 0, id: 'all' },
        { name: 'Favorites', icon: Star, count: counts?.favorites || 0, id: 'favorites' },
        { name: 'Archived', icon: Archive, count: counts?.archived || 0, id: 'archived' },
        { name: 'Recently Deleted', icon: Trash2, count: counts?.deleted || 0, id: 'deleted' },
    ];

    const handleSelect = (id: string) => {
        onSelectSection(id);
        onClose();
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Content */}
            <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col flex-shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}>
                {/* User Profile */}
                <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm">
                            LM
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">Leon Motaung</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">motaungleon@gmail.com</p>
                        </div>
                    </div>
                    {/* Close Button (Mobile) */}
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-8">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">Quick Links</h4>
                        <div className="space-y-1">
                            {quickLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleSelect(link.id)}
                                    className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors ${activeSection === link.id
                                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon size={18} />
                                        <span>{link.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">{link.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">Categories</h4>
                        <div className="space-y-1">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleSelect(category.name)}
                                    className={`w-full flex items-center gap-3 px-2 py-2 text-sm rounded-lg transition-colors ${activeSection === category.name
                                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <span>{category.icon}</span>
                                    <span className="truncate">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
