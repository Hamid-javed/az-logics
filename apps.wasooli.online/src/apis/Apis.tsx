import axios, { AxiosError } from 'axios'

const BASE_URL = 'https://api.dev.wasooli.online/api'

export const API_ENDPOINTS = {
  GET_OTP: '/auth/token/',
  LOGIN: '/auth/token/',
  USER_PROFILE: '/auth/access-info/',
  DASHBOARD_METRICS: '/merchants/{merchant_id}/dashboard',
  MEMBER_PROFILE: '/members/{member_id}',
  MEMBERS_LIST: '/merchants/{merchant_id}/members/',
  CUSTOMER_METRICS: '/members/{member_id}/profile/',
  CUSTOMER_INVOICES: '/members/{member_id}/invoices/',
  TRANSACTIONS: '/merchants/{merchant_id}/memberships-transactions/',
  EXPENSES_LIST: '/merchants/{merchant_id}/expenses/',
  EXPENSE_DETAIL: '/expenses/{expense_id}/',
  TRANSACTION_HISTORY: '/transaction-history/{transaction_id}/',
  SUBSCRIPTION_STATS: '/merchants/{merchant_id}/subscription-stats/',
  MERCHANT_INVOICES: '/merchants/{merchant_id}/invoices/',
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
})

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableStatuses: [408, 429, 500, 502, 503, 504],
}

// Utility function to delay execution
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Enhanced API call with retry logic
async function apiCallWithRetry<T>(
  apiCall: () => Promise<T>,
  context: string = 'API Call'
): Promise<T> {
  let lastError: any

  for (let attempt = 1; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      console.log(`${context} - Attempt ${attempt}/${RETRY_CONFIG.maxRetries}`)
      const result = await apiCall()

      if (attempt > 1) {
        console.log(`${context} - Succeeded on attempt ${attempt}`)
      }

      return result
    } catch (error) {
      lastError = error
      const apiError = handleApiError(error)

      console.warn(`${context} - Attempt ${attempt} failed:`, {
        message: apiError.message,
        status: apiError.status,
        type: apiError.type,
        retryable: apiError.retryable
      })

      // Don't retry if not retryable or if it's the last attempt
      if (!apiError.retryable || attempt === RETRY_CONFIG.maxRetries) {
        break
      }

      // Wait before retrying
      const delayTime = RETRY_CONFIG.retryDelay * Math.pow(2, attempt - 1) // Exponential backoff
      console.log(`${context} - Retrying in ${delayTime}ms...`)
      await delay(delayTime)
    }
  }

  throw lastError
}

// Types
export interface Transaction {
  id: string
  value: string
  balance: string
  metadata?: {
    created_by?: string
    created_by_member?: string
    remarks?: string
  }
  invoices: Invoice[]
  is_online: boolean
  created_at: string
  updated_at: string
  payment_method: string
  transaction_type: string
  merchant_membership: MerchantMembership
}

export interface Invoice {
  id: string
  allocation_history?: AllocationHistory[]
  handled_by?: string | null
  created_at: string
  status: string
  is_monthly: boolean
  metadata?: any
  total_amount: string
  due_amount: string
  due_date: string
  code: string
  name: string
  type: string
  membership: string
  applied_amount: string
}

export interface AllocationHistory {
  amount: string
  created_at: string
  transaction_info: {
    performed_by?: string | null
    is_online: boolean
  }
}

export interface MerchantMembership {
  id: string
  picture: string
  member: Member
  account: string
  nickname: string
}

export interface Member {
  id: string
  user: {
    first_name: string
  }
  picture: string
  code: string
}

export interface TransactionsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Transaction[]
  summary: any
}

export interface Transaction {
  id: string
  value: string
  balance: string
  metadata?: {
    created_by?: string
    created_by_member?: string
    remarks?: string
  }
  invoices: Invoice[]
  is_online: boolean
  created_at: string
  updated_at: string
  payment_method: string
  transaction_type: string
  merchant_membership: MerchantMembership
}

