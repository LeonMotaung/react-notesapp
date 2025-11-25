export interface Note {
    id: string;
    title: string;
    preview: string;
    content: string;
    date: string;
    tag: string;
    folder: string;
    isFavorite?: boolean;
    isArchived?: boolean;
    isDeleted?: boolean;
}

export const notes: Note[] = [
    {
        id: '1',
        title: 'Prayer as an Anchor',
        preview: 'Focusing on the spiritual grounding that prayer provides in daily life...',
        content: '# Prayer as an Anchor\n\nFocusing on the spiritual grounding that prayer provides in daily life. It serves as a steadying force amidst the chaos of the modern world.\n\n## Key Points\n- Morning devotion\n- Evening reflection\n- Constant gratitude',
        date: '10:30 AM',
        tag: 'Church Sermons',
        folder: '2023',
        isFavorite: true
    },
    {
        id: '2',
        title: 'React Hooks Deep Dive',
        preview: 'Understanding useEffect, useMemo, and useCallback dependencies...',
        content: '# React Hooks Deep Dive\n\nUnderstanding useEffect, useMemo, and useCallback dependencies is crucial for performance optimization.\n\n## useEffect\nRuns side effects.\n\n## useMemo\nMemoizes values.\n\n## useCallback\nMemoizes functions.',
        date: 'Yesterday',
        tag: 'School Related',
        folder: '2023'
    },
    {
        id: '3',
        title: 'Movie Night Ideas',
        preview: 'List of sci-fi and thriller movies to watch this weekend...',
        content: '# Movie Night Ideas\n\nList of sci-fi and thriller movies to watch this weekend.\n\n1. Inception\n2. Interstellar\n3. The Matrix\n4. Dune',
        date: 'Mon',
        tag: 'Movies and Games',
        folder: '2023'
    },
    {
        id: '4',
        title: 'Family Trip to Paris',
        preview: 'Itinerary planning for the summer vacation...',
        content: '# Family Trip to Paris\n\nItinerary planning for the summer vacation.\n\n- Eiffel Tower\n- Louvre Museum\n- Notre Dame',
        date: 'Last Week',
        tag: 'Family Trip',
        folder: '2023'
    },
    {
        id: '5',
        title: 'Anniversary Gift Ideas',
        preview: 'Brainstorming for the upcoming anniversary...',
        content: '# Anniversary Gift Ideas\n\nBrainstorming for the upcoming anniversary.\n\n- Jewelry\n- Weekend getaway\n- Personalized photo album',
        date: '2 weeks ago',
        tag: 'Love Life',
        folder: '2023'
    }
];

export const tags = [
    { name: 'School Related', icon: '🎓' },
    { name: 'Church Sermons', icon: '⛪' },
    { name: 'Movies and Games', icon: '🎮' },
    { name: 'Family Trip', icon: '✈️' },
    { name: 'Love Life', icon: '💕' }
];

export const folders = [
    { name: '2023', count: 34 },
    { name: '2022', count: 36 },
    { name: '2021', count: 23 },
    { name: '2020', count: 18 },
    { name: '2019', count: 23 }
];
