import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import Header from "../components/Header";

import xangoImg from "../assets/xango.png";
import padilhaImg from "../assets/padilha.png";
import iemanjaImg from "../assets/iemanja.png";
import mulamboImg from "../assets/mulambo.png";

const CATEGORIES = [
  { key: "todos", label: "Todos" },
  { key: "guias", label: "Guias" },
  { key: "brajas", label: "Brajás" },
  { key: "pulseiras", label: "Pulseiras" },
  { key: "brincos", label: "Brincos" },
];

const PRODUCTS = [
  {
    id: "p1",
    category: "guias",
    name: "Guia de Xangô",
    desc: "Força, justiça e equilíbrio em cada detalhe.",
    price: 89.9,
    image: xangoImg,
  },
  {
    id: "p2",
    category: "guias",
    name: "Guia de Maria Padilha",
    desc: "Uma peça marcante e cheia de energia.",
    price: 64.9,
    image: padilhaImg,
  },
  {
    id: "p3",
    category: "guias",
    name: "Guia de Iemanjá",
    desc:
      "Feita com miçangas em tons de azul e branco que representam a força e a serenidade de Iemanjá.",
    price: 99.9,
    image: iemanjaImg,
  },
  {
    id: "p4",
    category: "guias",
    name: "Guia de Maria Mulambo",
    desc: "Com toda força, elegância e mistério dessa pombogira.",
    price: 74.9,
    image: mulamboImg,
  },
];

function formatBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [cartIds, setCartIds] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;

    if (activeCategory !== "todos") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        `${p.name} ${p.desc}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, activeCategory]);

  const cartItems = PRODUCTS.filter((p) => cartIds.has(p.id));
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  function addToCart(id) {
    setCartIds((prev) => new Set(prev).add(id));
    setCartOpen(true);
  }

  function removeFromCart(id) {
    setCartIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setCartOpen(false);
        setSelectedImage(null);
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative min-h-screen text-green-900">
      <div className="fixed inset-0 z-[-1] bg-green-50" />
      <AnimatedBackground />

      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartIds.size}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* CARRINHO */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setCartOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between">
                <h2 className="font-semibold">Seu Carrinho 🛒</h2>
                <button onClick={() => setCartOpen(false)}>✕</button>
              </div>

              <div className="flex-1 overflow-auto p-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-green-100 rounded-xl p-3 flex gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-green-700">
                        {formatBRL(item.price)}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-xs border px-2 py-1 rounded-lg hover:bg-green-50"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-4 font-semibold">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </div>

                <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl hover:bg-emerald-700 transition">
                  Finalizar compra
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative z-10 px-6 pb-16 max-w-md mx-auto space-y-8">

        {/* CATEGORIAS */}
        <div className="flex gap-2 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                activeCategory === cat.key
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-green-800 border-green-100 hover:bg-green-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PRODUTOS CARROSSEL */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="min-w-[220px] bg-white/80 backdrop-blur-md rounded-3xl shadow border border-green-100 overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                onClick={() => setSelectedImage(p.image)}
                className="h-40 w-full object-cover cursor-pointer"
              />

              <div className="p-4">
                <h3 className="font-semibold text-sm">{p.name}</h3>

                <div className="mt-2 font-semibold text-sm">
                  {formatBRL(p.price)}
                </div>

                <button
                  onClick={() => addToCart(p.id)}
                  className="mt-3 w-full bg-emerald-600 text-white py-2 rounded-xl text-sm hover:bg-emerald-700 transition"
                >
                  🛒 Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}