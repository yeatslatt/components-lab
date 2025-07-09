import { useState } from "react"
import { ChevronUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

function ConfigIALayout() {
  const [ConfigIAExpanded, setConfigIAExpanded] = useState(false)
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setConfigIAExpanded(!ConfigIAExpanded)}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/gear_icon.svg"
              alt="Icon de engrenagem"
              width={24}
              height={24}
            />
            <span className="text-gray-500 font-medium">Configuração da Inteligência Artificial</span>
          </div>
          <ChevronUp className={`text-gray-500 transition-transform ${ConfigIAExpanded ? "" : "rotate-180"}`} />
        </div>

        {ConfigIAExpanded && (
          <div className="mt-4">
            <Tabs defaultValue="modelo-pronto" className="mb-6">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger
                  value="modelo-pronto"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  ChatGPT/Openai
                </TabsTrigger>
                <TabsTrigger value="ia-gerar">DeepSeek (Free)</TabsTrigger>
                <TabsTrigger value="anexar-meu">Google (Gemini)</TabsTrigger>
              </TabsList>

              <TabsContent value="modelo-pronto">

              </TabsContent>

              <TabsContent value="ia-gerar">
            
              </TabsContent>

              <TabsContent value="anexar-meu">
                
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfigIALayout