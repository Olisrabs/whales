import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

const categories = ["All", "Weddings", "Portraits", "Corporate", "Events", "Celebrities"];

const galleryData = [
  { id: 1, category: "Weddings", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop", span: "row-span-2 col-span-1" },
  { id: 2, category: "Portraits", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { id: 3, category: "Corporate", img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop", span: "row-span-1 col-span-2" },
  { id: 4, category: "Events", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", span: "row-span-2 col-span-1" },
  { id: 5, category: "Celebrities", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { id: 6, category: "Weddings", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { id: 7, category: "Portraits", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop", span: "row-span-2 col-span-1" },
  { id: 8, category: "Events", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop", span: "row-span-1 col-span-2" },
];

const albumsData = [
  { id: 1, title: "The Adeyemi Wedding", date: "October 2023", photos: 450, img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "GTBank Gala", date: "December 2023", photos: 320, img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, title: "Lagos Fashion Week", date: "November 2023", photos: 600, img: "https://images.unsplash.com/photo-1509631179647-0c5000642f13?q=80&w=2070&auto=format&fit=crop" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryData);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter(img => img.category === activeTab));
    }
  }, [activeTab]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="bg-white dark:bg-[#050b14] pt-24 md:pt-32 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-surface dark:bg-[#0a1f44] text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black dark:text-gray-300 mb-6">Our Work</h1>
        <p className="text-lg text-muted-text dark:text-gray-400 max-w-2xl mx-auto mb-10">A curated collection of our finest moments, captured with intention and artful precision.</p>
        <Link to="/booking" className="inline-block bg-transparent border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-3 font-medium hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-[#050b14] transition-colors duration-300">Book a Shoot</Link>
      </section>

      {/* Gallery Filter */}
      <section className="py-12 border-b border-border dark:border-white/10">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 min-w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === cat 
                    ? "bg-primary text-white" 
                    : "bg-surface text-muted-text dark:text-gray-400 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={cn("relative group overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800", item.span)}
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={item.img} 
                    alt={item.category} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                      <Maximize2 size={32} className="text-white mb-2" />
                      <span className="text-white font-medium tracking-wider uppercase text-sm">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Client Albums */}
      <section className="py-24 bg-surface dark:bg-[#0a1f44]">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif text-black dark:text-white mb-12 text-center">Client Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {albumsData.map(album => (
              <div key={album.id} className="bg-white dark:bg-[#050b14] border border-border dark:border-white/10 group cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img src={album.img} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/>
                  <div className="absolute bottom-4 right-4 bg-white dark:bg-[#050b14] px-3 py-1 text-xs font-medium text-black dark:text-white">
                    {album.photos} Photos
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-black dark:text-white mb-2">{album.title}</h3>
                  <p className="text-sm text-muted-text dark:text-gray-400 uppercase tracking-wider">{album.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 dark:bg-black flex items-center justify-center p-4 md:p-12"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
              <X size={32} />
            </button>
            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors" onClick={prevImage}>
              <ChevronLeft size={48} />
            </button>
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors" onClick={nextImage}>
              <ChevronRight size={48} />
            </button>

            <motion.img 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={filteredImages[lightboxIndex].img} 
              alt="Lightbox View" 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
