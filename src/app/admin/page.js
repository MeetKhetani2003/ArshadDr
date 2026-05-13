"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, BookOpen, Calendar, Clock, 
  ChevronRight, ArrowUpRight, CheckCircle, 
  XCircle, Filter, Search, Mail
} from "lucide-react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, online: 0 });

  useEffect(() => {
    const fetchBookings = async () => {
      // For now, we'll fetch from our API. 
      // We need to create a GET route for bookings.
      try {
        const res = await fetch("/api/bookings");
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
          
          setStats({
            total: data.length,
            pending: data.filter(b => b.status === 'Pending').length,
            online: data.filter(b => b.consultType === 'Online').length
          });
        }
      } catch (err) {
        console.error("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-medical-blue tracking-tight">Clinical Management</h1>
            <p className="text-slate-500 mt-2">Oversee your appointments and clinical insights</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/blogs" className="btn-modern btn-primary py-3 px-6 text-sm">
              Upload Blog <BookOpen size={18} />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Bookings", value: stats.total, icon: Calendar, color: "bg-medical-blue" },
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "bg-amber-500" },
            { label: "Online Consults", value: stats.online, icon: Mail, color: "bg-medical-teal" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-medical-blue">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center`}>
                <stat.icon size={28} />
              </div>
            </div>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-bold text-medical-blue">Recent Appointments</h2>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-medical-blue"><Search size={20} /></button>
              <button className="p-2 text-slate-400 hover:text-medical-blue"><Filter size={20} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50">
                  <th className="px-8 py-5">Patient Details</th>
                  <th className="px-8 py-5">Appointment</th>
                  <th className="px-8 py-5">Treatment / Doctor</th>
                  <th className="px-8 py-5">Mode</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.length > 0 ? bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-medical-blue">{booking.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{booking.phone}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium text-slate-600">{booking.date}</div>
                      <div className="text-xs text-slate-400 mt-1">{booking.time}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-medical-blue">{booking.treatment}</div>
                      <div className="text-xs text-medical-teal font-medium mt-1">{booking.doctor}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider ${
                        booking.consultType === 'Online' ? 'bg-medical-teal/10 text-medical-teal' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {booking.consultType}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-xs font-bold text-slate-600">{booking.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                          <CheckCircle size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="max-w-xs mx-auto">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users size={32} className="text-slate-200" />
                        </div>
                        <p className="text-medical-blue font-bold">No appointments yet</p>
                        <p className="text-sm text-slate-400 mt-2">When patients book slots, they will appear here for your review.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
