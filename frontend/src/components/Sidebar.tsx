import {
    FileText, Star, Archive, Trash2, X
} from 'lucide-react';
import { tags, folders } from '../data';

interface SidebarProps {
    activeSection: string;
    onSelectSection: (section: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ activeSection, onSelectSection, isOpen, onClose }: SidebarProps) {
    const quickLinks = [
        { name: 'All Notes', icon: FileText, count: 128, id: 'all' },
        { name: 'Favorites', icon: Star, count: 24, id: 'favorites' },
        { name: 'Archived', icon: Archive, count: 12, id: 'archived' },
        { name: 'Recently Deleted', icon: Trash2, count: 5, id: 'deleted' },
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
        w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col flex-shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                {/* User Profile */}
                <div className="p-4 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                            AE
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">Adeeko Emmanuel</h3>
                            <p className="text-xs text-gray-500 truncate">adeeko@example.com</p>
                        </div>
                    </div>
                    {/* Close Button (Mobile) */}
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:bg-gray-100 p-1 rounded-md">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-8">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Quick Links</h4>
                        <div className="space-y-1">
                            {quickLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleSelect(link.id)}
                                    className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors ${activeSection === link.id
                                            ? 'bg-orange-50 text-orange-600 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon size={18} />
                                        <span>{link.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{link.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Tags</h4>
                        <div className="space-y-1">
                            {tags.map((tag) => (
                                <button
                                    key={tag.name}
                                    onClick={() => handleSelect(tag.name)}
                                    className={`w-full flex items-center gap-3 px-2 py-2 text-sm rounded-lg transition-colors ${activeSection === tag.name
                                            ? 'bg-orange-50 text-orange-600 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{tag.icon}</span>
                                    <span className="truncate">{tag.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Folders */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Folders</h4>
                        <div className="space-y-1">
                            {folders.map((folder) => (
                                <button
                                    key={folder.name}
                                    onClick={() => handleSelect(folder.name)}
                                    className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors border-l-2 ${activeSection === folder.name
                                            ? 'border-orange-400 bg-orange-50 text-gray-900'
                                            : 'border-transparent text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 pl-1">
                                        <span className="text-lg">📁</span>
                                        <span>{folder.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{folder.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
