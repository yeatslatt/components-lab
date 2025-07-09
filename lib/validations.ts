export const formatCPF = (value: string): string =>{
    const onlyNumbers = value.replace(/\D/g, "");
    return onlyNumbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .slice(0, 14);
}

export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.length === 11;
};

export const formatDate = (value: string): string => {
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
    .slice(0,10)
}

export const formatCep = (value: string): string => {
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers
    .replace(/^(\d{5})(\d)/, "$1-$2").slice(0,9)
}

export const isValidCep = (value: string): boolean => {
  return /^\d{5}-\d{3}$/.test(value);
};

export const formatCnpj = (value: string): string => {
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
    .slice(0,18)
}

export const isValidCnpj = (value: string): boolean => {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);
};
