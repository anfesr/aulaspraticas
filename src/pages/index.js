import React, { useState } from "react";
const dados = [
  { id: 1, botao: "Link 1", conteudo: "Conteúdo do Item 1", image: "/imagens/img1.jpg" },
  { id: 2, botao: "Link 2", conteudo: "Conteúdo do Item 2", image: "/imagens/img2.jpg" },
  { id: 3, botao: "Link 3", conteudo: "Conteúdo do Item 3", image: "/imagens/img3.jpg" }
];

export default function Home() {
  const [selecionado, setSelecionado] = useState(dados[0]);

  return (
    <div>
      <main style={{ padding: '20px' }}>
        <h1>Página Inicial</h1>
        <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dados.map(item => (
              <button key={item.id} onClick={() => setSelecionado(item)} style={{ padding: '10px', cursor: 'pointer' }}>
                {item.botao}
              </button>
            ))}
          </div>
          <div style={{ border: '1px solid #ddd', padding: '20px', flex: 1 }}>
            <h2>{selecionado.conteudo}</h2>
            <img src={selecionado.image} alt="Detail" style={{ maxWidth: '100%' }} />
          </div>
        </div>
      </main>
    </div>
  );
}