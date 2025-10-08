// import React, { useState, useEffect } from "react";
// import Carousel from "../../../components/common/Carousel/Carousel.jsx";
// import Button from "../../../components/common/Button/Button.jsx";
// import 'react-multi-carousel/lib/styles.css';
// import { useArticles } from '../../../hooks/useArticles.js';
// import './HomePage.css';


// const SearchIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const CloseIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const filterCategories = ["Fauna Abisal", "Ecosistemas", "Exploración", "Conservación"];

// function HomePage() {
//   const { articles, isLoading, error } = useArticles();
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     let articlesToFilter = articles;

//     if (selectedCategory) {
//       articlesToFilter = articles.filter(article => 
//         article.category && article.category.toLowerCase() === selectedCategory.toLowerCase()
//       );
//     }

//     if (searchTerm) {
//       const lowercasedTerm = searchTerm.toLowerCase();
//       articlesToFilter = articlesToFilter.filter(article => 
//         (article.title && article.title.toLowerCase().includes(lowercasedTerm)) ||
//         (article.description && article.description.toLowerCase().includes(lowercasedTerm))
//       );
//     }

//     setFilteredArticles(articlesToFilter);
//   }, [searchTerm, selectedCategory, articles]);

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
//   const handleCategoryClick = (category) => {
//     if (selectedCategory === category) {
//       setSelectedCategory(null);
//     } else {
//       setSelectedCategory(category);
//     }
//   };

//   const toggleSearch = () => {
//     setIsSearchVisible(prev => !prev);
//     if (isSearchVisible) {
//       setSearchTerm("");
//       setSelectedCategory(null);
//     }
//   };

//   const renderContent = () => {
//     if (isLoading) return <div className="loading-spinner">Cargando descubrimientos...</div>;
//     if (error) return <div className="error-message">Error: {error.message}</div>;
//     if (filteredArticles.length === 0) {
//       return <p className="no-items-message">No se encontraron resultados.</p>;
//     }
//     return <Carousel items={filteredArticles} />;
//   };

//   return (
//     <div className="homepage-container">
//       <header className="homepage-header">
//         <h1>Descubre los secretos del Abismo</h1>
//       </header>

//       <div className="content-wrapper">
//         <div className="search-toggle-header">
//           {isSearchVisible ? (
//             <button onClick={toggleSearch} className="search-toggle-btn"><CloseIcon /></button>
//           ) : (
//             <button onClick={toggleSearch} className="search-toggle-btn"><SearchIcon /></button>
//           )}
//         </div>
        
//         <div className={`controls-container ${isSearchVisible ? 'visible' : ''}`}>
//           <form className="search-form" onSubmit={(e) => e.preventDefault()}>
//             <input 
//               type="text" 
//               name="search" 
//               placeholder="Buscar por título o descripción..." 
//               className="search-input"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <button type="submit" className="search-submit-btn"><span>&#10140;</span></button>
//           </form>
          
//           <div className="filter-tags">
//             {filterCategories.map(category => (
//               <Button 
//                 key={category}
//                 variant={selectedCategory === category ? 'primary' : 'secondary'}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category}
//               </Button>
//             ))}
//           </div>
//         </div>

//         <main className="carousel-section">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import React, { useState, useEffect, useMemo } from "react";
import Carousel from "../../../components/common/Carousel/Carousel.jsx";
import Button from "../../../components/common/Button/Button.jsx";
import 'react-multi-carousel/lib/styles.css';
import { useArticles } from '../../../hooks/useArticles.js';
import './HomePage.css';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const filterCategories = ["Fauna Abisal", "Ecosistemas", "Exploración", "Conservación"];

function HomePage() {
  const { articles, isLoading, error } = useArticles();

  // ✅ 1) Normalizo lo que venga del hook:
  // - Si es array, úsalo
  // - Si es objeto paginado con .items, usa items
  // - Si no, array vacío
  const baseList = useMemo(() => {
    if (Array.isArray(articles)) return articles;
    if (Array.isArray(articles?.items)) return articles.items;
    return [];
  }, [articles]);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // ✅ 2) Siempre partimos de la lista normalizada
    let articlesToFilter = baseList;

    // ✅ 3) Filtrado por categoría sobre LO YA FILTRADO (no sobre articles crudo)
    if (selectedCategory) {
      const cat = selectedCategory.toLowerCase();
      articlesToFilter = articlesToFilter.filter(
        (a) => a.category && a.category.toLowerCase() === cat
      );
    }

    // ✅ 4) Búsqueda por título/descr
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      articlesToFilter = articlesToFilter.filter(
        (a) =>
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.description && a.description.toLowerCase().includes(q))
      );
    }

    // ✅ 5) Seteo final (siempre array)
    setFilteredArticles(articlesToFilter);
  }, [searchTerm, selectedCategory, baseList]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    if (isSearchVisible) {
      setSearchTerm("");
      setSelectedCategory(null);
    }
  };

  const renderContent = () => {
    if (isLoading) return <div className="loading-spinner">Cargando descubrimientos...</div>;

    // ⚠️ Si tu hook devuelve error como string, muestra el string;
    // si devuelve objeto Error, muestra error.message
    if (error) {
      const msg = typeof error === "string" ? error : error.message || "Error desconocido";
      return <div className="error-message">Error: {msg}</div>;
    }

    if (!Array.isArray(filteredArticles) || filteredArticles.length === 0) {
      return <p className="no-items-message">No se encontraron resultados.</p>;
    }

    // ✅ Pasamos SIEMPRE un array al Carousel
    return <Carousel items={filteredArticles} />;
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Descubre los secretos del Abismo</h1>
      </header>

      <div className="content-wrapper">
        <div className="search-toggle-header">
          {isSearchVisible ? (
            <button onClick={toggleSearch} className="search-toggle-btn"><CloseIcon /></button>
          ) : (
            <button onClick={toggleSearch} className="search-toggle-btn"><SearchIcon /></button>
          )}
        </div>

        <div className={`controls-container ${isSearchVisible ? 'visible' : ''}`}>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="search"
              placeholder="Buscar por título o descripción..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-submit-btn"><span>&#10140;</span></button>
          </form>

          <div className="filter-tags">
            {filterCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <main className="carousel-section">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
