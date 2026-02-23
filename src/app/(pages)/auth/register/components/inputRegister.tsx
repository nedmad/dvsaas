
export default function InputRegister({ type }: { type: "text"|"password" }) {
    return (<>
        <input type={type} className="border border-black rounded py-2 px-2" />
    </>)

}