"use client";

import Image from "next/image";
import Link from "next/link";
import { TEAMS, type Team } from "../../page"; // importa o array e o tipo do arquivo principal

interface TeamPageProps {
  params: {
    id: string;
  };
}

export default function TeamPage({ params }: TeamPageProps) {
  const team = TEAMS.find((t: Team) => t.id === params.id);

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">🏀 Time não encontrado</h1>
        <Link
          href="/"
          className="text-blue-400 hover:underline hover:text-blue-300"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex flex-col items-center py-10 px-6">
      {/* Botão voltar */}
      <Link
        href="/"
        className="self-start text-sm mb-6 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
      >
        ← Voltar
      </Link>

      {/* Logo */}
      <Image
        src={team.logo || ""}
        alt={team.name}
        width={180}
        height={180}
        className="rounded-full mb-6 shadow-lg border border-gray-700 bg-gray-900 p-4"
      />

      {/* Nome e cidade */}
      <h1 className="text-5xl font-bold mb-2">{team.name}</h1>
      <p className="text-gray-400 mb-4 text-lg">{team.city}</p>

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
      <div className="max-w-4xl text-lg leading-relaxed text-justify mb-16 px-4">
        {team.history}
      </div>

      {/* Imagens extras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {team.images?.arena && (
          <div className="flex flex-col items-center">
            <Image
              src={team.images?.arena || ""}
              alt="Arena"
              width={350}
              height={200}
              className="rounded-lg shadow-md object-cover"
            />
            <span className="mt-2 text-sm text-gray-400">Arena</span>
          </div>
        )}

        {team.images?.mascot && (
          <div className="flex flex-col items-center">
            <Image
              src={team.images?.mascot || ""}
              alt="Mascote"
              width={350}
              height={200}
              className="rounded-lg shadow-md object-cover"
            />
            <span className="mt-2 text-sm text-gray-400">Mascote</span>
          </div>
        )}

        {team.images?.uniform && (
          <div className="flex flex-col items-center">
            <Image
              src={team.images?.uniform || ""}
              alt="Uniformes"
              width={350}
              height={200}
              className="rounded-lg shadow-md object-cover"
            />
            <span className="mt-2 text-sm text-gray-400">Uniformes</span>
          </div>
        )}
      </div>
    </div>
  );
}
