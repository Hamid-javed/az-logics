// src/utils/dateUtils.js
import { DateTime } from "luxon";

const DEFAULT_TIMEZONE = "Asia/Karachi";

export const getToday = () => DateTime.now().setZone(DEFAULT_TIMEZONE);


export function diffInHours(fromDate: string, toDate: string = DateTime.now().setZone(DEFAULT_TIMEZONE)) {
  const from = DateTime.fromJSDate(new Date(fromDate)).setZone(DEFAULT_TIMEZONE);
  const to = DateTime.fromJSDate(new Date(toDate)).setZone(DEFAULT_TIMEZONE);
  return to.diff(from, "hours").hours;
}

// Dashboard metrics utility functions
export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '0';

  // Format with Indian numbering system (lakhs and crores)
  if (numAmount >= 10000000) { // 1 crore
    return `${(numAmount / 10000000).toFixed(1)}Cr`;
  } else if (numAmount >= 100000) { // 1 lakh
    return `${(numAmount / 100000).toFixed(1)}L`;
  } else if (numAmount >= 1000) { // 1 thousand
    return `${(numAmount / 1000).toFixed(1)}K`;
  }

  return numAmount.toLocaleString('en-IN');
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const calculateGrowthRate = (current: number, previous: number): string => {
  const percentage = calculatePercentageChange(current, previous);
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(1)}%`;
};

export const aggregateMetrics = (metrics: any): any => {
  if (!metrics) return {};

  const aggregated = { ...metrics };

  // Calculate total collections (cash + online)
  const cashCollections = metrics.total_collections_this_month_cash?.value || 0;
  const onlineCollections = metrics.total_collections_this_month_online?.value || 0;
  aggregated.total_collections_combined = {
    name: 'Total Collections',
    value: cashCollections + onlineCollections,
    icon: 'total_collections',
    filter: {}
  };

  // Calculate collection efficiency (paid customers / total customers)
  const paidCustomers = metrics.paid_customers?.value || 0;
  const totalCustomers = metrics.total_customers?.value || 0;
  if (totalCustomers > 0) {
    const efficiency = (paidCustomers / totalCustomers) * 100;
    aggregated.collection_efficiency = {
      name: 'Collection Efficiency',
      value: `${efficiency.toFixed(1)}%`,
      icon: 'efficiency',
      filter: {}
    };
  }

  // Calculate average transaction value
  const totalTransactions = metrics.total_transactions?.value || 0;
  const totalAmount = aggregated.total_collections_combined?.value || 0;
  if (totalTransactions > 0) {
    const avgTransaction = totalAmount / totalTransactions;
    aggregated.average_transaction = {
      name: 'Avg Transaction',
      value: formatCurrency(avgTransaction),
      icon: 'avg_transaction',
      filter: {}
    };
  }

  return aggregated;
};