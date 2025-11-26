import { useState, useEffect } from 'react';
import { Calendar, Tag, Save, Star, Archive, Trash2 } from 'lucide-react';
import type { Note } from '../data';

interface NoteDetailProps {
    note: Note | null;
    onUpdateNote: (id: string, updates: Partial<Note>) => void;
    onDeleteNote?: (id: string) => void;
}

export default function NoteDetail({ note, onUpdateNote, onDeleteNote }: NoteDetailProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    if (!note) {
        return (
            <div className="flex-1 h-full flex items-center justify-center bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500">
                <div className="text-center">
                    <p className="text-lg font-medium">Select a note to view</p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        onUpdateNote(note.id, {
            title,
            content,
            preview: content.slice(0, 100).replace(/[#*`]/g, '') + '...',
        });
    };

    const toggleFavorite = () => {
        onUpdateNote(note.id, { isFavorite: !note.isFavorite });
    };

    const toggleArchive = () => {
        onUpdateNote(note.id, { isArchived: !note.isArchived });
    };

    const handleDelete = () => {
        if (onDeleteNote) {
            onDeleteNote(note.id);
        }
    };

    return (
        <div className="flex-1 h-full bg-white dark:bg-gray-900 flex flex-col transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
                <div className="flex-1 mr-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-3xl font-bold text-gray-900 dark:text-white bg-transparent w-full border-none focus:ring-0 placeholder-gray-300 dark:placeholder-gray-600"
                        placeholder="Note Title"
                    />

                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-4">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{note.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={14} />
                            <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-md text-xs font-medium">
                                {note.tag}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleFavorite}
                        className={`p-2 rounded-lg transition-colors ${note.isFavorite ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        title="Toggle Favorite"
                    >
                        <Star size={18} fill={note.isFavorite ? "currentColor" : "none"} />
                    </button>

                    <button
                        onClick={toggleArchive}
                        className={`p-2 rounded-lg transition-colors ${note.isArchived ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        title="Toggle Archive"
                    >
                        <Archive size={18} />
                    </button>

                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Note"
                    >
                        <Trash2 size={18} />
                    </button>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors ml-2"
                    >
                        <Save size={18} />
                        <span>Save</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full resize-none border-none focus:ring-0 text-gray-700 dark:text-gray-300 bg-transparent leading-relaxed text-lg font-mono placeholder-gray-300 dark:placeholder-gray-600"
                    placeholder="Start writing..."
                />
            </div>
        </div>
    );
}
