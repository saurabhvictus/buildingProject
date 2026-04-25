"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Flame, Snowflake, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [building, setBuilding] = useState<any>(null);
  const [newTemp, setNewTemp] = useState("");

  const [aptId, setAptId] = useState("");
  const [owner, setOwner] = useState("");

  const [commonId, setCommonId] = useState("");
  const [roomType, setRoomType] = useState("");

  const [loading, setLoading] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // ================= API =================

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/building");
    setBuilding(res.data);
  };

  const updateTemp = async () => {
    if (!newTemp) return;
    setLoading(true);
    await axios.put(`http://localhost:8080/temperature?value=${newTemp}`);
    setNewTemp("");
    fetchData();
    setLoading(false);
  };

  const addApartment = async () => {
    if (!aptId || !owner) return alert("Enter ID & Owner");
    setLoading(true);
    await axios.post(
      `http://localhost:8080/apartment?id=${aptId}&owner=${owner}`
    );
    setAptId("");
    setOwner("");
    fetchData();
    setLoading(false);
  };

  const deleteApartment = async (id: string) => {
    setLoading(true);
    await axios.delete(`http://localhost:8080/apartment/${id}`);
    fetchData();
    setLoading(false);
  };

  const addCommonRoom = async () => {
    if (!commonId) return alert("Enter ID");
    setLoading(true);
    await axios.post(
      `http://localhost:8080/common-room?id=${commonId}&type=${roomType}`
    );
    setCommonId("");
    fetchData();
    setLoading(false);
  };

  const deleteCommonRoom = async (id: string) => {
    setLoading(true);
    await axios.delete(`http://localhost:8080/common-room/${id}`);
    fetchData();
    setLoading(false);
  };

  // ================= EFFECT =================

  useEffect(() => {
    fetchData();
  }, []);

  if (!building)
    return <div className="p-6 text-white text-center">Loading...</div>;

  // ================= STATUS =================

  const getStatusUI = (room: any) => {
    if (room.heatingOn)
      return (
        <span className="flex items-center gap-2 text-orange-400 font-medium">
          <Flame size={18} /> Heating
        </span>
      );

    if (room.coolingOn)
      return (
        <span className="flex items-center gap-2 text-blue-400 font-medium">
          <Snowflake size={18} /> Cooling
        </span>
      );

    return (
      <span className="flex items-center gap-2 text-gray-400">
        <Minus size={18} /> Idle
      </span>
    );
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-6 py-8">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 tracking-tight">
        🏢 Building Dashboard
      </h1>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-yellow-400 mb-4 animate-pulse">
          Updating...
        </div>
      )}

      {/* BUILDING CONTROL */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-xl mx-auto mb-10">
        <h2 className="text-lg font-semibold mb-3">Building Control</h2>

        <p className="text-gray-400 mb-4">
          Target Temperature:{" "}
          <span className="text-white font-bold text-lg">
            {building.requestedTemperature}°C
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            placeholder="Set temperature"
            value={newTemp}
            onChange={(e) => setNewTemp(e.target.value)}
            className="bg-white/5 border border-white/10 p-2 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />

          <button
            onClick={updateTemp}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>

      {/* ADD ROOMS */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">

        {/* ADD APARTMENT */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-lg font-semibold mb-4">Add Apartment</h3>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Room ID (e.g. 201)"
              value={aptId}
              onChange={(e) => setAptId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg text-white placeholder-gray-400 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/50 transition-all duration-200"
            />

            <input
              placeholder="Owner Name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg text-white placeholder-gray-400 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/50 transition-all duration-200"
            />

            <button
              onClick={addApartment}
              className="mt-2 px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Add Apartment
            </button>
          </div>
        </div>

        {/* ADD COMMON ROOM */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-lg font-semibold mb-4">Add Common Room</h3>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Room ID (e.g. CR3)"
              value={commonId}
              onChange={(e) => setCommonId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg text-white placeholder-gray-400 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/50 transition-all duration-200"
            />
            <div className="relative">
              {/* SELECT BUTTON */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white hover:bg-white/10 focus:ring-2 focus:ring-purple-500/60 transition-all"
              >
                <span>{roomType || "Select Room Type"}</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 mt-2 w-full bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden"
                >
                  {["Gym", "Library", "Laundry"].map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        setRoomType(type);
                        setDropdownOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-purple-500/20 cursor-pointer transition"
                    >
                      {type}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            <button
              onClick={addCommonRoom}
              className="mt-2 px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Add Common Room
            </button>
          </div>
        </div>
      </div>

      {/* APARTMENTS */}
      <h2 className="text-xl font-semibold mb-4">Apartments</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {building.apartments.map((room: any) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300"
          >
            <h3 className="font-semibold text-lg">Apartment {room.id}</h3>

            <p className="text-sm text-gray-400 mb-1">
              Owner: <span className="text-white">{room.ownerName}</span>
            </p>

            <p className="text-gray-300">
              Temp: <span className="text-white">{room.temperature}°C</span>
            </p>

            <div className="mt-2">{getStatusUI(room)}</div>

            <button
              onClick={() => deleteApartment(room.id)}
              className="mt-4 text-sm px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/40 transition cursor-pointer"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>

      {/* COMMON ROOMS */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Common Rooms</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {building.commonRooms.map((room: any) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300"
          >
            <h3 className="font-semibold text-lg">{room.type}</h3>

            <p className="text-gray-300">
              Temp: <span className="text-white">{room.temperature}°C</span>
            </p>

            <div className="mt-2">{getStatusUI(room)}</div>

            <button
              onClick={() => deleteCommonRoom(room.id)}
              className="mt-4 text-sm px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/40 transition cursor-pointer"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}