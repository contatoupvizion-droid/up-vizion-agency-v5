import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");
  const [orcamentos, setOrcamentos] = useState([]);

  function salvarOrcamento() {
    if (!cliente || !servico || !valor) {
      alert("Preencha tudo!");
      return;
    }

    const novo = {
      id: Date.now(),
      cliente,
      servico,
      valor
    };

    setOrcamentos([novo, ...orcamentos]);
    setCliente("");
    setServico("");
    setValor("");
  }

  function enviarWhatsApp(o) {
    const texto = `Olá ${o.cliente}, segue seu orçamento:

Serviço: ${o.servico}
Valor: R$ ${o.valor}

UP VIZION AGENCY`;

    window.open(
      `https://wa.me/5519981163280?text=${encodeURIComponent(texto)}`
    );
  }

  function gerarPDF() {
    window.print();
  }

  return (
    <div className="app">
      <h1>UP VIZION AGENCY</h1>

      <div className="form">
        <input
          placeholder="Nome do cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <input
          placeholder="Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />

        <input
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button onClick={salvarOrcamento}>Salvar orçamento</button>
        <button onClick={gerarPDF}>Gerar PDF</button>
      </div>

      <div className="lista">
        {orcamentos.map((o) => (
          <div key={o.id} className="card">
            <p><b>Cliente:</b> {o.cliente}</p>
            <p><b>Serviço:</b> {o.servico}</p>
            <p><b>Valor:</b> R$ {o.valor}</p>

            <button onClick={() => enviarWhatsApp(o)}>
              Enviar WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
