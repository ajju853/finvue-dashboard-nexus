
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MangaLayout } from '@/components/manga/MangaLayout';
import MangaFeed from '@/components/manga/MangaFeed';
import MangaExplore from '@/components/manga/MangaExplore';
import MangaMessages from '@/components/manga/MangaMessages';
import MangaProfile from '@/components/manga/MangaProfile';
import MangaSettings from '@/components/manga/MangaSettings';
import MangaNotifications from '@/components/manga/MangaNotifications';
import MangaBookmarks from '@/components/manga/MangaBookmarks';

const MangaVerse = () => {
  return (
    <MangaLayout>
      <Routes>
        <Route path="/" element={<MangaFeed />} />
        <Route path="/explore" element={<MangaExplore />} />
        <Route path="/messages/*" element={<MangaMessages />} />
        <Route path="/notifications" element={<MangaNotifications />} />
        <Route path="/bookmarks" element={<MangaBookmarks />} />
        <Route path="/profile/*" element={<MangaProfile />} />
        <Route path="/settings/*" element={<MangaSettings />} />
      </Routes>
    </MangaLayout>
  );
};

export default MangaVerse;
