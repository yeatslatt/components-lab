import Link from "next/link"
import Image from "next/image"
function Header() {
    return (
        <header className="bg-[#001a5e] py-3 px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center">
                <div className="relative mr-2">
                    <Image
                        src="/procstudio_logotipo_branco.png"
                        alt="ProcStudio Logo"
                        width={180}   
                        height={90}
                        className="object-contain"
                        priority />
                </div>
                <Link href="/" className="text-2xl font-bold">
                </Link>
            </div>
            <Link href="/login" className="text-white hover:text-gray-200 transition-colors font-medium">
                Login
            </Link>
        </header>
    )
}
export default Header