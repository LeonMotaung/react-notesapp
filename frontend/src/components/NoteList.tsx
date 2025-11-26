import { MoreHorizontal, ChevronDown, Trash2 } from 'lucide-react';
import type { Note } from '../data';

interface NoteListProps {
    notes: Note[];
    activeNoteId: string | null;
    onSelectNote: (id: string) => void;
    title: string;
    onDeleteNote?: (id: string) => void;
}

export default function NoteList({ notes, activeNoteId, onSelectNote, title, onDeleteNote }: NoteListProps) {
    return (
        <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notes.length} notes found</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {notes.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 dark:text-gray-500">
                        <p>No notes found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => onSelectNote(note.id)}
                                className={`group p-6 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 relative ${activeNoteId === note.id ? 'bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500' : 'border-l-4 border-transparent'
                                    }`}
                            >
                                <div className="mb-2 flex justify-between items-start">
                                    <h3 className={`font-semibold text-lg truncate pr-8 ${activeNoteId === note.id ? 'text-orange-900 dark:text-orange-100' : 'text-gray-900 dark:text-gray-100'
                                        }`}>
                                        {note.title}
                                    </h3>
                                    {onDeleteNote && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteNote(note.id);
                                            }}
                                            className="absolute top-6 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                            title="Delete Note"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                    {note.preview}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                                    <span>{note.date}</span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                        {note.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
