import InputRegister from "./components/inputRegister";

export default function Register() {
    return (
        <>
        <main className="w-full h-screen flex  justify-center items-center">
            <form action="" className="flex gap-3 flex-col w-full max-w-md">
                <InputRegister type="text"/>
                <InputRegister type="password"/>
                <button className="w-full bg-blue-600 rounded text-white font-bold py-2 px-2">Cadastrar</button>

            </form>
        </main>
        </>)
}