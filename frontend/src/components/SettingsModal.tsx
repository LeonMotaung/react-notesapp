import { X, Moon, Sun, Monitor, User, Mail, MapPin } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export default function SettingsModal({ isOpen, onClose, theme, setTheme }: SettingsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">

                    {/* Profile Section */}
                    <section>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Leon Motaung</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Mail size={16} className="text-gray-400" />
                                    <span>motaungleon@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>Cape Town, South Africa</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Theme Section */}
                    <section>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Appearance</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setTheme('light')}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'light'
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Sun size={24} />
                                <span className="text-xs font-medium">Light</span>
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'dark'
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Moon size={24} />
                                <span className="text-xs font-medium">Dark</span>
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'system'
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Monitor size={24} />
                                <span className="text-xs font-medium">System</span>
                            </button>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-400">Leee Notes v1.0.0</p>
                </div>
            </div>
        </div>
    );
}
