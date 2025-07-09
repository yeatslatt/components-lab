'use client';

import Link from 'next/link';
import { 
  User, 
  FileText, 
  FileStack, 
  Navigation,
  ChevronRight,
  TestTube
} from 'lucide-react';

const components = [
  {
    id: 'cadastro',
    title: 'Página de Cadastro',
    description: 'Formulário de cadastro com validação',
    icon: User,
    href: '/cadastro',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    id: 'quill-editor',
    title: 'Quill Editor de Textos',
    description: 'Editor de texto rico com formatação',
    icon: FileText,
    href: '/quill-editor',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    id: 'quill-clausulas',
    title: 'Quill com Cláusulas',
    description: 'Editor com sistema de cláusulas',
    icon: FileStack,
    href: '/quill-clausulas',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600'
  },
  {
    id: 'navegador-multi-paginas',
    title: 'Navegador Multi Páginas',
    description: 'Sistema de navegação entre páginas',
    icon: Navigation,
    href: '/navegador-multi-paginas',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <TestTube className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Componentes Teste
          </h1>
          <p className="text-gray-600 text-lg">
            Repositório central para teste e validação de componentes front-end
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {components.map((component) => {
            const IconComponent = component.icon;
            return (
              <Link
                key={component.id}
                href={component.href}
                className="group block"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${component.color} ${component.hoverColor} transition-colors duration-200`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                          {component.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {component.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Desenvolvido para testes e validação de componentes
          </p>
        </div>
      </div>
    </div>
  );
}