import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

function FooterContratLayout() {
    return (
        <div className="bg-[#FEFEFA] border rounded-[8px] border-[#EDEDED] h-[80px]">
            <div className="flex justify-between items-center px-5 py-3 h-full">
                {/* Texto e switch */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Switch id="lawyer-switch" className="h-4 w-8" />
                        <Label htmlFor="lawyer-switch">Estou de Acordo com as regras da LGPD</Label>
                    </div>
                    <div className="text-[12px] text-[#373F45] leading-tight">
                        <p>Ao enviar os dados para nossos sistema você concorda que tem autorização</p>
                        <p>dos proprietários dos documentos para realizar o tratamento de dados</p>
                    </div>
                </div>

                {/* Botão */}
                <Button className="text-[16px] font-semibold bg-[#0277EE]">
                    Gerar meu contrato
                </Button>
            </div>
        </div>
    )
}

export default FooterContratLayout
