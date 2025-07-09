"use client"

import ContratadoLayout from "@/layout/ContratadoLayout"
import ContratanteLayout from "@/layout/ContratanteLayout"
import ConfigModelLayout from "@/layout/ConfigModelLayout"
import InstrucaoLayout from "@/layout/InstrucaoLayout"
import ConfigIALayout from "@/layout/ConfigIALayout"
import GuiaLayout from "@/layout/GuiaLayout"
import FooterContratLayout from "@/layout/FooterContratLayout"
export default function CadastroPage() {
  return (
    <>
      <main className="p-24">
        <div className="max-w-3xl mx-auto space-y-4">
          <GuiaLayout />
          <ContratadoLayout />
          <ContratanteLayout />
          <ConfigModelLayout />
          <ConfigIALayout />
          <InstrucaoLayout />
          <FooterContratLayout/>
        </div>
      </main>
    </>
  )
}
