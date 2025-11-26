import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import type { Note } from './data'; // Keep type import, but we won't use the 'notes' array from data.ts anymore
import './App.css';

import SettingsModal from './components/SettingsModal';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeSection, setActiveSection] = useState('all');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Fetch notes from backend
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const data = await response.json();
        // Map _id to id for frontend compatibility if needed, or just ensure Note type matches
        const mappedNotes = data.map((n: any) => ({ ...n, id: n._id }));
        setNotes(mappedNotes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const filteredNotes = useMemo(() => {
    let result = notes;

    // Filter by Section
    if (activeSection === 'favorites') {
      result = result.filter(n => n.isFavorite && !n.isDeleted);
    } else if (activeSection === 'archived') {
      result = result.filter(n => n.isArchived && !n.isDeleted);
    } else if (activeSection === 'deleted') {
      result = result.filter(n => n.isDeleted);
    } else if (activeSection === 'all') {
      // 'All Notes' should typically exclude deleted and archived notes, or at least deleted ones
      result = result.filter(n => !n.isDeleted && !n.isArchived);
    } else {
      // Folders/Tags
      result = result.filter(n => (n.folder === activeSection || n.tag === activeSection) && !n.isDeleted);
    }

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query) ||
        n.tag.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeSection, searchQuery, notes]);

  const activeNote = useMemo(() =>
    notes.find(n => n.id === activeNoteId) || null,
    [activeNoteId, notes]);

  const getSectionTitle = () => {
    if (activeSection === 'all') return 'All Notes';
    if (activeSection === 'favorites') return 'Favorites';
    if (activeSection === 'archived') return 'Archived';
    if (activeSection === 'deleted') return 'Trash';
    return activeSection;
  };

  const handleAddNote = async () => {
    const newNoteData = {
      title: 'New Note',
      content: '# New Note\n\nStart writing here...',
      preview: 'Start writing...',
      date: new Date().toLocaleDateString(),
      tag: 'Uncategorized',
      folder: new Date().getFullYear().toString(),
    };

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNoteData),
      });

      if (response.ok) {
        const savedNote = await response.json();
        const noteWithId = { ...savedNote, id: savedNote._id };
        setNotes([noteWithId, ...notes]);
        setActiveNoteId(noteWithId.id);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };



  const counts = useMemo(() => ({
    all: notes.length,
    favorites: notes.filter(n => n.isFavorite).length,
    archived: notes.filter(n => n.isArchived).length,
    deleted: notes.filter(n => n.isDeleted).length,
  }), [notes]);

  const handleUpdateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        // Ensure id is preserved/mapped correctly
        const noteWithId = { ...updatedNote, id: updatedNote._id || updatedNote.id };

        setNotes(notes.map(n => n.id === id ? noteWithId : n));
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    // If we are already in the "Trash" (deleted) section, then permanently delete
    if (activeSection === 'deleted') {
      if (!confirm('Are you sure you want to permanently delete this note?')) return;
      try {
        const response = await fetch(`/api/notes/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setNotes(notes.filter(n => n.id !== id));
          if (activeNoteId === id) setActiveNoteId(null);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    } else {
      // Otherwise, soft delete (move to trash)
      handleUpdateNote(id, { isDeleted: true });
      if (activeNoteId === id) setActiveNoteId(null);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-200">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onBack={() => setActiveNoteId(null)}
        showBackButton={!!activeNoteId}
        onAddNote={handleAddNote}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(section) => {
            setActiveSection(section);
            setActiveNoteId(null);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          counts={counts}
        />

        {/* Mobile View Logic:
            - If activeNoteId is null: Show NoteList (w-full)
            - If activeNoteId is set: Show NoteDetail (w-full)
            
            Desktop View Logic:
            - Show NoteList (w-80) and NoteDetail (flex-1)
        */}

        <div className={`flex flex-1 w-full ${activeNoteId ? 'md:flex' : ''}`}>
          <div className={`
            flex-1 md:flex-none md:w-80 h-full
            ${activeNoteId ? 'hidden md:block' : 'block'}
          `}>
            <NoteList
              notes={filteredNotes}
              activeNoteId={activeNoteId}
              onSelectNote={setActiveNoteId}
              title={getSectionTitle()}
              onDeleteNote={handleDeleteNote}
            />
          </div>

          <div className={`
            flex-1 h-full
            ${!activeNoteId ? 'hidden md:block' : 'block'}
          `}>
            <NoteDetail
              note={activeNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
