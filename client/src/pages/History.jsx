import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Clock,
  MoreVertical,
  Menu,
  ShieldCheck,
  Building2,
  RefreshCcw,
  Loader2
} from "lucide-react";
import { useGetAccountQuery } from "../services/account.api";
import { useGetHistoryQuery } from "../services/transition.api";

const History = ({ onMenuClick }) => {
  const { data: accountData, isLoading: isAccountLoading } = useGetAccountQuery();
  const accountId = accountData?.account?._id;

  const { data: historyData, isLoading: isHistoryLoading, refetch } = useGetHistoryQuery(accountId, {
    skip: !accountId,
  });

  const transactions = historyData?.transitions || [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isAccountLoading || isHistoryLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin relative z-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-gray-600 dark:text-gray-300 shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Transaction Archive
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Comprehensive record of all ledger movements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()}
              className="p-3 rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-gray-500 hover:text-blue-500 transition-all shadow-sm group"
              title="Refresh History"
            >
              <RefreshCcw className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
            </button>
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search ledger..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop View Table */}
        <div className="bg-white dark:bg-[#0f1221] rounded-[40px] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction / ID</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hidden sm:table-cell">Date & Time</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hidden lg:table-cell">Account Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
                {transactions.length > 0 ? (
                  transactions.map((tx) => {
                    const isDebit = String(tx.fromAccount?._id || tx.fromAccount) === String(accountId);
                    return (
                      <tr 
                        key={tx._id} 
                        className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                              isDebit 
                                ? "bg-red-50 dark:bg-red-500/10 text-red-600" 
                                : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"
                            }`}>
                              {isDebit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-900 dark:text-white">
                                {isDebit ? "Funds Outbound" : "Inbound Credit"}
                              </p>
                              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
                                TXN-{tx._id.slice(-8).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 hidden sm:table-cell">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              {formatDate(tx.createdAt)}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400">
                              <Clock className="w-3 h-3" />
                              {formatTime(tx.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 hidden lg:table-cell">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="max-w-[150px]">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                                {isDebit ? "Recipient" : "Source"}
                              </p>
                              <p className="text-sm font-mono font-bold text-gray-700 dark:text-gray-300 truncate">
                                {isDebit 
                                  ? (tx.toAccount?.accountNumber || "External Vendor") 
                                  : (tx.fromAccount?.accountNumber || "System Gen")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className={`text-base font-black tracking-tight ${
                            isDebit ? "text-gray-900 dark:text-white" : "text-emerald-500"
                          }`}>
                            {isDebit ? "-" : "+"}
                            {tx.amount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                            tx.status === "completed" 
                              ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600" 
                              : tx.status === "pending"
                                ? "bg-amber-50 dark:bg-amber-500/10 border-amber-500/20 text-amber-600"
                                : "bg-red-50 dark:bg-red-500/10 border-red-500/20 text-red-600"
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              tx.status === "completed" ? "bg-emerald-500" : tx.status === "pending" ? "bg-amber-500" : "bg-red-500"
                            } ${tx.status === "pending" ? "animate-pulse" : ""}`}></div>
                            {tx.status}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-gray-400">
                        <div className="w-16 h-16 rounded-3xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                          <Search className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="font-bold text-sm">No ledger entries found</p>
                        <p className="text-xs max-w-[200px]">All future transactions will automatically appear here once initiated.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Placeholder */}
          <div className="px-8 py-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Showing {transactions.length} of {transactions.length} entries
            </p>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 text-xs font-bold text-gray-400 disabled:opacity-50">Previous</button>
              <button disabled className="px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 text-xs font-bold text-gray-400 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>

        {/* Security / System Footer */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-3 text-gray-400">
            <ShieldCheck className="w-4 h-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">Quant-Level Encryption Active</p>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold text-gray-400 group cursor-pointer hover:text-blue-500 transition-colors uppercase tracking-widest">Legal Disclosure</p>
            <p className="text-[10px] font-bold text-gray-400 group cursor-pointer hover:text-blue-500 transition-colors uppercase tracking-widest">Download API Logs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
