import { useState } from "react"
import { Label } from "@/components/ui/label"
import { ChevronUp } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

function InstrucaoLayout() {
    const [instructionsExpanded, setInstructionsExpanded] = useState(false)

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="p-4 border-b">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                >
                    <div className="flex items-center gap-2">
                        <Image
                            src="/book_icon.svg"
                            alt="Icon de livro"
                            width={24}
                            height={24}
                        />
                        <span className="text-gray-500 font-medium">Instruções para a geração</span>
                    </div>
                    <ChevronUp className={`text-gray-500 transition-transform ${instructionsExpanded ? "" : "rotate-180"}`} />
                </div>

                {instructionsExpanded && (
                    <div className="mt-4">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="instrucoes">Instruções</Label>
                                <Textarea
                                    id="instrucoes"
                                    placeholder="Informe instruções complementares para a IA gerar o contrato para você."
                                    className="min-h-[100px] bg-white border-gray-200"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default InstrucaoLayout