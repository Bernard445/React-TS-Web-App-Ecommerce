const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <header className="bg-indigo-600 text-white py-4 shadow">
      <h1 className="text-center text-2xl font-bold">React Shop</h1>
    </header>

    <main className="max-w-5xl mx-auto px-4 py-6">
      {children}
    </main>
  </div>
);

export default Layout;
