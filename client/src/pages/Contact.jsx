import React from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="lg:w-1/3">
            <span className="text-[#a3b18a] font-black text-[10px] tracking-[0.3em] uppercase block mb-4">
              Get in Touch
            </span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 italic">
              Contact the <span className="text-[#a3b18a]">Archive</span>.
            </h1>

            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl text-[#a3b18a]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Us</h4>
                  <p className="text-slate-500 text-sm">
                    support@sageshelf.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl text-[#a3b18a]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Location</h4>
                  <p className="text-slate-500 text-sm">
                    Tech Hub, Multan, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3">
            <div className="bg-slate-50 rounded-[40px] p-8 lg:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#a3b18a]/20 outline-none"
                      placeholder="Jonas Davies"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#a3b18a]/20 outline-none"
                      placeholder="jonas@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                    Subject
                  </label>
                  <select className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#a3b18a]/20 outline-none appearance-none">
                    <option>General Inquiry</option>
                    <option>Seller Support</option>
                    <option>Technical Issue</option>
                    <option>Copyright/DMCA</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#a3b18a]/20 outline-none resize-none"
                    placeholder="How can we help you explore the archive?"
                  ></textarea>
                </div>

                <button className="w-full bg-success hover:bg-[#059669] text-white py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-3">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
