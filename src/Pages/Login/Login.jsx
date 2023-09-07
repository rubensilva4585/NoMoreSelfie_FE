import { useRef, useState } from "react"
import './Login.css'

export default function Login() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="bg-blue-500 p-4">
                <h1 className="text-3xl text-white">Hello, Tailwind CSS! {count}</h1>
                <h1 className="text-3xl text-white">Hello, Tailwind CSS! {count}</h1>
            </div>
            <button onClick={() => setCount((count) => count + 1)}>cona</button>
        </>
    )
}
