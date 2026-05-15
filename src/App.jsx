import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#a855f7] border-t-transparent animate-spin" />
          <p className="text-[#a855f7] text-sm tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="bg-[#6b21a8] border border-[#a855f7] rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#d946ef] flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">!</span>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-300 text-sm">{error.message}</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-[#1a1a2e] py-10 px-4">
        <h1 className="text-3xl font-bold text-white text-center mb-1">
          User Directory
        </h1>
        <h3 className="text-center text-gray-300 text-sm mb-10">
          Joshua Barotea - BSIT - 2A
        </h3>

        {users.slice(0, 5).map((user) => (
          <div
            key={user.id}
            className="max-w-xl mx-auto flex flex-col gap-5 mb-5"
          >
            <div className="rounded-xl bg-[#772C69] border-2 border-[#d946ef] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#d946ef] text-white font-bold text-sm flex items-center justify-center">
                    {getInitials(user.name)}
                  </div>
                  <h1 className="text-xl font-bold text-white">{user.name}</h1>
                </div>
                <span className="text-gray-300 text-sm">#{user.id}</span>
              </div>

              <hr className="border-[#a855f7] mb-4" />

              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <h2 className="font-bold text-white">Email:</h2>
                  <p className="text-gray-200">{user.email}</p>
                </div>

                <div>
                  <h2 className="font-bold text-white">Company Name:</h2>
                  <p className="text-gray-200">{user.company.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
