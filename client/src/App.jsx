function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-4 border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Campus Essentials</h1>
          <nav className="flex items-center gap-4 text-sm">
            <a className="hover:text-blue-600" href="#">Home</a>
            <a className="hover:text-blue-600" href="#">Sell</a>
            <a className="hover:text-blue-600" href="#">Messages</a>
            <a className="hover:text-blue-600" href="#">Login</a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <div className="rounded-xl border bg-white p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-gray-600">Vite + Tailwind setup is ready.</p>
        </div>
      </main>
    </div>
  )
}

export default App
