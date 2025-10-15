"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TEAMS, type Team } from "../../page"; // mantém seu import

interface TeamPageProps {
  params: {
    id: string;
  };
}

export default function TeamPage({ params }: TeamPageProps) {
  // Destrava o scroll caso alguma página anterior tenha deixado o body bloqueado
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  const team = TEAMS.find((t: Team) => t.id === params.id);

  if (!team) {
    return (
      <main className="min-h-[100svh] flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">🏀 Time não encontrado</h1>
        <Link
          href="/"
          className="text-blue-400 hover:underline hover:text-blue-300"
        >
          Voltar para a lista
        </Link>
      </main>
    );
  }

  return (
    // 🔑 Raiz rolável e com viewport “segura” no mobile
    <main className="min-h-[100svh] w-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-gray-950 to-black text-white">
      {/* container centralizado */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Botão voltar */}
        <Link
          href="/"
          className="inline-block text-sm mb-6 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
        >
          ← Voltar
        </Link>

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={team.logo || ""}
            alt={team.name}
            width={180}
            height={180}
            className="rounded-full mb-6 shadow-lg border border-gray-700 bg-gray-900 p-4"
          />
        </div>

        {/* Nome e cidade */}
        <h1 className="text-5xl font-bold mb-2 text-center">{team.name}</h1>
        <p className="text-gray-400 mb-4 text-lg text-center">{team.city}</p>

        {/* Dados rápidos */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-10">
          <span className="bg-gray-800 px-3 py-1 rounded-md">
            🏆 {team.championships} títulos
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-md">
            🌍 Conferência: {team.conference}
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-md">
            📅 Fundado: {team.founded}
          </span>
        </div>

        {/* História */}
        <div className="max-w-4xl mx-auto text-lg leading-relaxed text-justify mb-16 px-4">
          {team.history}
        </div>

        {/* Imagens extras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mx-auto">
          {team.images?.arena && (
            <div className="flex flex-col items-center">
              <Image
                src={team.images.arena}
                alt="Arena"
                width={350}
                height={200}
                className="rounded-lg shadow-md object-cover w-full h-auto"
              />
              <span className="mt-2 text-sm text-gray-400">Arena</span>
            </div>
          )}

          {team.images?.mascot && (
            <div className="flex flex-col items-center">
              <Image
                src={team.images.mascot}
                alt="Mascote"
                width={350}
                height={200}
                className="rounded-lg shadow-md object-cover w-full h-auto"
              />
              <span className="mt-2 text-sm text-gray-400">Mascote</span>
            </div>
          )}

          {team.images?.uniform && (
            <div className="flex flex-col items-center">
              <Image
                src={team.images.uniform}
                alt="Uniformes"
                width={350}
                height={200}
                className="rounded-lg shadow-md object-cover w-full h-auto"
              />
              <span className="mt-2 text-sm text-gray-400">Uniformes</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
