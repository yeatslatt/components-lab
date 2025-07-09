import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronUp } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { formatCPF, isValidCPF, formatDate, formatCep, isValidCep, formatCnpj, isValidCnpj } from "@/lib/validations"

interface FormData {
    email?: string
    cpf?: string
    nome?: string
    nascimento?: string
    estadoCivil?: string
    profissao?: string
    cep?: string
    endereco?: string
    numero?: string
    empresa?: string
    cnpj?: string
    representante?: string
    advogado?: {
        oab?: string
        nome?: string
    }
}

function ContratanteLayout() {
    const [contractDataExpanded, setContractDataExpanded] = useState(false)
    const [hasLawyer, setHasLawyer] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>()

    ///pro botão
    const onSubmit = (data: FormData) => {
        console.log("Dados enviados:", data)
    }

    const toggleLawyerInfo = () => {
        setHasLawyer(!hasLawyer)
    }

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setContractDataExpanded(!contractDataExpanded)}
            >
                <div className="flex items-center gap-2">
                    <Image
                        src="/enterprise_icon.svg"
                        alt="Icon Upload"
                        width={25}
                        height={15}
                    />
                    <span className="text-gray-500 font-medium">Dados contratante</span>
                </div>
                <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform ${contractDataExpanded ? "" : "rotate-180"}`} />
            </div>

            {contractDataExpanded && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 border-t-[1px] border-[#EDEDED] bg-[#FEFEFA]">
                        <div className="mb-8">
                            <h2 className="text-gray-500 font-bold mb-4">Parte Contratante</h2>

                            <Tabs defaultValue="pessoa-fisica" className="mb-6">
                                <TabsList className="w-full grid grid-cols-2 mb-6">
                                    <TabsTrigger
                                        value="pessoa-fisica"
                                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                                    >
                                        Pessoa física
                                    </TabsTrigger>
                                    <TabsTrigger value="pessoa-juridica" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500">
                                        Pessoa jurídica
                                    </TabsTrigger>
                                </TabsList>

                                {/* Pessoa Física */}
                                <TabsContent value="pessoa-fisica" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                                        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-gray-50">
                                            <div className="mb-2">
                                                <Image
                                                    src="/upload_icon.svg"
                                                    alt="Icon Upload"
                                                    width={32}
                                                    height={32}
                                                />
                                            </div>
                                            <h3 className="font-medium text-center mb-1">CNH</h3>
                                            <p className="text-gray-500 text-sm text-center mb-4">Arraste e solte o arquivo aqui</p>
                                            <Button className="bg-[#0277EE] hover:bg-blue-600">Selecionar arquivo</Button>
                                        </div>

                                        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-gray-50">
                                            <div className="mb-2">
                                                <Image
                                                    src="/upload_icon.svg"
                                                    alt="Icon Upload"
                                                    width={32}
                                                    height={32}
                                                />
                                            </div>
                                            <h3 className="font-medium text-center mb-1">Comprovante de Residencia</h3>
                                            <p className="text-gray-500 text-sm text-center mb-4">Arraste e solte o arquivo aqui</p>
                                            <Button className="bg-[#0277EE] hover:bg-blue-600">Selecionar arquivo</Button>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <h3 className="font-semibold text-[#999999] mb-4">Dados pessoais</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="email">E-mail</Label>
                                                <Input
                                                    id="email"
                                                    placeholder="Insira o e-mail"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("email", { required: "Campo Obrigatório" })}
                                                    type="email"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="cpf">CPF</Label>
                                                    <Input
                                                        id="cpf"
                                                        placeholder="000.000.000-00"
                                                        inputMode="numeric"
                                                        className="bg-gray-100 border-gray-200"
                                                        {...register("cpf", {
                                                            required: "Campo Obrigatório",
                                                            validate: (value) => isValidCPF(value ?? "") || "CPF inválido",
                                                        })}
                                                        onChange={(e) => {
                                                            const formatted = formatCPF(e.target.value);
                                                            setValue("cpf", formatted);
                                                        }}
                                                    />
                                                    {errors.cpf && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label htmlFor="nascimento">Data de Nascimento</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="nascimento"
                                                            placeholder="dd/mm/yyyy"
                                                            inputMode="numeric"
                                                            className="bg-gray-100 border-gray-200 pr-10"
                                                            {...register("nascimento", {
                                                                required: "Campo Obrigatório",
                                                                validate: (value) => (value?.length === 10) || "Data incompleta",
                                                            })}
                                                            onChange={(e) => {
                                                                const formatted = formatDate(e.target.value);
                                                                setValue("nascimento", formatted);
                                                            }}
                                                        />
                                                        <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                                                            <Image
                                                                src="/calender_icon.svg"
                                                                alt="Icon Upload"
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="nome">Nome</Label>
                                                <Input
                                                    id="nome"
                                                    placeholder="Insira o nome"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("nome", { required: "Campo Obrigatório" })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="estadoCivil">Estado civil</Label>
                                                    <div className="relative">
                                                        <select
                                                            id="estadoCivil"
                                                            className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            {...register("estadoCivil", { required: "Campo Obrigatório", validate: (value) => value !== "0" || "Selecione uma opção válida" })}
                                                        >
                                                            <option value="0">
                                                                Selecione uma opção
                                                            </option>
                                                            <option value="solteiro">Solteiro(a)</option>
                                                            <option value="casado">Casado(a)</option>
                                                            <option value="divorciado">Divorciado(a)</option>
                                                            <option value="viuvo">Viúvo(a)</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                            <svg
                                                                className="w-4 h-4 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M19 9l-7 7-7-7"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="profissao">Profissão</Label>
                                                    <Input
                                                        id="profissao"
                                                        placeholder="Insira o nome"
                                                        className="bg-gray-100 border-gray-200"
                                                        {...register("profissao", { required: "Campo Obrigatório" })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t-[2px] border-[#EDEDED] bg-[#FEFEFA] mt-5">
                                            <h3 className="font-semibold text-[#999999] mt-4 mb-4">Localidade</h3>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="col-span-2">
                                                    <Label htmlFor="cep" className="text-xs">
                                                        CEP
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="cep"
                                                            inputMode="numeric"
                                                            placeholder="Pesquise pelo CEP"
                                                            className="bg-gray-100 border-gray-200 pr-10"
                                                            {...register("cep", { required: "Campo Obrigatório", validate: (value) => isValidCep(value ?? "") || "CEP inválido" })}

                                                            onChange={(e) => {
                                                                const formatted = formatCep(e.target.value);
                                                                setValue("cep", formatted);
                                                            }}
                                                        />

                                                        <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                                                            <Image
                                                                src="/search_icon.svg"
                                                                alt="Icon Pesquisa"
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="numero" className="text-xs">
                                                        Número
                                                    </Label>
                                                    <Input
                                                        id="numero"
                                                        inputMode="numeric"
                                                        placeholder="Insira o número"
                                                        className="bg-gray-100 border-gray-200"
                                                        {...register("numero", { required: "Campo Obrigatório" })}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="endereco">Endereço</Label>
                                                <Input
                                                    id="endereco"
                                                    placeholder="Insira o endereço da empresa"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("endereco", { required: "Campo Obrigatório" })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Pessoa Jurídica */}
                                <TabsContent value="pessoa-juridica" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-gray-50">
                                        <div className="mb-2">
                                            <Image
                                                src="/upload_icon.svg"
                                                alt="Icon Upload"
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <h3 className="font-medium text-center mb-1">Contrato social</h3>
                                        <p className="text-gray-500 text-sm text-center mb-4">Arraste e solte o arquivo aqui</p>
                                        <Button className="bg-[#0277EE] hover:bg-blue-600">Selecionar arquivo</Button>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#999999] mb-4">Dados da empresa</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="email">E-mail</Label>
                                                <Input
                                                    id="email"
                                                    placeholder="Insira o e-mail"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("email", { required: "Campo Obrigatório" })}
                                                    type="email"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="empresa">Empresa</Label>
                                                <Input
                                                    id="empresa"
                                                    placeholder="Insira o nome da empresa"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("empresa", { required: "Campo Obrigatório" })}
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="cnpj">CNPJ</Label>
                                                <Input
                                                    id="cnpj"
                                                    placeholder="Insira o CNPJ da empresa"
                                                    inputMode="numeric"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("cnpj", { required: "Campo Obrigatório", validate: (value) => isValidCnpj(value ?? "") || "CNPJ inválido", })}

                                                    onChange={(e) => {
                                                        const formatted = formatCnpj(e.target.value);
                                                        setValue("cnpj", formatted);
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="representante">Representante</Label>
                                                <Input
                                                    id="representante"
                                                    placeholder="Insira o representante da empresa"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("representante", { required: "Campo Obrigatório" })}
                                                />
                                            </div>

                                            <div className="border-t-[2px] border-[#EDEDED] bg-[#FEFEFA]">
                                                <h3 className="font-semibold text-[#999999] mt-4 mb-4">Localidade</h3>
                                                <div className="grid grid-cols-3 gap-2 mt-1">
                                                    <div className="col-span-2">
                                                        <Label htmlFor="cep-pj" className="text-xs">
                                                            CEP
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="cep-pj"
                                                                inputMode="numeric"
                                                                placeholder="Pesquise pelo CEP"
                                                                className="bg-gray-100 border-gray-200 pr-10"
                                                                {...register("cep", { required: "Campo Obrigatório", validate: (value) => isValidCep(value ?? "") || "CEP inválido" })}

                                                                onChange={(e) => {
                                                                    const formatted = formatCep(e.target.value);
                                                                    setValue("cep", formatted);
                                                                }}
                                                            />
                                                            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                                                                <Image
                                                                    src="/search_icon.svg"
                                                                    alt="Icon Upload"
                                                                    width={24}
                                                                    height={24}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="numero-pj" className="text-xs">
                                                            Número
                                                        </Label>
                                                        <Input
                                                            id="numero-pj"
                                                            inputMode="numeric"
                                                            placeholder="Insira o número"
                                                            className="bg-gray-100 border-gray-200"
                                                            {...register("numero", { required: "Campo Obrigatório" })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="endereco-pj">Endereço</Label>
                                                <Input
                                                    id="endereco-pj"
                                                    placeholder="Insira o endereço da empresa"
                                                    className="bg-gray-100 border-gray-200"
                                                    {...register("endereco", { required: "Campo Obrigatório" })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Dados do Advogado */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-[#999999] mb-4">Dados advogado</h3>

                                <div className="flex items-center gap-2 mb-4">
                                    <Switch
                                        id="lawyer-switch"
                                        checked={hasLawyer}
                                        onCheckedChange={toggleLawyerInfo}
                                    />
                                    <Label htmlFor="lawyer-switch">Informar advogado?</Label>
                                </div>
                                <div className="bg-[#CBEEFE] border border-[#0057B0] rounded-lg p-4 mb-4 flex gap-3">
                                    <Image
                                        src="/info_icon.svg"
                                        alt="Icon de informação"
                                        width={24}
                                        height={24}
                                        className="mb-5"
                                    />
                                    <div className="text-sm text-[#373F45]">
                                        <p className="font-semibold">O preenchimento do advogado não é obrigatório</p>
                                        <p>Cada parte pode ter seu advogado independente, não sendo necessário seu preenchimento</p>
                                    </div>
                                </div>

                                {hasLawyer && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="oab">Número OAB</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="oab"
                                                        placeholder="Pesquise pelo número da OAB"
                                                        className="bg-gray-100 border-gray-200 pr-10"
                                                    />
                                                    <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                                                        <Image
                                                            src="/search_icon.svg"
                                                            alt="Icon Pesquisa"
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="advogado">Nome do Advogado</Label>
                                                <Input
                                                    id="advogado"
                                                    placeholder="Insira o nome do advogado"
                                                    className="bg-gray-100 border-gray-200"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mt-6">
                                <h3 className="font-semibold text-[#999999] mb-4">LGPD - Lei geral de Proteção de Dados</h3>

                                <div className="flex items-center gap-2 mb-4">
                                    <Switch
                                    />
                                    <Label htmlFor={`lawyer-switch`}>Estou de Acordo com as regras da LGPD</Label>
                                </div>

                                <div className="bg-[#CBEEFE] border border-[#0057B0] rounded-lg p-4 mb-4 flex gap-3">
                                    <Image
                                        src="/info_icon.svg"
                                        alt="Icon de informação"
                                        width={24}
                                        height={24}
                                        className="mb-5"
                                    />
                                    <div className="text-sm text-[#373F45]">
                                        <p className="font-semibold">Ao enviar os dados para nossos sistema você concorda que tem autorização</p>
                                        <p className="font-semibold">Dos proprietários dos documentos para realizar o tratamento de dados</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ContratanteLayout