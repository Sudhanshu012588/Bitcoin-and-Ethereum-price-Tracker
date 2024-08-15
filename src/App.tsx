import { useState } from "react"
import ResultRow from "./ResultRow.tsx";

function App() {
  
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 
        to-sky-400 bg-clip-text text-transparent">Find cheapest crypto</h1>
        



        <div className="mt-6 py-10 ">
            <ResultRow/>
            
        </div>
      </main>
    </>
  )
}

export default App
