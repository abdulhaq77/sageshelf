import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../schemas/auth.validation.schema.js";
import {
  Library,
  AlertTriangle,
  Store,
  BookOpen,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("customer");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(authSchema),
    mode: "onBlur",
    defaultValues: { role: "customer" },
  });

  // This watches all fields to trigger the "X" button visibility
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedFields = watch();

  const onSubmit = (data) => console.log("Form Submitted:", data);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary p-4 lg:p-8 overflow-hidden font-sans">
      <div className="w-full max-w-300 h-full max-h-200 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5">
        {/* --- Left Brand Section --- */}
        <div className="hidden md:flex w-1/2 relative p-10 flex-col justify-between h-full">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400"
              className="w-full h-full object-cover brightness-[0.35]"
              alt="Library"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="relative z-10 flex items-center gap-2">
            <Library className="w-8 h-8 text-[#a3b18a]" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Sage<span className="text-[#a3b18a]">Shelf</span>
            </span>
          </div>
          <div className="relative z-10 text-white">
            <h2 className="text-5xl font-extrabold leading-[1.1] mb-4 italic">
              Your Digital <br />{" "}
              <span className="text-[#a3b18a]">Knowledge</span> Archive.
            </h2>
            <p className="text-slate-300 text-sm max-w-sm font-medium">
              Join a global community of scholars.
            </p>
          </div>
        </div>

        {/* --- Right Form Section --- */}
        <div className="w-full md:w-1/2 bg-white flex flex-col h-full min-h-0">
          <div className="px-10 lg:px-16 pt-10 pb-4">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
              {isLogin ? "Welcome Back!" : "Join SageShelf"}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto px-10 lg:px-16 pb-12 custom-scrollbar">
            <div className="max-w-md mx-auto">
              {/* Toggle Switch */}
              <div className="flex gap-1 p-1 rounded-full mb-8 border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    reset();
                  }}
                  className={`flex-1 py-2.5 rounded-full text-[11px] font-black tracking-widest transition-all ${!isLogin ? "bg-[#1e293b] text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  SIGN UP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    reset();
                  }}
                  className={`flex-1 py-2.5 rounded-full text-[11px] font-black tracking-widest transition-all ${isLogin ? "bg-[#1e293b] text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  LOG IN
                </button>
              </div>

              {!isLogin && (
                <div className="mb-6 space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center block">
                    Role
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setUserRole("customer");
                        setValue("role", "customer");
                      }}
                      className={`flex-1 flex gap-3 items-center justify-center p-3 rounded-2xl border-2 transition-all ${userRole === "customer" ? "border-[#a3b18a] bg-[#a3b18a]/5 text-primary" : "border-slate-100 text-slate-400"}`}
                    >
                      <BookOpen className="w-4 h-4" />{" "}
                      <span className="text-[10px] font-bold">BUYER</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserRole("seller");
                        setValue("role", "seller");
                      }}
                      className={`flex-1 flex gap-3 items-center justify-center p-3 rounded-2xl border-2 transition-all ${userRole === "seller" ? "border-[#a3b18a] bg-[#a3b18a]/5 text-primary" : "border-slate-100 text-slate-400"}`}
                    >
                      <Store className="w-4 h-4" />{" "}
                      <span className="text-[10px] font-bold">SELLER</span>
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative h-20">
                      <label className="text-[10px] font-bold text-slate-400 absolute left-4 top-2 uppercase z-10">
                        First Name
                      </label>
                      <input
                        {...register("firstName")}
                        className="w-full px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-transparent focus:border-[#a3b18a] outline-none text-sm font-medium"
                        placeholder="Jonas"
                      />
                      <div className="absolute right-3 top-5">
                        {watchedFields.firstName && (
                          <X
                            className="w-4 h-4 text-slate-300 cursor-pointer"
                            onClick={() => setValue("firstName", "")}
                          />
                        )}
                      </div>
                      {errors.firstName && (
                        <span className="text-[10px] text-red-400 font-bold ml-2">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="relative h-20">
                      <label className="text-[10px] font-bold text-slate-400 absolute left-4 top-2 uppercase z-10">
                        Surname
                      </label>
                      <input
                        {...register("surname")}
                        className="w-full px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-transparent focus:border-[#a3b18a] outline-none text-sm font-medium"
                        placeholder="Davies"
                      />
                      <div className="absolute right-3 top-5">
                        {watchedFields.surname && (
                          <X
                            className="w-4 h-4 text-slate-300 cursor-pointer"
                            onClick={() => setValue("surname", "")}
                          />
                        )}
                      </div>
                      {errors.surname && (
                        <span className="text-[10px] text-red-400 font-bold ml-2">
                          {errors.surname.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {!isLogin && userRole === "seller" && (
                  <div className="relative h-20">
                    <label className="text-[10px] font-bold text-slate-400 absolute left-4 top-2 uppercase z-10">
                      Shop Name
                    </label>
                    <input
                      {...register("shopName")}
                      className="w-full px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-transparent focus:border-[#a3b18a] outline-none text-sm font-medium"
                      placeholder="e.g Global Books"
                    />
                    <div className="absolute right-3 top-5">
                      {watchedFields.shopName && (
                        <X
                          className="w-4 h-4 text-slate-300 cursor-pointer"
                          onClick={() => setValue("shopName", "")}
                        />
                      )}
                    </div>
                    {errors.shopName && (
                      <span className="text-[10px] text-red-400 font-bold ml-2">
                        {errors.shopName.message}
                      </span>
                    )}
                  </div>
                )}

                <div className="relative h-20">
                  <label className="text-[10px] font-bold text-slate-400 absolute left-4 top-2 uppercase z-10">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    className="w-full px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-transparent focus:border-[#a3b18a] outline-none text-sm font-medium"
                    placeholder="user@sageshelf.com"
                  />
                  <div className="absolute right-3 top-5">
                    {watchedFields.email && (
                      <X
                        className="w-4 h-4 text-slate-300 cursor-pointer"
                        onClick={() => setValue("email", "")}
                      />
                    )}
                  </div>
                  {errors.email && (
                    <span className="text-[10px] text-red-400 font-bold ml-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div
                  className={`grid ${isLogin ? "grid-cols-1" : "grid-cols-2"} gap-3`}
                >
                  <div className="relative h-20">
                    <label className="text-[10px] font-bold text-slate-400 absolute left-4 top-2 uppercase z-10">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type={showPass ? "text" : "password"}
                      className="w-full px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-transparent focus:border-[#a3b18a] outline-none text-sm font-medium"
                      placeholder="••••••••"
                    />
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-5 cursor-pointer text-slate-300"
                    >
                      {showPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </div>
                    {errors.password && (
                      <span className="text-[10px] text-red-400 font-bold ml-2">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  {!isLogin && (
                    <div className="relative h-20">
                      <label className="text-[10px] font-bold text-slate-400 absolute left-4 top-2 uppercase z-10">
                        Confirm
                      </label>
                      <input
                        {...register("confirmPassword")}
                        type={showConfirmPass ? "text" : "password"}
                        className="w-full px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-transparent focus:border-[#a3b18a] outline-none text-sm font-medium"
                        placeholder="••••••••"
                      />
                      <div
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-5 cursor-pointer text-slate-300"
                      >
                        {showConfirmPass ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </div>
                      {errors.confirmPassword && (
                        <span className="text-[10px] text-red-400 font-bold ml-2">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 py-4">
                  <input
                    type="checkbox"
                    {...register("agree")}
                    className="h-4 w-4 rounded border-slate-300 text-[#a3b18a] focus:ring-0 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 font-medium">
                    I accept the Terms and Archive Policy.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-success hover:bg-[#059669] text-white py-4 rounded-xl font-black text-xs tracking-[0.2em] uppercase transition-all shadow-lg active:scale-[0.95]"
                >
                  {isLogin ? "Authorize Account" : `Create ${userRole} Account`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
