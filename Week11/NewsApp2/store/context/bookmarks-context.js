import { createContext, useState } from "react";

export const BookmarksContext =
  createContext(
    {
      ids: [],
      addBookmark: (id) => {},
      removeBookmark: (id) => {},
    }
  );

export default function BookmarksContextProvider({ children }) {
  const [bookmarkIds, setBookmarkIds] = useState([]);

  function addBookmark(id) {
    setBookmarkIds((currentIds) => {
      return [...currentIds, id];
    });
  }

  function removeBookmark(id) {
    setBookmarkIds((currentIds) => {
      return currentIds.filter((newsId) => newsId !== id);
    });
  }

  const value = {
    ids: bookmarkIds,
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}
