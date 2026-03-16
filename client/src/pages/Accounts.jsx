import React from "react";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  MoreHorizontal,
  Menu,
  ShieldCheck,
  Zap,
  Lock
} from "lucide-react";

const Accounts = ({ onMenuClick }) => {
  const accounts = [
    {
      id: 1,
      type: "Savings Account",
      number: "**** 8829",
      balance: "12,450.00",
      color: "from-blue-600 to-indigo-700",
      status: "Primary"
    },
    {
      id: 2,
      type: "Checking Account",
      number: "**** 4521",
      balance: "2,440.50",
      color: "from-emerald-600 to-teal-700",
      status: "Active"
    },
    {
      id: 3,
      type: "Digital Wallet",
      number: "**** 1029",
      balance: "890.20",
      color: "from-purple-600 to-pink-700",
      status: "Secondary"
    }
  ];

  const recentTransactions = [
    { id: 1, merchant: "Apple Store", date: "Mar 15, 2024", amount: "-$1,299.00", category: "Electronics", status: "Completed" },
    { id: 2, merchant: "Gas Station", date: "Mar 14, 2024", amount: "-$65.40", category: "Transport", status: "Completed" },
    { id: 3, merchant: "Payroll Deposit", date: "Mar 12, 2024", amount: "+$3,400.00", category: "Income", status: "Completed" },
    { id: 4, merchant: "Netflix Subscription", date: "Mar 10, 2024", amount: "-$15.99", category: "Entertainment", status: "Pending" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-gray-600 dark:text-gray-300 shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Overview</h2>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-600/20">
            <Plus className="w-4 h-4" />
            <span>Open New Account</span>
          </button>
        </div>

        {/* Account Cards - Horizontal Scroll on Tablet/Mobile */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {accounts.map((acc) => (
            <div 
              key={acc.id}
              className={`min-w-[300px] md:min-w-[340px] p-6 rounded-[32px] bg-gradient-to-br ${acc.color} text-white relative overflow-hidden group shadow-xl shadow-blue-900/10 cursor-pointer transform transition-all hover:scale-[1.02]`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-colors"></div>
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-xs text-white/70 font-medium uppercase tracking-widest">{acc.type}</p>
                  <p className="text-sm font-bold mt-1 text-white/90">{acc.number}</p>
                </div>
                <div className="px-2 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                  {acc.status}
                </div>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Total Balance</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">${acc.balance}</span>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
                 <CreditCard className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Recent Activity Table */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0f1221] rounded-3xl border border-gray-200 dark:border-white/5 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
              <button className="text-sm text-blue-500 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount.startsWith("-") ? "bg-red-50 dark:bg-red-500/10 text-red-600" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"}`}>
                      {tx.amount.startsWith("-") ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{tx.merchant}</p>
                      <p className="text-xs text-gray-500">{tx.date} • {tx.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${tx.amount.startsWith("-") ? "text-gray-900 dark:text-white" : "text-emerald-500"}`}>
                      {tx.amount}
                    </p>
                    <p className={`text-[10px] font-bold uppercase ${tx.status === "Pending" ? "text-amber-500" : "text-gray-400"}`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings / Quick Features */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0f1221] rounded-3xl border border-gray-200 dark:border-white/5 p-6 shadow-sm">
               <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Security Features</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group overflow-hidden relative">
                    <div className="flex items-center gap-3 z-10">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                            <Lock className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Card Freeze</span>
                    </div>
                    <div className="w-10 h-5 bg-gray-200 dark:bg-white/10 rounded-full relative p-1 cursor-pointer z-10">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group overflow-hidden relative">
                    <div className="flex items-center gap-3 z-10">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Auto-Savings</span>
                    </div>
                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 cursor-pointer z-10">
                        <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group overflow-hidden relative">
                    <div className="flex items-center gap-3 z-10">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center">
                            <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Instant Rewards</span>
                    </div>
                    <div className="w-10 h-5 bg-amber-500 rounded-full relative p-1 cursor-pointer z-10">
                        <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Support/More Card */}
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-6 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <h4 className="font-bold mb-2">Need help?</h4>
                <p className="text-xs text-white/60 mb-6">Our priority support is available 24/7 for premium members.</p>
                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-sm font-bold transition-all border border-white/5">
                    Contact Support
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
