import { useState, useEffect } from "react";
import duas from "../data/duas.json";

export default function Home() {
  const [copied, setCopied] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id) => {
    let updated = [];
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={darkMode ? "p-6 bg-gray-900 min-h-screen text-white" : "p-6 bg-gray-50 min-h-screen text-gray-900"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📿 الأدعية</h1>
        <button
          className={darkMode ? "px-3 py-1 bg-gray-700 rounded" : "px-3 py-1 bg-gray-300 rounded"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "وضع نهاري" : "وضع ليلي"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {duas.map((dua) => (
          <div key={dua.id} className={darkMode ? "p-4 bg-gray-800 rounded-xl shadow" : "p-4 bg-white rounded-xl shadow"}>
            <h2 className="font-semibold text-lg mb-2">{dua.title}</h2>
            <p className="mb-3">{dua.text}</p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCopy(dua.text, dua.id)}
              >
                {copied === dua.id ? "تم النسخ ✅" : "نسخ"}
              </button>
              <a
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(dua.text)}`}
                target="_blank"
              >
                مشاركة واتساب
              </a>
              <button
                className={favorites.includes(dua.id) ? "px-3 py-1 bg-yellow-400 rounded" : "px-3 py-1 bg-gray-400 rounded"}
                onClick={() => toggleFavorite(dua.id)}
              >
                {favorites.includes(dua.id) ? "مفضلة ⭐" : "أضف للمفضلة"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
