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
        <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    {title} <ChevronDown size={16} className="text-gray-400" />
                </h2>
                <span className="text-xs text-gray-400">{notes.length} Notes</span>
            </div>

            <div className="overflow-y-auto flex-1">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => onSelectNote(note.id)}
                        className={`p-4 border-b border-gray-50 cursor-pointer transition-all hover:bg-gray-50 group relative ${activeNoteId === note.id ? 'bg-orange-50 hover:bg-orange-50' : ''
                            }`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <h3 className={`font-bold text-sm truncate pr-8 ${activeNoteId === note.id ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                {note.title}
                            </h3>

                            {onDeleteNote && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteNote(note.id);
                                    }}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                    title="Delete Note"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                            {note.preview}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 font-medium">{note.date}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium truncate max-w-[100px]">
                                {note.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
