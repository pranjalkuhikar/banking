import { useGetAccountQuery } from "../services/account.api";
import { useGetHistoryQuery } from "../services/transition.api";
import { Calendar, LayoutGrid, Plus, Menu } from "lucide-react";

const Dashboard = ({ onMenuClick }) => {
  const { data: accountData, isLoading: isAccountLoading } =
    useGetAccountQuery();
  const accountId = accountData?.account?._id;
  const balance = accountData?.account?.balance || 0;

  const { data: historyData, isLoading: isHistoryLoading } = useGetHistoryQuery(
    accountId,
    {
      skip: !accountId,
    },
  );

  const transactions = historyData?.transitions || [];

  // Helper to compare accounts (handles populated objects or IDs)
  const isUserRecipient = (tx) => {
    const toId = tx.toAccount?._id || tx.toAccount;
    return toId === accountId;
  };

  const isUserSender = (tx) => {
    const fromId = tx.fromAccount?._id || tx.fromAccount;
    return fromId === accountId;
  };

  // Calculate earnings and spending
  const totalEarnings = transactions
    .filter((tx) => isUserRecipient(tx) && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalSpending = transactions
    .filter((tx) => isUserSender(tx) && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Generate dynamic chart path
  const generateChartPath = () => {
    if (transactions.length === 0)
      return "M0,35 Q10,25 20,30 T40,20 T60,25 T80,10 T100,5";

    // Sort transactions by date (if not already)
    const sortedTx = [...transactions].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    // Simple normalization: map timestamps to 0-100 and amounts to 0-35
    const minTime = new Date(sortedTx[0].createdAt).getTime();
    const maxTime = new Date(sortedTx[sortedTx.length - 1].createdAt).getTime();
    const timeRange = maxTime - minTime || 1;

    const maxAmount = Math.max(...sortedTx.map((tx) => tx.amount)) || 1;

    let path = `M0,${35 - (sortedTx[0].amount / maxAmount) * 30}`;
    sortedTx.forEach((tx) => {
      const x =
        ((new Date(tx.createdAt).getTime() - minTime) / timeRange) * 100;
      const y = 35 - (tx.amount / maxAmount) * 30;
      path += ` L${x},${y}`;
    });
    return path;
  };

  if (isAccountLoading || isHistoryLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a] transition-colors duration-300">
      {/* Header omitted */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm">
            <Calendar className="w-4 h-4" />
            <span>This Month</span>
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap shadow-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>Manage Widgets</span>
          </button>
          <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm text-white font-medium transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span>Add new Widget</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* AI Insights placeholder */}
        <div className="lg:col-span-4 h-80 rounded-3xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] flex flex-col justify-between relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 dark:from-indigo-900/50 to-blue-500/5 dark:to-blue-900/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-xs font-medium text-blue-600 dark:text-blue-300 backdrop-blur-md self-start">
              AI Insights
            </div>
            <div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-gray-800 dark:bg-white" : "bg-gray-300 dark:bg-white/30"}`}
                  ></div>
                ))}
              </div>
              <h3 className="text-xl font-semibold leading-snug text-gray-900 dark:text-white max-w-[90%]">
                {"No insights available."}
              </h3>
              <button className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-[#1e2235] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#2a2f4c] transition-colors border border-gray-200 dark:border-[#232738] shadow-sm">
                <span className="text-gray-900 dark:text-white -rotate-45 text-lg">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 h-80 rounded-3xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] p-6 relative shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">
            Balance Overview
          </h3>
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {balance.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center bg-emerald-100 dark:bg-emerald-400/10 px-2 py-0.5 rounded text-[10px] sm:text-xs mb-1">
              ↑ 0%
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                From last month
              </span>
            </span>
          </div>
          <div className="flex gap-2 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-transparent">
              <span className="text-gray-400 dark:text-gray-500">⇄</span>{" "}
              {transactions.length} Transactions
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-transparent">
              <span className="text-gray-400 dark:text-gray-500">⬡</span>{" "}
              {"No categories available."}
            </div>
          </div>
          <div className="absolute bottom-10 left-6 right-6 h-24 border-b border-dashed border-gray-300 dark:border-white/10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <path
                d={generateChartPath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-2 px-1">
              {["15", "16", "17", "18", "19", "20", "21", "22", "23", "24"].map(
                (d) => (
                  <span
                    key={d}
                    className={
                      d === "21"
                        ? "text-blue-600 dark:text-white bg-blue-50 dark:bg-white/10 px-1 rounded font-medium"
                        : ""
                    }
                  >
                    {d}
                  </span>
                ),
              )}
            </div>
          </div>
          <button className="absolute top-6 right-6 w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-transparent">
            <span className="-rotate-45 text-xs">→</span>
          </button>
        </div>

        <div className="lg:col-span-4 md:col-span-2 h-80 rounded-3xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] p-6 relative shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">
            Earnings
          </h3>
          <div className="flex flex-wrap items-end gap-3 mb-8">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {totalEarnings.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center bg-emerald-100 dark:bg-emerald-400/10 px-2 py-0.5 rounded text-[10px] sm:text-xs mb-1">
              ↑ 0%
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                From last month
              </span>
            </span>
          </div>
          <div className="flex justify-center mt-6">
            <div className="relative w-48 h-24 overflow-hidden">
              <div className="absolute inset-0 box-border border-[16px] border-gray-100 dark:border-[#1e2235] rounded-t-[100px] border-b-0"></div>
              <div className="absolute top-0 left-0 w-[100%] h-full overflow-hidden origin-bottom-right">
                <div
                  className="absolute top-0 left-0 w-full h-full box-border border-[16px] border-blue-500 rounded-t-[100px] border-b-0"
                  style={{
                    transform: `rotate(${(totalEarnings / (totalEarnings + totalSpending || 1)) * 180}deg)`,
                    transformOrigin: "bottom center",
                  }}
                ></div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Growth
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(
                    (totalEarnings / (totalEarnings + totalSpending || 1)) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Current
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500"></span>{" "}
              Month goal
            </div>
          </div>
          <button className="absolute top-6 right-6 w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-transparent">
            <span className="-rotate-45 text-xs">→</span>
          </button>
        </div>

        <div className="md:col-span-2 lg:col-span-8 bg-white dark:bg-[#151828] rounded-3xl border border-gray-200 dark:border-[#232738] p-6 relative shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Transactions
            </h3>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-transparent">
                <span className="text-xs">▼</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-transparent">
                <span className="-rotate-45 text-xs">→</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 overflow-x-auto pb-4">
            <div className="min-w-[600px]">
              {transactions.map((tx) => {
                const isRecipient = isUserRecipient(tx);
                const otherAccount = isRecipient
                  ? tx.fromAccount
                  : tx.toAccount;
                const otherAccountLabel =
                  otherAccount?.accountNumber ||
                  otherAccount?._id ||
                  otherAccount ||
                  "Unknown";

                return (
                  <div
                    key={tx._id}
                    className="flex items-center justify-between group mb-4"
                  >
                    <div className="flex items-center gap-4 w-1/4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0
                        ${
                          isRecipient
                            ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500"
                            : "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500"
                        }`}
                      >
                        {isRecipient ? "↙" : "↗"}
                      </div>
                      <span className="font-medium text-sm text-gray-900 dark:text-gray-200 truncate">
                        {isRecipient ? "Credit" : "Debit"}
                      </span>
                    </div>
                    <div className="w-1/4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="truncate">
                        Acc: {String(otherAccountLabel).slice(-6)}
                      </span>
                    </div>
                    <div className="w-1/4 text-sm text-gray-500 dark:text-gray-400 text-left truncate px-2">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </div>
                    <div
                      className={`w-1/4 text-right font-medium text-sm ${isRecipient ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-200"}`}
                    >
                      {isRecipient ? "+" : "-"}
                      {tx.amount.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-4 bg-white dark:bg-[#151828] rounded-3xl border border-gray-200 dark:border-[#232738] p-6 relative shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Spending
            </h3>
            <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-transparent">
              <span className="-rotate-45 text-xs">→</span>
            </button>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalSpending.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="text-red-600 dark:text-red-400 font-medium flex items-center bg-red-100 dark:bg-red-400/10 px-2 py-0.5 rounded text-xs mb-1">
              ↓ 0%
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                From last month
              </span>
            </span>
          </div>

          <div className="flex items-end justify-between mt-12 h-32 px-2 pb-4 border-b border-gray-200 dark:border-white/5">
            {/* Spending categories placeholder bar chart */}
            {[
              { name: "Rent", value: 40 },
              { name: "Food", value: 70 },
              { name: "Shop", value: 30 },
              { name: "Ent", value: 55 },
            ].map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 flex-1 group"
              >
                <div
                  className="w-full max-w-10 rounded-t-lg bg-linear-to-t from-gray-200 dark:from-[#1e2235] to-blue-400 dark:to-blue-500/80 relative group-hover:to-blue-500 dark:group-hover:to-blue-400 transition-colors"
                  style={{ height: `${cat.value * 1.5}px` }}
                ></div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
