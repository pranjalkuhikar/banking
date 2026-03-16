import React from "react";
import {
  CreditCard,
  Plus,
  Menu,
  ShieldCheck,
  Zap,
  Lock,
  Loader2,
  Sparkles,
  ArrowRight,
  Wallet,
  Globe,
  TrendingUp,
  Fingerprint,
} from "lucide-react";
import { useProfileQuery } from "../services/auth.api";
import {
  useGetAccountQuery,
  useCreateAccountMutation,
} from "../services/account.api";

const Accounts = ({ onMenuClick }) => {
  const { data: profile } = useProfileQuery();
  const { data, isLoading, error } = useGetAccountQuery();
  const [createAccount, { isLoading: isCreating }] = useCreateAccountMutation();

  const handleCreateAccount = async () => {
    try {
      await createAccount({}).unwrap();
      // Refetch is handled automatically by RTK Query tags
    } catch (err) {
      console.error("Failed to create account:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin relative z-10" />
        </div>
      </div>
    );
  }

  // State 1: No Account Found (404)
  if (error?.status === 404 || !data?.account) {
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a]">
        <div className="max-w-4xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center relative z-10 rotate-3 group-hover:rotate-6 transition-transform shadow-2xl shadow-blue-500/40">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Elevate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Finance
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-10 leading-relaxed font-medium">
            Join the elite circle of NeuroBank users and unlock a new dimension
            of digital banking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 w-full max-w-2xl">
            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  Elite Security
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Military-grade protection for your wealth.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  Instant Scale
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deploy capital globally in milliseconds.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateAccount}
            disabled={isCreating}
            className="group relative flex items-center gap-3 px-14 py-5 rounded-[2rem] bg-gray-900 dark:bg-white text-white dark:text-black font-black text-lg overflow-hidden transition-all transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {isCreating ? (
              <Loader2 className="w-6 h-6 animate-spin relative z-10" />
            ) : (
              <>
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Generate Portfolio
                </span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 relative z-10 group-hover:text-white transition-all" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // State 2: Account Exists
  const account = data.account;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-gray-600 dark:text-gray-300 shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Main Vault
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Manage your primary assets and liquidity
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
              {account.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Refined "Onyx Reserve" Account Card with Responsive Design */}
          <div className="lg:col-span-2 group">
            <div className="relative p-6 sm:p-10 lg:p-14 rounded-[32px] sm:rounded-[48px] lg:rounded-[56px] overflow-hidden transition-all duration-700 transform hover:scale-[1.01] shadow-2xl shadow-blue-900/10 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
              {/* Deep Onyx Base */}
              <div className="absolute inset-0 bg-[#05070a]"></div>

              {/* Sophisticated Lighting */}
              <div className="absolute -top-[40%] -right-[20%] w-[100%] h-[150%] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent blur-[120px] rounded-full"></div>
              <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[90px] rounded-full animate-pulse"></div>

              {/* Structural Accents */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              <div className="absolute inset-0 rounded-[32px] sm:rounded-[48px] lg:rounded-[56px] border border-white/10 pointer-events-none"></div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col h-full justify-between gap-8 sm:gap-12">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-inner">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-white/40 font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-1">
                        NeuroBank
                      </p>
                      <h4 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                        Onyx Reserve
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[7px] sm:text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2 sm:mb-3">
                      Priority Elite
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-mono text-white/20 tracking-tighter uppercase whitespace-nowrap">
                      ID: {account._id?.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-12">
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-white/30 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1.5 sm:mb-2">
                        Cardholder
                      </p>
                      <p className="text-base sm:text-xl font-bold text-white tracking-wide uppercase">
                        {profile?.user?.fullName?.firstName}{" "}
                        {profile?.user?.fullName?.lastName}
                      </p>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-[8px] sm:text-[10px] text-white/30 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                        Available Liquidity
                      </p>
                      <div className="flex items-baseline gap-2 sm:gap-4">
                        <span className="text-lg sm:text-2xl text-white/20 font-black tracking-tighter">
                          {account.currency}
                        </span>
                        <span className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-[0_10px_40px_rgba(59,130,246,0.3)]">
                          {account.balance.toLocaleString("en-IN")}
                          <span className="text-xl sm:text-3xl text-white/40 font-bold">
                            .00
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative group/id max-w-full overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl -m-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 py-5 sm:py-6 flex flex-col items-start md:items-end group-hover:border-white/30 transition-all">
                      <p className="text-[8px] sm:text-[9px] text-white/30 uppercase font-black tracking-widest mb-1.5 sm:mb-2">
                        Vault Identifier
                      </p>
                      <p className="text-lg sm:text-2xl font-mono font-black text-white tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap overflow-hidden text-ellipsis w-full">
                        {account.accountNumber.match(/.{1,4}/g)?.join(" ") ||
                          account.accountNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance & Stats Overview (Inspired by Image 454) */}
            <div className="mt-8 bg-[#0a0c14] rounded-[32px] border border-white/5 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] sm:text-xs text-gray-500 font-black uppercase tracking-[0.2em]">
                    Available Balance
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">
                      INR
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
                      {account.balance.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#1a1d2d] text-white font-bold text-sm hover:bg-[#232738] transition-all border border-white/5">
                    Send Money
                  </button>
                </div>
              </div>
            </div>

            {/* Account Details / Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {[
                {
                  label: "Nominal Rate",
                  value: "4.25%",
                  icon: TrendingUp,
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  label: "Global Liquidity",
                  value: "Liquid",
                  icon: Globe,
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  label: "Reserve Limit",
                  value: "∞",
                  icon: Wallet,
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#0f1221] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-black text-gray-900 dark:text-white uppercase">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Side Control Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0f1221] rounded-[40px] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.3em]">
                Security Matrix
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Biometric Key",
                    icon: Fingerprint,
                    color: "blue",
                    active: true,
                  },
                  {
                    label: "Geo-Lock",
                    icon: Globe,
                    color: "emerald",
                    active: true,
                  },
                  {
                    label: "Freeze Assets",
                    icon: Lock,
                    color: "red",
                    active: false,
                  },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-transparent hover:border-blue-500/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-2xl bg-${tool.color}-500/10 text-${tool.color}-500 flex items-center justify-center`}
                      >
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black tracking-tight text-gray-700 dark:text-gray-300">
                        {tool.label}
                      </span>
                    </div>
                    <div
                      className={`w-10 h-5 rounded-full relative p-1 transition-colors ${tool.active ? "bg-emerald-500" : "bg-gray-200 dark:bg-white/10"}`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full transition-all ${tool.active ? "ml-auto" : ""}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-blue-600/20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 mb-6 opacity-30" />
                <h3 className="text-xl font-black mb-3 leading-tight tracking-tight text-white">
                  Upgrade to
                  <br />
                  Alpha Prime
                </h3>
                <p className="text-white/60 text-xs mb-8 leading-relaxed font-medium">
                  Join our exclusive tier for institutional-grade features and
                  zero fees.
                </p>
                <button className="w-full py-4 rounded-2xl bg-white text-blue-600 font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl">
                  Claim Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
