import { Calendar, Clock, Tag } from 'lucide-react';
import type { Note } from '../data';

interface NoteDetailProps {
    note: Note | null;
}

export default function NoteDetail({ note }: NoteDetailProps) {
    if (!note) {
        return (
            <div className="flex-1 h-full flex items-center justify-center bg-white text-gray-400">
                <div className="text-center">
                    <p className="text-lg font-medium">Select a note to view</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 h-full bg-white overflow-y-auto">
            <div className="max-w-3xl mx-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{note.title}</h1>

                    <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{note.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={14} />
                            <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md text-xs font-medium">
                                {note.tag}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{note.folder}</span>
                        </div>
                    </div>
                </div>

                <div className="prose prose-orange max-w-none text-gray-700">
                    {note.content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return null; // Skip title as we rendered it above
                        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800">{line.replace('## ', '')}</h2>;
                        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc mb-1">{line.replace('- ', '')}</li>;
                        if (line.match(/^\d+\. /)) return <li key={i} className="ml-4 list-decimal mb-1">{line.replace(/^\d+\. /, '')}</li>;
                        if (line === '') return <br key={i} />;
                        return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
                    })}
                </div>
            </div>
        </div>
    );
}
