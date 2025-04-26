const Loading = () => {
  return (
    <section className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <div className="max-w-sm mx-auto p-6 rounded-none shadow-lg mt-10 bg-white">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        <p className="text-sm">Please, wait for the server to start...</p>
      </div>
    </section>
  );
};

export default Loading;
