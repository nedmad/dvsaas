import Link from "next/link"



export default function Header() {
    return <>
        <header className="full py-6 bg-blue-500">
            <div className="w-full mx-auto max-w-4xl">
                <div className="flex justify-between items-center">
                    <Link href={"/"} className="logo bg-red-500">Logo</Link>
                    <div className="options flex gap-3">
                        <Link href={"/auth/login"}>
                            Login
                        </Link>
                        <Link href={"/auth/register"}>
                            Cadastrar usuário
                        </Link>
                        <div>User</div>
                    </div>
                </div>
            </div>

        </header>
    </>
}