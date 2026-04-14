import { useState } from "react";

function Checkout() {

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function finalizarPedido() {
    alert("Pedido enviado! 🌿");
    console.log(form);
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">

        <h2 className="text-xl font-semibold mb-6 text-center">
          Finalizar Pedido 
        </h2>

        <div className="space-y-4">

          <input
            name="nome"
            placeholder="Seu nome"
            onChange={handleChange}
            className="w-full border border-green-200 rounded-xl p-3"
          />

          <input
            name="telefone"
            placeholder="Telefone / WhatsApp"
            onChange={handleChange}
            className="w-full border border-green-200 rounded-xl p-3"
          />

          <input
            name="endereco"
            placeholder="Endereço de entrega"
            onChange={handleChange}
            className="w-full border border-green-200 rounded-xl p-3"
          />

          <button
            onClick={finalizarPedido}
            className="w-full bg-emerald-600 text-white py-3 rounded-2xl hover:bg-emerald-700 transition"
          >
            Confirmar Pedido
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;