export interface Invoice {
  id: string
  allocation_history?: AllocationHistory[]
  handled_by?: string | null
  created_at: string
  status: string
  is_monthly: boolean
  metadata?: any
  total_amount: string
  due_amount: string
  due_date: string
  code: string
  name: string
  type: string
  membership: string
  applied_amount: string
}

export interface AllocationHistory {
  amount: string
  created_at: string
  transaction_info: {
    performed_by?: string | null
    is_online: boolean
  }
}

export interface MerchantMembership {
  id: string
  picture: string
  member: Member
  account: string
  nickname: string
}

export interface Member {
  id: string
  user: {
    first_name: string
  }
  picture: string
  code: string
}

export interface TransactionsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Transaction[]
  summary: any
}

interface ApiError {
  message: string
  status: number | null
  data: any
  type: 'network' | 'server' | 'client' | 'timeout' | 'unknown'
  retryable: boolean
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  access_token?: string
  remaining_time?: number
}

// Enhanced error handler with error types and retry logic
const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>

    if (axiosError.response) {
      // Server responded with error status
      const status = axiosError.response.status
      const responseData = axiosError.response.data || {}

      let errorType: ApiError['type'] = 'server'
      let retryable = false

      // Determine error type and retryability based on status code
      switch (status) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 422:
          errorType = 'client'
          retryable = false
          break
        case 408:
        case 429:
          errorType = 'server'
          retryable = true
          break
        case 500:
        case 502:
        case 503:
        case 504:
          errorType = 'server'
          retryable = true
          break
        default:
          errorType = 'server'
          retryable = status >= 500
      }

      return {
        message: (responseData.detail || responseData.message || responseData.error || `Request failed with status ${status}`) as string,
        status,
        data: responseData,
        type: errorType,
        retryable
      }
    } else if (axiosError.request) {
      // Request was made but no response received (network error)
      return {
        message: 'No response from server. Please check your internet connection.',
        status: null,
        data: null,
        type: 'network',
        retryable: true
      }
    } else if (axiosError.code === 'ECONNABORTED') {
      // Timeout error
      return {
        message: 'Request timed out. Please try again.',
        status: null,
        data: null,
        type: 'timeout',
        retryable: true
      }
    }
  }

  // Unknown error
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
  return {
    message: errorMessage,
    status: null,
    data: null,
    type: 'unknown',
    retryable: false
  }
}

