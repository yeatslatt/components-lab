import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function QuillEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Componentes
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Quill Editor de Textos
          </h1>
          <p className="text-gray-600 text-lg">
            Editor de texto rico com formatação
          </p>
        </div>

        {/* Content Placeholder */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            Conteúdo do componente será implementado aqui
          </p>
        </div>
      </div>
    </div>
  );
}