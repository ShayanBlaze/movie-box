import React, { useState, FC } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full sm:w-auto mt-4 sm:mt-0">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
          className="w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