// Get OTP API
export const tokenApi = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await api.post(API_ENDPOINTS.GET_OTP, data)
    return {
      success: true,
      data: response.data,
      remaining_time: response.data?.remaining_time,
      message: response.data?.message
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Login API
export const loginApi = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, data)
    return {
      success: true,
      data: response.data,
      access_token: response.data?.access
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// User Profile API
export const userProfileApi = async (token?: string): Promise<ApiResponse> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}


    const response = await api.get(API_ENDPOINTS.USER_PROFILE, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Dashboard Metrics API with retry logic
export const getDashboardMetricsApi = async (
  merchantId: string,
  token?: string
): Promise<ApiResponse> => {
  try {
    const result = await apiCallWithRetry(async () => {
      const config = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {}

      // Replace {merchant_id} placeholder with actual merchantId
      const endpoint = API_ENDPOINTS.DASHBOARD_METRICS.replace('{merchant_id}', merchantId)

      const response = await api.get(endpoint, config)
      return response
    }, 'Dashboard Metrics API')

    return {
      success: true,
      data: result.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Member Profile API
export const getMembersProfile = async (
  memberId: string = "",
  token?: string
): Promise<ApiResponse> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        role: 'Staff'
      }
    } : {
      params: {
        role: 'Staff'
      }
    }


    // Replace {member_id} placeholder with actual memberId
    const endpoint = API_ENDPOINTS.MEMBER_PROFILE.replace('{member_id}', memberId)


    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Member/Customer Details API
export const getMembersDetailService = async (
  memberId: string = "",
  flag?: string,
  token?: string
): Promise<ApiResponse> => {
  try {
    const params: any = {}
    if (flag) {
      params.role = flag
    }

    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    } : {
      params
    }


    // Replace {member_id} placeholder with actual memberId
    const endpoint = API_ENDPOINTS.MEMBER_PROFILE.replace('{member_id}', memberId)


    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Customer Metrics API
export const getCustomerMetricsApi = async (
  customerId: string,
  token?: string
): Promise<ApiResponse> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}


    // Replace {member_id} placeholder with actual customerId
    const endpoint = API_ENDPOINTS.CUSTOMER_METRICS.replace('{member_id}', customerId)


    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Customer Invoices API
export const getCustomerInvoicesApi = async (
  customerId: string,
  token?: string
): Promise<ApiResponse> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}


    // Replace {member_id} placeholder with actual customerId
    const endpoint = API_ENDPOINTS.CUSTOMER_INVOICES.replace('{member_id}', customerId)


    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Members/Customers List API
export const getMembersService = async (
  merchantId: string = "",
  flag: string = "",
  page: number = 1,
  search?: string,
  limit: number = 10,
  isSupplyBalance: boolean | null = null,
  isBalance: boolean | null = null,
  metricCardFilter: any = {},
  selectedListItem: { key: string; value: any } | null = null,
  isActive: boolean | null = null,
  isPayOnline: boolean | null = null,
  token?: string
): Promise<ApiResponse> => {
  try {
    const params: any = {
      page,
      page_size: limit,
      ...(search ? { search } : {}),
      ...(selectedListItem ? { [selectedListItem.key]: selectedListItem.value } : {}),
      ...(isSupplyBalance !== null ? { supply_balance: isSupplyBalance } : {}),
      ...(isBalance !== null ? { balance: isBalance } : {}),
      ...(isActive !== null ? { is_active: isActive } : {}),
      ...(isPayOnline !== null ? { is_pay_online: isPayOnline } : {}),
      ...(flag ? { role: flag } : {}),
      ...(metricCardFilter || {}),
    }

    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    } : {
      params
    }


    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.MEMBERS_LIST.replace('{merchant_id}', merchantId)


    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Staff List API
export const getStaffListService = async (
  merchantId: string = "",
  page: number = 1,
  limit: number = 10,
  search?: string,
  isSupplyBalance: boolean | null = null,
  isBalance: boolean | null = null,
  isActive: boolean | null = null,
  token?: string
): Promise<ApiResponse> => {
  try {
    const params: any = {
      page,
      page_size: limit,
      role: 'Staff', // Required parameter for staff list
      ...(search ? { search } : {}),
      ...(isSupplyBalance !== null ? { supply_balance: isSupplyBalance } : {}),
      ...(isBalance !== null ? { balance: isBalance } : {}),
      ...(isActive !== null ? { is_active: isActive } : {}),
    }

    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    } : {
      params
    }

    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.MEMBERS_LIST.replace('{merchant_id}', merchantId)

    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Get Transactions API
export const getTransactionsService = async (
  merchantId: string,
  page: number = 1,
  limit: number = 10,
  search: string = '',
  range: string = 'this_year',
  token?: string
): Promise<ApiResponse<TransactionsResponse>> => {
  try {
    const params = {
      page,
      page_size: limit,
      search,
      range
    }

    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    } : {
      params
    }

    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.TRANSACTIONS.replace('{merchant_id}', merchantId)

    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Edit Transaction API
export const editTransactionApi = async (
  transactionId: string,
  amount: string | number,
  token?: string
): Promise<ApiResponse> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}

    // Replace {transaction_id} placeholder with actual transactionId
    const endpoint = API_ENDPOINTS.TRANSACTION_HISTORY.replace('{transaction_id}', transactionId)

    const response = await api.patch(endpoint, { amount }, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Expense Types
export interface Expense {
  id: string
  type: string
  amount: string
  description?: string
  date_of_expense: string
  created_at: string
  added_by?: string
  metadata?: {
    [key: string]: any
    attachments?: Array<{
      name: string
      url: string
    }>
  }
}

export interface ExpensesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Expense[]
  totals: {
    this_year?: number
    today?: number
    last_7_days?: number
    this_month?: number
    prev_month?: number
    last_year?: number
  }
}

export interface CreateExpenseData {
  type: string
  amount: string
  description?: string
  date_of_expense: string
  metadata?: {
    [key: string]: any
    attachments?: Array<{
      name: string
      url: string
    }>
  }
}

// Get Expenses API
export const getExpensesService = async (
  merchantId: string,
  page: number = 1,
  limit: number = 10,
  search?: string,
  byDate?: 'this_year' | 'today' | 'last_7_days' | 'this_month' | 'prev_month' | 'last_year',
  startDate?: string,
  endDate?: string,
  token?: string
): Promise<ApiResponse<ExpensesResponse>> => {
  try {
    const params: any = {
      page,
      page_size: limit,
      ...(search ? { search } : {}),
      ...(byDate ? { by_date: byDate } : {}),
      ...(startDate ? { start_date: startDate } : {}),
      ...(endDate ? { end_date: endDate } : {}),
    }

    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    } : {
      params
    }

    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.EXPENSES_LIST.replace('{merchant_id}', merchantId)

    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Create Expense API
export const createExpenseService = async (
  merchantId: string,
  expenseData: CreateExpenseData,
  token?: string
): Promise<ApiResponse<Expense>> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}

    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.EXPENSES_LIST.replace('{merchant_id}', merchantId)

    const response = await api.post(endpoint, expenseData, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Update Expense API
export const updateExpenseService = async (
  expenseId: string,
  expenseData: CreateExpenseData,
  token?: string
): Promise<ApiResponse<Expense>> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}

    // Replace {expense_id} placeholder with actual expenseId
    const endpoint = API_ENDPOINTS.EXPENSE_DETAIL.replace('{expense_id}', expenseId)

    const response = await api.put(endpoint, expenseData, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Delete Expense API
export const deleteExpenseService = async (
  expenseId: string,
  token?: string
): Promise<ApiResponse> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}

    // Replace {expense_id} placeholder with actual expenseId
    const endpoint = API_ENDPOINTS.EXPENSE_DETAIL.replace('{expense_id}', expenseId)

    const response = await api.delete(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Subscription Types
export interface SubscriptionInfo {
  name: string
  end_at: string
}

export interface FeatureValue {
  name: string
  value: boolean | number
}

export interface SubscriptionStatsResponse {
  subscription_info: SubscriptionInfo
  actual_features: {
    [key: string]: FeatureValue
  }
}

// Get Subscription Stats API
export const getSubscriptionStatsService = async (
  merchantId: string,
  token?: string
): Promise<ApiResponse<SubscriptionStatsResponse>> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}

    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.SUBSCRIPTION_STATS.replace('{merchant_id}', merchantId)

    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

// Error handling utilities
export const getUserFriendlyErrorMessage = (error: ApiError): string => {
  switch (error.type) {
    case 'network':
      return 'Please check your internet connection and try again.'
    case 'timeout':
      return 'The request is taking too long. Please try again.'
    case 'server':
      return 'Our servers are experiencing issues. Please try again in a few minutes.'
    case 'client':
      if (error.status === 401) {
        return 'Your session has expired. Please log in again.'
      } else if (error.status === 403) {
        return 'You don\'t have permission to perform this action.'
      } else if (error.status === 404) {
        return 'The requested resource was not found.'
      }
      return error.message || 'Something went wrong. Please try again.'
    default:
      return 'An unexpected error occurred. Please try again.'
  }
}

export const shouldRetryApiCall = (error: ApiError, attemptCount: number): boolean => {
  return error.retryable && attemptCount < RETRY_CONFIG.maxRetries
}

// Invoice Types
export interface InvoiceItem {
  id: string
  date: string
  amount: number
  status: 'pending' | 'paid'
  due_date?: string
}

// Get Merchant Invoices API
export const getMerchantInvoicesService = async (
  merchantId: string,
  token?: string
): Promise<ApiResponse<InvoiceItem[]>> => {
  try {
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {}

    // Replace {merchant_id} placeholder with actual merchantId
    const endpoint = API_ENDPOINTS.MERCHANT_INVOICES.replace('{merchant_id}', merchantId)

    const response = await api.get(endpoint, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    }
  }
}

