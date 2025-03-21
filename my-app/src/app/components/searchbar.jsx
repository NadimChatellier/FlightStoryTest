export default function SearchBar() {
    return (
        <div className="flex justify-center items-center">
        <input
            type="text"
            placeholder="Search for a podcast"
            className="w-3/5 px-4 py-2 border border-gray-300 rounded-md"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover: transform hover:scale-105 transition duration-300">
            Search
        </button>
        </div>
    );
}
