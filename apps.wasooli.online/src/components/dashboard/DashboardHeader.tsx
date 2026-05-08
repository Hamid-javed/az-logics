import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Modal,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
} from 'react-native';
import React, { memo, useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { hp, wp, COLOR, TEXT_STYLE, WIDTH } from '../../enums/StyleGuide';
import DrawerOpen from '../reuseables/drawerOpen/DrawerOpen';
import { SVG } from '../../assets/svgs';
import { Button, Label, Pressable } from '../reuseables';
import { useAppSelector } from '../../redux/hooks';
import { SCREEN_NAME } from '../../enums/AppEnums';
import { formatCurrency } from '../../utils/dataUtils';

// Function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

// Function to parse title and extract main title (similar to DashboardCard)
const parseFilterTitle = (title: string) => {
  const cleanTitle = stripHtmlTags(title);

  // Check for (Cash) or (Online) and extract main title
  const cashMatch = cleanTitle.match(/(.+?)\s*\(Cash\)/i);
  const onlineMatch = cleanTitle.match(/(.+?)\s*\(Online\)/i);

  if (cashMatch) {
    return cashMatch[1].trim();
  }

  if (onlineMatch) {
    return onlineMatch[1].trim();
  }

  return cleanTitle;
};

interface DashboardHeaderProps {
  metrics?: any
  screenType?: string
  children?: React.ReactNode
  onSelectCustomersPress?: () => void
  filterTitle?: string
  onClearFilter?: () => void
  searchText?: string
  onSearchChange?: (text: string) => void
  onAddExpensePress?: () => void
  showAddForm?: boolean
  onBackPress?: () => void
}

const DashboardHeader = ({
  metrics,
  screenType,
  children,
  onSelectCustomersPress,
  filterTitle,
  onClearFilter,
  searchText: externalSearchText,
  onSearchChange,
  onFilterApply,
  onAddExpensePress,
  showAddForm = false,
  onBackPress,
}: DashboardHeaderProps) => {
  const userProfile = useAppSelector((state: any) => state.appReducer.user);
  const insets = useSafeAreaInsets();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTransactionProgressModal, setShowTransactionProgressModal] =
    useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showCustomerMenuDropdown, setShowCustomerMenuDropdown] =
    useState(false);
  const [showStaffMenuDropdown, setShowStaffMenuDropdown] = useState(false);
  const [internalSearchText, setInternalSearchText] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('All');

  // Use external search text if provided (for screens managing their own search), otherwise use internal
  const searchText =
    externalSearchText !== undefined ? externalSearchText : internalSearchText;
  const handleSearchTextChange = (text: string) => {
    if (onSearchChange) {
      onSearchChange(text);
    } else {
      setInternalSearchText(text);
    }
  };
  // Get status bar height - use safe area top inset or StatusBar height
  // When translucent is true, we need to add padding to prevent content from going behind status bar
  const statusBarHeight =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  // Ensure minimum padding for translucent status bar
  const topPadding =
    statusBarHeight > 0
      ? statusBarHeight
      : Platform.OS === 'ios'
      ? insets.top
      : hp(6);

  // Calculate total earnings for this month (cash + online) - only for dashboard
  const totalEarnings =
    screenType === SCREEN_NAME.DASHBOARD
      ? (Number(metrics?.total_collections_this_month_cash?.value) || 0) +
        (Number(metrics?.total_collections_this_month_online?.value) || 0)
      : 0;

  // Format total earnings for display
  const formattedTotalEarnings = formatCurrency(totalEarnings);

  // Get center text based on screen type
  const getCenterText = () => {
    switch (screenType) {
      case SCREEN_NAME.DASHBOARD:
        return `Hello ${userProfile?.merchant_name}`;
      case SCREEN_NAME.PROFILE:
        return 'My Profile';
      case SCREEN_NAME.CUSTOMERS:
        return 'Customer list';
      case SCREEN_NAME.TRANSACTION:
        return 'Transactions';
      case SCREEN_NAME.STAFFS:
        return 'Staff list';
      case SCREEN_NAME.EXPENSES:
        return 'Expense';
      case SCREEN_NAME.CUSTOMER_PROFILE:
        return 'Customer Profile';
      default:
        return `Hello ${userProfile?.merchant_name}`;
    }
  };

  // Check if it's customer profile screen
  const isCustomerProfile = () => {
    return screenType === SCREEN_NAME.CUSTOMER_PROFILE;
  };

  // Show second row based on screen type
  const showSecondRow = () => {
    // Show second row for expense screen
    return screenType === SCREEN_NAME.EXPENSES;
  };

  // Show customer list specific UI
  const showCustomerListUI = () => {
    return screenType === SCREEN_NAME.CUSTOMERS;
  };

  // Show transaction screen specific UI
  const showTransactionUI = () => {
    return screenType === SCREEN_NAME.TRANSACTION;
  };

  // Show center item in first row
  const showCenterItem = () => {
    return true; // Always show center item
  };

  // Show staff screen specific UI
  const showStaffUI = () => {
    return screenType === SCREEN_NAME.STAFFS;
  };

  // Get bottom padding based on screen type
  const getBottomPadding = () => {
    switch (screenType) {
      case SCREEN_NAME.CUSTOMERS:
        return hp(2);
      case SCREEN_NAME.DASHBOARD:
        return 0;
      case SCREEN_NAME.PROFILE:
        return 0;
      case SCREEN_NAME.TRANSACTION:
        return hp(4);
      case SCREEN_NAME.STAFFS:
        return hp(4);
      case SCREEN_NAME.EXPENSES:
        return hp(4);
      case SCREEN_NAME.CUSTOMER_PROFILE:
        return hp(2);
      default:
        return 0;
    }
  };

  return (
    <LinearGradient
      colors={['#8767FF', '#2E0DAA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        styles.header,
        {
          paddingTop: topPadding,
          paddingBottom: getBottomPadding(),
        },
      ]}
    >
      <View style={[styles.firstRow]}>
        <View style={styles.leftAndCenterContainer}>
          <View style={styles.leftItem}>
            <DrawerOpen />
          </View>
          {showCenterItem() && (
            <View style={styles.centerItem}>
              <Label
                numberOfLines={1}
                style={styles.greetingText}
                color={COLOR.white}
              >
                {getCenterText()}
              </Label>
            </View>
          )}
        </View>
        <View style={styles.rightItem}>
          {showCustomerListUI() || showStaffUI() ? (
            <View style={styles.rightIconsContainer}>
              <Pressable
                onPress={() => setShowNotificationsModal(true)}
                style={styles.iconButton}
              >
                <SVG.NOTIFICATION_BELL width={hp(5.5)} height={hp(5.5)} />
              </Pressable>
              <View style={styles.menuIconContainer}>
                <Pressable
                  onPress={() => {
                    // Haptic feedback
                    try {
                      Vibration.vibrate(10);
                    } catch (error) {
                      // Ignore vibration errors if permission not granted
                      console.log('Vibration not available:', error);
                    }

                    if (showCustomerListUI()) {
                      setShowCustomerMenuDropdown(!showCustomerMenuDropdown);
                      setShowStaffMenuDropdown(false);
                    } else if (showStaffUI()) {
                      setShowStaffMenuDropdown(!showStaffMenuDropdown);
                      setShowCustomerMenuDropdown(false);
                    }
                  }}
                  style={styles.iconButton}
                >
                  <SVG.VERTICAL_DOT width={hp(2.5)} height={hp(2.5)} />
                </Pressable>
                {showCustomerMenuDropdown && showCustomerListUI() && (
                  <View style={styles.customerMenuDropdown}>
                    <Pressable
                      style={styles.dropdownMenuItem}
                      onPress={() => {
                        try {
                          Vibration.vibrate(10);
                        } catch (error) {
                          console.log('Vibration not available:', error);
                        }
                        setShowCustomerMenuDropdown(false);
                        // Handle Add New Customer
                      }}
                    >
                      <View style={styles.dropdownIconContainer}>
                        <SVG.ADD_CUSTOMER width={hp(1.5)} height={hp(1.5)} />
                      </View>
                      <Label
                        style={styles.dropdownMenuText}
                        color={COLOR.black}
                      >
                        Add New Customer
                      </Label>
                    </Pressable>
                    <Pressable
                      style={styles.dropdownMenuItem}
                      onPress={() => {
                        try {
                          Vibration.vibrate(10);
                        } catch (error) {
                          console.log('Vibration not available:', error);
                        }
                        setShowCustomerMenuDropdown(false);
                        onSelectCustomersPress?.();
                      }}
                    >
                      <View style={styles.dropdownIconContainerBlue}>
                        <SVG.SELECT_CUSTOMER width={hp(1.5)} height={hp(1.5)} />
                      </View>
                      <Label
                        style={styles.dropdownMenuText}
                        color={COLOR.black}
                      >
                        Select Customers
                      </Label>
                    </Pressable>
                    <Pressable
                      style={styles.dropdownMenuItem}
                      onPress={() => {
                        try {
                          Vibration.vibrate(10);
                        } catch (error) {
                          console.log('Vibration not available:', error);
                        }
                        setShowCustomerMenuDropdown(false);
                        // Handle Create Monthly Invoice
                      }}
                    >
                      <View style={styles.dropdownIconContainerBlue}>
                        <SVG.CREATE_INVOICE width={hp(1.5)} height={hp(1.5)} />
                      </View>
                      <Label
                        style={styles.dropdownMenuText}
                        color={COLOR.black}
                      >
                        Create Monthly Invoice
                      </Label>
                    </Pressable>
                  </View>
                )}
                {showStaffMenuDropdown && showStaffUI() && (
                  <View style={styles.customerMenuDropdown}>
                    <Pressable
                      style={styles.dropdownMenuItem}
                      onPress={() => {
                        try {
                          Vibration.vibrate(10);
                        } catch (error) {
                          console.log('Vibration not available:', error);
                        }
                        setShowStaffMenuDropdown(false);
                        // Handle Add New Staff
                      }}
                    >
                      <View style={styles.dropdownIconContainer}>
                        <SVG.ADD_CUSTOMER width={hp(1.5)} height={hp(1.5)} />
                      </View>
                      <Label
                        style={styles.dropdownMenuText}
                        color={COLOR.black}
                      >
                        Add New Staff
                      </Label>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <Pressable
              onPress={() => setShowNotificationsModal(true)}
              style={styles.iconButton}
            >
              <SVG.NOTIFICATION_BELL width={hp(5.5)} height={hp(5.5)} />
            </Pressable>
          )}
        </View>
      </View>

      {showSecondRow() ? (
        <View style={styles.expenseSecondRow}>
          {/* Back Icon - shown when add form is visible */}
          {showAddForm && (
            <Pressable 
              style={styles.expenseBackButton}
              onPress={() => {
                if (onBackPress) {
                  onBackPress()
                }
              }}
            >
              <SVG.BACK width={hp(2)} height={hp(2)} />
            </Pressable>
          )}
          
          {/* Search Bar */}
          <View style={styles.expenseSearchContainer}>
            <SVG.SEARCH width={hp(2)} height={hp(2)} />
            <View style={{ marginLeft: wp(2) }} />
            <TextInput
              style={styles.expenseSearchInput}
              placeholder="Search Expenses..."
              placeholderTextColor={COLOR.lightGrey}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.expenseActionButtons}>
            {/* Add Button */}
            <Pressable
              style={styles.expenseActionButton}
              onPress={() => {
                if (onAddExpensePress) {
                  onAddExpensePress()
                }
              }}
            >
              <Label style={styles.expenseActionButtonText} color={COLOR.white}>
                + Add
              </Label>
            </Pressable>

            {/* Analytics Button */}
            <Pressable
              style={styles.expenseActionButton}
              onPress={() => {
                // Handle Analytics/Stats
                console.log('Analytics pressed');
              }}
            >
              <SVG.TRENDING width={hp(2.5)} height={hp(2.5)} />
            </Pressable>
          </View>
        </View>
      ) : showCustomerListUI() ? (
        <>
          <View style={[styles.searchRow, styles.searchRowWithMargin]}>
            <View style={styles.searchContainer}>
              <SVG.SEARCH width={hp(2)} height={hp(2)} />
              <View style={{ marginLeft: wp(2) }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by Name..."
                placeholderTextColor={COLOR.lightGrey}
                value={searchText}
                onChangeText={handleSearchTextChange}
              />
              <Pressable onPress={() => {}} style={styles.staffDropdown}>
                <Label style={styles.staffText} color={COLOR.black}>
                  Staff: {selectedStaff}
                </Label>
                <View style={{ marginLeft: wp(1) }} />
                <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
              </Pressable>
              <Pressable
                onPress={() => setShowFilterModal(true)}
                style={styles.filterButtonInline}
              >
                <SVG.FILTER width={hp(2)} height={hp(2)} />
              </Pressable>
            </View>
          </View>
          {filterTitle && filterTitle.trim() !== '' && (
            <View style={styles.filterTagContainer}>
              <View style={styles.filterTag}>
                <Label style={styles.filterTagText} color={COLOR.white}>
                  {parseFilterTitle(filterTitle)}
                </Label>
                <Pressable
                  onPress={onClearFilter}
                  style={styles.filterTagClose}
                >
                  <SVG.CROSS
                    width={hp(1.5)}
                    height={hp(1.5)}
                    color={COLOR.white}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </>
      ) : showTransactionUI() ? (
        <View style={[styles.searchRow, styles.searchRowWithMargin]}>
          <View style={styles.searchContainer}>
            <SVG.SEARCH width={hp(2.5)} height={hp(2.5)} />
            <View style={{ marginLeft: wp(2) }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Name or Phone"
              placeholderTextColor={COLOR.lightGrey}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
            <Pressable
              onPress={() => setShowFilterModal(true)}
              style={styles.filterButtonInline}
            >
              <SVG.FILTER width={hp(2)} height={hp(2)} />
            </Pressable>
          </View>
          <View style={{ marginLeft: wp(2) }} />
          <Pressable
            onPress={() => setShowTransactionProgressModal(true)}
            style={styles.filterButton}
          >
            <SVG.TRANSACTION_PROGRESS width={hp(2)} height={hp(2)} />
          </Pressable>
        </View>
      ) : showStaffUI() ? (
        <View style={[styles.searchRow, styles.searchRowWithMargin]}>
          <View style={styles.searchContainerStaff}>
            <SVG.SEARCH width={hp(2.5)} height={hp(2.5)} />
            <View style={{ marginLeft: wp(2) }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Name or Phone"
              placeholderTextColor={COLOR.lightGrey}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
          </View>
        </View>
      ) : isCustomerProfile() && children ? (
        <View style={styles.secondRowPlaceholder}>{children}</View>
      ) : (
        <View style={styles.secondRowPlaceholder}>
          {/* Future UI will be added here */}
        </View>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        screenType={screenType}
        onFilterApply={onFilterApply}
      />

      {/* Transaction Progress Modal */}
      <TransactionProgressModal
        visible={showTransactionProgressModal}
        onClose={() => setShowTransactionProgressModal(false)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        visible={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      {/* Customer/Staff Menu Dropdown Backdrop */}
      {(showCustomerMenuDropdown || showStaffMenuDropdown) && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowCustomerMenuDropdown(false);
            setShowStaffMenuDropdown(false);
          }}
        >
          <View style={styles.dropdownBackdrop} />
        </TouchableWithoutFeedback>
      )}
    </LinearGradient>
  );
};

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to format date to YYYY-MM-DD
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to format date for display (DD MMM YYYY)
const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  const day = String(date.getDate()).padStart(2, '0');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

// Filter mappings based on FILTER_MAPPINGS provided
const FILTER_MAPPINGS: { [key: string]: any } = {
  'Active Customers': { is_active: true },
  'Non-Active Customers': { is_active: false },
  'Un-Paid Customers': { is_paid: false },
  'Paid Today': { is_paid_today: true },
  'Paid Customers': { is_paid: true },
  'New Customers': { is_new: true },
  'Earning This Month': { is_paid: true },
  'Remaining Collection': { balance: true },
  'Whatsapp Customers': { is_on_whatsapp: true },
  'Non-Whatsapp Customers': { is_on_whatsapp: false },
  'Supply Given Today': { is_supply_given_today: true },
  'Customers With No Staff': { staff_id: 'unassigned' },
  'Fee due today': () => {
    const today = getTodayDate();
    return { expiring_from: today, expiring_to: today };
  },
};

// Filter Modal Component
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  screenType?: string;
  onFilterApply?: (filter: any, filterTitle: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  screenType,
  onFilterApply,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showSupplyDropdown, setShowSupplyDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [selectedSupplyOption, setSelectedSupplyOption] = useState<string>('');
  const [selectedGenderOption, setSelectedGenderOption] = useState<string>('');

  // Handle start date selection from calendar
  const handleStartDateSelect = (day: any) => {
    if (day && day.dateString) {
      setStartDate(day.dateString);
      setShowStartDatePicker(false);
    }
  };

  // Handle end date selection from calendar
  const handleEndDateSelect = (day: any) => {
    if (day && day.dateString) {
      setEndDate(day.dateString);
      setShowEndDatePicker(false);
    }
  };

  const isTransactionScreen = screenType === SCREEN_NAME.TRANSACTION;

  const customerFilters = [
    'Fee due today',
    'Remaining Collection',
    'Paid Today',
    'Paid Customers',
    'Un-Paid Customers',
    'Total Customers',
    'Supply Given Today',
    'Supply Exceed Limit',
  ];

  const groupedFilters = [
    'Active Customers',
    'Non-Active Customers',
    'Whatsapp Customers',
    'Non-Whatsapp Customers',
    'Customers With No Staff',
    'Gender',
  ];

  const timePeriodFilters = [
    'Today',
    'This Week',
    'This Month',
    'Last Month',
    'This year',
  ];

  const transactionTypeFilters = ['Online', 'Offline'];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const isCurrentlySelected = prev.includes(filter);

      // Determine which category this filter belongs to
      const isCustomerFilter = customerFilters.includes(filter);
      const isGroupFilter = groupedFilters.includes(filter);

      let newFilters: string[];

      if (isCurrentlySelected) {
        // Deselect the filter
        newFilters = prev.filter(f => f !== filter);

        // Reset dropdown selections when filter is deselected
        if (filter === 'Supply Exceed Limit') {
          setSelectedSupplyOption('');
        }
        if (filter === 'Gender') {
          setSelectedGenderOption('');
        }
      } else {
        // Select the filter, but enforce max 1 per category
        if (isCustomerFilter) {
          // Remove any existing customer filter, keep group filters
          const otherFilters = prev.filter(f => !customerFilters.includes(f));
          newFilters = [...otherFilters, filter];
        } else if (isGroupFilter) {
          // Remove any existing group filter, keep customer filters
          const otherFilters = prev.filter(f => !groupedFilters.includes(f));
          newFilters = [...otherFilters, filter];
        } else {
          // For other filters (like transaction filters), allow multiple
          newFilters = [...prev, filter];
        }
      }

      return newFilters;
    });
  };

  const handleSupplySelect = (option: string) => {
    setSelectedSupplyOption(option);
    setShowSupplyDropdown(false);
    if (!selectedFilters.includes('Supply Exceed Limit')) {
      setSelectedFilters(prev => [...prev, 'Supply Exceed Limit']);
    }
  };

  const handleGenderSelect = (option: string) => {
    setSelectedGenderOption(option);
    setShowGenderDropdown(false);
    if (!selectedFilters.includes('Gender')) {
      setSelectedFilters(prev => [...prev, 'Gender']);
    }
  };

  const handleSet = () => {
    if (!isTransactionScreen && onFilterApply) {
      // Build filter object from selected filters
      const filterParams: any = {};
      let filterTitle = '';

      // Get selected customer filter (max 1)
      const selectedCustomerFilter = selectedFilters.find(f =>
        customerFilters.includes(f),
      );

      // Get selected group filter (max 1)
      const selectedGroupFilter = selectedFilters.find(f =>
        groupedFilters.includes(f),
      );

      // Apply customer filter mapping
      if (selectedCustomerFilter && FILTER_MAPPINGS[selectedCustomerFilter]) {
        const mapping = FILTER_MAPPINGS[selectedCustomerFilter];
        // Handle function-based mappings (like Fee due today)
        if (typeof mapping === 'function') {
          Object.assign(filterParams, mapping());
        } else {
          Object.assign(filterParams, mapping);
        }
        filterTitle = selectedCustomerFilter;
      }

      // Apply group filter mapping
      if (selectedGroupFilter && FILTER_MAPPINGS[selectedGroupFilter]) {
        const mapping = FILTER_MAPPINGS[selectedGroupFilter];
        // Handle function-based mappings
        if (typeof mapping === 'function') {
          Object.assign(filterParams, mapping());
        } else {
          Object.assign(filterParams, mapping);
        }
        // Combine titles if both filters are selected
        if (filterTitle) {
          filterTitle = `${filterTitle} & ${selectedGroupFilter}`;
        } else {
          filterTitle = selectedGroupFilter;
        }
      }

      // Handle Gender filter with sub-selection (if provided)
      if (selectedFilters.includes('Gender') && selectedGenderOption) {
        filterParams.gender = selectedGenderOption;
        if (!filterTitle) filterTitle = `Gender: ${selectedGenderOption}`;
        else filterTitle = `${filterTitle} & Gender: ${selectedGenderOption}`;
      }

      // Note: Supply Exceed Limit doesn't have a mapping yet,
      // so it won't be applied until mapping is added

      // Add custom date range if provided
      if (startDate && endDate) {
        filterParams.expiring_from = startDate;
        filterParams.expiring_to = endDate;
        if (filterTitle) {
          filterTitle = `${filterTitle} (${formatDateForDisplay(
            startDate,
          )} - ${formatDateForDisplay(endDate)})`;
        } else {
          filterTitle = `${formatDateForDisplay(
            startDate,
          )} - ${formatDateForDisplay(endDate)}`;
        }
      } else if (startDate) {
        // If only start date is provided, use it for both
        filterParams.expiring_from = startDate;
        filterParams.expiring_to = startDate;
        if (filterTitle) {
          filterTitle = `${filterTitle} (${formatDateForDisplay(startDate)})`;
        } else {
          filterTitle = formatDateForDisplay(startDate);
        }
      } else if (endDate) {
        // If only end date is provided, use it for both
        filterParams.expiring_from = endDate;
        filterParams.expiring_to = endDate;
        if (filterTitle) {
          filterTitle = `${filterTitle} (${formatDateForDisplay(endDate)})`;
        } else {
          filterTitle = formatDateForDisplay(endDate);
        }
      }

      // Call the callback with filter params
      onFilterApply(filterParams, filterTitle);
    }

    onClose();
  };

  const handleCancel = () => {
    // Reset filters if needed or just close
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View style={styles.modalContent}>
              {/* Handle bar */}
              <View style={styles.handleBar} />

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Label style={styles.modalTitle}>
                    {isTransactionScreen ? 'Filter Transactions' : 'Filters'}
                  </Label>
                </View>

                {isTransactionScreen ? (
                  <>
                    {/* Time Period Section */}
                    <View style={styles.filterSection}>
                      <Label style={styles.sectionTitle}>Time Period</Label>
                      <Label style={styles.sectionDescription}>
                        Select one time period or use custom dates below.
                      </Label>
                      <View style={styles.filterChipsContainer}>
                        {timePeriodFilters.map(filter => {
                          const isSelected = selectedFilters.includes(filter);
                          return (
                            <View key={filter} style={styles.filterChipWrapper}>
                              <Pressable
                                onPress={() => toggleFilter(filter)}
                                style={[
                                  styles.filterChip,
                                  ...(isSelected
                                    ? [styles.filterChipSelected]
                                    : []),
                                ]}
                              >
                                <Label
                                  style={[
                                    styles.filterChipText,
                                    ...(isSelected
                                      ? [styles.filterChipTextSelected]
                                      : []),
                                  ]}
                                >
                                  {filter}
                                </Label>
                                {isSelected && (
                                  <Pressable
                                    onPress={() => toggleFilter(filter)}
                                    style={styles.crossIconContainer}
                                  >
                                    <SVG.CROSS
                                      width={hp(1.5)}
                                      height={hp(1.5)}
                                    />
                                  </Pressable>
                                )}
                              </Pressable>
                            </View>
                          );
                        })}
                      </View>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Transaction Type Section */}
                    <View style={styles.filterSection}>
                      <Label style={styles.sectionTitle}>
                        Transaction Type
                      </Label>
                      <View style={styles.filterChipsContainer}>
                        {transactionTypeFilters.map(filter => {
                          const isSelected = selectedFilters.includes(filter);
                          return (
                            <View key={filter} style={styles.filterChipWrapper}>
                              <Pressable
                                onPress={() => toggleFilter(filter)}
                                style={[
                                  styles.filterChip,
                                  ...(isSelected
                                    ? [styles.filterChipSelected]
                                    : []),
                                ]}
                              >
                                <Label
                                  style={[
                                    styles.filterChipText,
                                    ...(isSelected
                                      ? [styles.filterChipTextSelected]
                                      : []),
                                  ]}
                                >
                                  {filter}
                                </Label>
                                {isSelected && (
                                  <Pressable
                                    onPress={() => toggleFilter(filter)}
                                    style={styles.crossIconContainer}
                                  >
                                    <SVG.CROSS
                                      width={hp(1.5)}
                                      height={hp(1.5)}
                                    />
                                  </Pressable>
                                )}
                              </Pressable>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    {/* Filter by Customer */}
                    <View style={styles.filterSection}>
                      <Label style={styles.sectionTitle}>
                        Filter by Customer
                      </Label>
                      <View style={styles.filterChipsContainer}>
                        {customerFilters.map(filter => {
                          const isSelected = selectedFilters.includes(filter);
                          const isSupplyExceed =
                            filter === 'Supply Exceed Limit';
                          const showSupplyDD =
                            isSupplyExceed && showSupplyDropdown && isSelected;

                          return (
                            <View key={filter} style={styles.filterChipWrapper}>
                              <Pressable
                                onPress={() => toggleFilter(filter)}
                                style={[
                                  styles.filterChip,
                                  ...(isSelected
                                    ? [styles.filterChipSelected]
                                    : []),
                                ]}
                              >
                                <Label
                                  style={[
                                    styles.filterChipText,
                                    ...(isSelected
                                      ? [styles.filterChipTextSelected]
                                      : []),
                                  ]}
                                >
                                  {filter}
                                </Label>
                                {isSupplyExceed && isSelected && (
                                  <>
                                    <View style={styles.chipSeparator} />
                                    <Pressable
                                      onPress={() => {
                                        setShowSupplyDropdown(
                                          !showSupplyDropdown,
                                        );
                                      }}
                                      style={styles.dropdownTrigger}
                                    >
                                      <Label
                                        style={[
                                          styles.filterChipText,
                                          styles.filterChipTextSelected,
                                        ]}
                                      >
                                        {selectedSupplyOption || 'Select'}
                                      </Label>
                                      <View style={{ marginLeft: wp(1) }} />
                                      <SVG.DROPDOWN
                                        width={hp(1.5)}
                                        height={hp(1.5)}
                                      />
                                    </Pressable>
                                  </>
                                )}
                                {isSelected && !isSupplyExceed && (
                                  <Pressable
                                    onPress={() => toggleFilter(filter)}
                                    style={styles.crossIconContainer}
                                  >
                                    <SVG.CROSS
                                      width={hp(1.5)}
                                      height={hp(1.5)}
                                    />
                                  </Pressable>
                                )}
                              </Pressable>
                              {showSupplyDD && (
                                <View style={styles.dropdownContainer}>
                                  <Pressable
                                    onPress={() =>
                                      handleSupplySelect('Last month')
                                    }
                                    style={[
                                      styles.dropdownItem,
                                      { borderTopWidth: 0 },
                                    ]}
                                  >
                                    <Label style={styles.dropdownItemText}>
                                      Last month
                                    </Label>
                                  </Pressable>
                                  <Pressable
                                    onPress={() =>
                                      handleSupplySelect('This Month')
                                    }
                                    style={styles.dropdownItem}
                                  >
                                    <Label style={styles.dropdownItemText}>
                                      This Month
                                    </Label>
                                  </Pressable>
                                </View>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Grouped Filters */}
                    <View style={styles.filterSection}>
                      <Label style={styles.sectionTitle}>Grouped Filters</Label>
                      <View style={styles.filterChipsContainer}>
                        {groupedFilters.map(filter => {
                          const isSelected = selectedFilters.includes(filter);
                          const isGender = filter === 'Gender';
                          const showGenderDD =
                            isGender && showGenderDropdown && isSelected;

                          return (
                            <View key={filter} style={styles.filterChipWrapper}>
                              <Pressable
                                onPress={() => toggleFilter(filter)}
                                style={[
                                  styles.filterChip,
                                  ...(isSelected
                                    ? [styles.filterChipSelected]
                                    : []),
                                ]}
                              >
                                <Label
                                  style={[
                                    styles.filterChipText,
                                    ...(isSelected
                                      ? [styles.filterChipTextSelected]
                                      : []),
                                  ]}
                                >
                                  {filter}
                                </Label>
                                {isGender && isSelected && (
                                  <>
                                    <View style={styles.chipSeparator} />
                                    <Pressable
                                      onPress={() => {
                                        setShowGenderDropdown(
                                          !showGenderDropdown,
                                        );
                                      }}
                                      style={styles.dropdownTrigger}
                                    >
                                      <Label
                                        style={[
                                          styles.filterChipText,
                                          styles.filterChipTextSelected,
                                        ]}
                                      >
                                        {selectedGenderOption || 'Select'}
                                      </Label>
                                      <View style={{ marginLeft: wp(1) }} />
                                      <SVG.DROPDOWN
                                        width={hp(1.5)}
                                        height={hp(1.5)}
                                      />
                                    </Pressable>
                                  </>
                                )}
                                {isSelected && !isGender && (
                                  <Pressable
                                    onPress={() => toggleFilter(filter)}
                                    style={styles.crossIconContainer}
                                  >
                                    <SVG.CROSS
                                      width={hp(1.5)}
                                      height={hp(1.5)}
                                    />
                                  </Pressable>
                                )}
                              </Pressable>
                              {showGenderDD && (
                                <View style={styles.dropdownContainer}>
                                  <Pressable
                                    onPress={() => handleGenderSelect('Male')}
                                    style={[
                                      styles.dropdownItem,
                                      { borderTopWidth: 0 },
                                    ]}
                                  >
                                    <Label style={styles.dropdownItemText}>
                                      Male
                                    </Label>
                                  </Pressable>
                                  <Pressable
                                    onPress={() => handleGenderSelect('Female')}
                                    style={styles.dropdownItem}
                                  >
                                    <Label style={styles.dropdownItemText}>
                                      Female
                                    </Label>
                                  </Pressable>
                                  <Pressable
                                    onPress={() => handleGenderSelect('Other')}
                                    style={[
                                      styles.dropdownItem,
                                      { borderBottomWidth: 0 },
                                    ]}
                                  >
                                    <Label style={styles.dropdownItemText}>
                                      Other
                                    </Label>
                                  </Pressable>
                                </View>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </>
                )}

                {/* Divider */}
                <View style={styles.divider} />

                {/* Custom date range */}
                {!isTransactionScreen && (
                  <View style={styles.filterSection}>
                    <Label style={styles.sectionTitle}>Custom date range</Label>
                    <View style={styles.dateRangeContainer}>
                      <Pressable
                        style={styles.dateInput}
                        onPress={() => {
                          setShowStartDatePicker(true);
                          setShowEndDatePicker(false);
                        }}
                      >
                        <SVG.CALENDER width={hp(2)} height={hp(2)} />
                        <Label style={styles.dateInputText}>
                          {startDate
                            ? formatDateForDisplay(startDate)
                            : 'Start date'}
                        </Label>
                        <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
                      </Pressable>
                      <Pressable
                        style={styles.dateInput}
                        onPress={() => {
                          setShowEndDatePicker(true);
                          setShowStartDatePicker(false);
                        }}
                      >
                        <SVG.CALENDER width={hp(2)} height={hp(2)} />
                        <Label style={styles.dateInputText}>
                          {endDate ? formatDateForDisplay(endDate) : 'End date'}
                        </Label>
                        <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
                      </Pressable>
                    </View>
                  </View>
                )}

                <View style={styles.buttonRow}>
                  <Button
                    onPress={handleCancel}
                    style={styles.cancelButton}
                    text="Cancel"
                  />
                  <Button
                    onPress={handleSet}
                    style={styles.setButton}
                    text="Set"
                  />
                </View>
              </ScrollView>

              {/* Cancel and Set Buttons */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      {/* Calendar Modal for Start Date */}
      <Modal
        visible={showStartDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowStartDatePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowStartDatePicker(false)}>
          <View style={styles.calendarModalBackdrop}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.calendarModalContainer}>
                <Calendar
                  onDayPress={handleStartDateSelect}
                  markedDates={
                    startDate
                      ? {
                          [startDate]: {
                            selected: true,
                            selectedColor: COLOR.purple,
                          },
                        }
                      : {}
                  }
                  theme={{
                    calendarBackground: COLOR.white,
                    selectedDayBackgroundColor: COLOR.purple,
                    selectedDayTextColor: COLOR.white,
                    todayTextColor: COLOR.purple,
                    dayTextColor: COLOR.black,
                    textDisabledColor: COLOR.lightGrey,
                    arrowColor: COLOR.purple,
                    monthTextColor: COLOR.black,
                    textDayFontSize: hp(1.6),
                    textMonthFontSize: hp(2),
                    textDayHeaderFontSize: hp(1.4),
                    textDayFontWeight: '400',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '500',
                  }}
                  enableSwipeMonths={true}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Calendar Modal for End Date */}
      <Modal
        visible={showEndDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEndDatePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowEndDatePicker(false)}>
          <View style={styles.calendarModalBackdrop}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.calendarModalContainer}>
                <Calendar
                  onDayPress={handleEndDateSelect}
                  markedDates={
                    endDate
                      ? {
                          [endDate]: {
                            selected: true,
                            selectedColor: COLOR.purple,
                          },
                        }
                      : {}
                  }
                  theme={{
                    calendarBackground: COLOR.white,
                    selectedDayBackgroundColor: COLOR.purple,
                    selectedDayTextColor: COLOR.white,
                    todayTextColor: COLOR.purple,
                    dayTextColor: COLOR.black,
                    textDisabledColor: COLOR.lightGrey,
                    arrowColor: COLOR.purple,
                    monthTextColor: COLOR.black,
                    textDayFontSize: hp(1.6),
                    textMonthFontSize: hp(2),
                    textDayHeaderFontSize: hp(1.4),
                    textDayFontWeight: '400',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '500',
                  }}
                  enableSwipeMonths={true}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Modal>
  );
};

// Notifications Modal Component
interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  visible,
  onClose,
}) => {
  const slideAnim = useRef(new Animated.Value(WIDTH)).current;

  useEffect(() => {
    if (visible) {
      // Slide in from right
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out to right
      Animated.timing(slideAnim, {
        toValue: WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.notificationsModalBackdrop}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.notificationsModalContent,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <View style={styles.notificationsHeader}>
                <Label style={styles.notificationsTitle}>Notifications</Label>
                <Pressable onPress={() => {}}>
                  <Label style={styles.clearAllText}>Clear All</Label>
                </Pressable>
              </View>

              <View style={styles.notificationsContent}>
                <Label style={styles.noNotificationsText}>
                  No notifications to display
                </Label>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Transaction Progress Modal Component
interface TransactionProgressModalProps {
  visible: boolean;
  onClose: () => void;
}

const TransactionProgressModal: React.FC<TransactionProgressModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.handleBar} />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Label style={styles.modalTitle}>Transaction Progress</Label>
                </View>
                <View style={styles.filterSection}>
                  <Label style={styles.sectionTitle}>
                    Transaction Progress View
                  </Label>
                  <Label style={styles.sectionDescription}>
                    This feature will show transaction progress analytics.
                  </Label>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(DashboardHeader);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: wp(6),
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    marginBottom: hp(2),
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondRowPlaceholder: {
    // Placeholder for future UI updates
    minHeight: hp(4),
  },
  leftAndCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftItem: {
    alignItems: 'flex-start',
  },
  centerItem: {
    marginLeft: wp(3),
    alignItems: 'flex-start',
  },
  rightItem: {
    flex: 0,
    alignItems: 'flex-end',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(3),
  },
  iconButton: {
    width: hp(4),
    height: hp(4),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    ...TEXT_STYLE.smallTitleSemiBold,
    fontSize: 20,
  },
  earningContainer: {
    flex: 1,
  },
  earningLabel: {
    ...TEXT_STYLE.smallTextMedium,
    opacity: 0.9,
  },
  earningAmount: {
    ...TEXT_STYLE.smallTitleSemiBold,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: wp(2),
    marginBottom: hp(2),
  },
  actionButtonsRowStaff: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: hp(2),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: COLOR.purple,
    paddingVertical: hp(0.75),
    paddingHorizontal: wp(4),
  },
  actionButtonText: {
    ...TEXT_STYLE.smallTextSemiBold,
    marginTop: hp(0.5),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchRowWithMargin: {
    marginTop: hp(2),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  searchContainerStaff: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  searchInput: {
    flex: 1,
    ...TEXT_STYLE.smallText,
    color: COLOR.black,
    paddingBottom: hp(0.75),
  },
  separator: {
    width: 1,
    height: hp(2.5),
    backgroundColor: COLOR.lightGrey2,
  },
  staffDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(2),
    backgroundColor: COLOR.white,
    borderRadius: hp(0.8),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  staffText: {
    ...TEXT_STYLE.text,
  },
  filterButton: {
    width: hp(4.5),
    height: hp(5),
    borderRadius: hp(1.5),
    backgroundColor: COLOR.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonInline: {
    paddingHorizontal: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLOR.white,
    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
    maxHeight: '90%',
    paddingBottom: hp(2),
  },
  handleBar: {
    width: wp(15),
    height: hp(0.5),
    backgroundColor: COLOR.lightGrey2,
    borderRadius: hp(0.25),
    alignSelf: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  modalHeader: {
    paddingHorizontal: wp(6),
    marginBottom: hp(2),
  },
  modalTitle: {
    ...TEXT_STYLE.bigTextBold,
    color: COLOR.black,
  },
  filterSection: {
    paddingHorizontal: wp(6),
    marginBottom: hp(1),
  },
  sectionTitle: {
    ...TEXT_STYLE.textMedium,
    color: COLOR.black,
    marginBottom: hp(0.5),
  },
  sectionDescription: {
    ...TEXT_STYLE.smallText,
    color: COLOR.lightGrey,
    marginBottom: hp(1),
  },
  filterChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -wp(1),
  },
  filterChipWrapper: {
    position: 'relative',
    margin: wp(1),
    marginTop: hp(1.5),
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.lightGrey2,
    borderRadius: hp(1),
    paddingHorizontal: wp(2),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    position: 'relative',
    paddingVertical: hp(0.25),
  },
  filterChipSelected: {
    backgroundColor: '#D8CFFC',
    borderColor: COLOR.lightGrey,
  },
  filterChipText: {
    ...TEXT_STYLE.smallText,
    color: COLOR.black,
  },
  filterChipTextSelected: {
    color: COLOR.black,
  },
  crossIconContainer: {
    marginLeft: wp(2),
    width: hp(2),
    height: hp(2),
    borderRadius: hp(1.25),
    backgroundColor: COLOR.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    position: 'absolute',
    top: -hp(1),
    right: -hp(1),
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(1),
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: hp(0.5),
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    minWidth: wp(40),
    zIndex: 1000,
    elevation: 5,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  dropdownItemText: {
    ...TEXT_STYLE.smallText,
    color: COLOR.black,
  },
  chipSeparator: {
    width: 1,
    height: hp(2),
    backgroundColor: COLOR.lightGrey,
    marginHorizontal: wp(2),
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginBottom: hp(1),
    marginHorizontal: wp(6),
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginHorizontal: wp(1),
    justifyContent: 'space-between',
  },
  dateInputText: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
    marginTop: hp(0.5),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(6),
    marginTop: hp(2),
  },
  cancelButton: {
    width: wp(40),
    backgroundColor: COLOR.lightGrey2,
  },
  setButton: {
    width: wp(40),
  },
  calendarModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModalContainer: {
    backgroundColor: COLOR.white,
    borderRadius: hp(2),
    width: '90%',
    padding: hp(2),
    maxWidth: wp(90),
  },
  notificationsModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  notificationsModalContent: {
    width: '100%',
    height: '90%',
    backgroundColor: COLOR.white,
    paddingTop: hp(2),
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingBottom: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  notificationsTitle: {
    ...TEXT_STYLE.bigTextBold,
    color: COLOR.black,
  },
  clearAllText: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
  },
  notificationsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  noNotificationsText: {
    ...TEXT_STYLE.text,
    color: COLOR.lightGrey,
  },
  menuIconContainer: {
    position: 'relative',
  },
  customerMenuDropdown: {
    position: 'absolute',
    top: hp(5),
    right: 0,
    backgroundColor: COLOR.white,
    borderRadius: hp(1.5),
    paddingVertical: hp(0.5),
    minWidth: wp(50),
    zIndex: 1000,
    elevation: 5,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    columnGap: wp(3),
  },
  dropdownIconContainer: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(0.8),
    backgroundColor: '#E8E3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownIconContainerBlue: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(0.8),
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenuText: {
    ...TEXT_STYLE.smallTextSemiBold,
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  filterTagContainer: {
    paddingHorizontal: wp(6),
    marginTop: hp(2),
    marginBottom: hp(0.5),
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.purple,
    borderRadius: hp(2.5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    alignSelf: 'center',
  },
  filterTagText: {
    ...TEXT_STYLE.smallTextSemiBold,
    color: COLOR.white,
    marginRight: wp(2),
  },
  filterTagClose: {
    width: hp(2.2),
    height: hp(2.2),
    borderRadius: hp(1.1),
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseSecondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    gap: wp(2),
  },
  expenseBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#361d94",
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: COLOR.purple,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2.5),
    minHeight: hp(5.5),
    minWidth: hp(5.5),
  },
  expenseSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(1.5),
    paddingVertical: hp(0.5),
    paddingLeft: wp(2.5),
    minHeight: hp(5),
  },
  expenseSearchInput: {
    flex: 1,
    ...TEXT_STYLE.smallText,
    color: COLOR.black,
    paddingBottom: hp(0.75),
  },
  expenseActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  expenseActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#361d94',
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: COLOR.purple,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2.5),
    gap: wp(1.5),
    minHeight: hp(5.5),
  },
  expenseActionButtonText: {
    ...TEXT_STYLE.textSemiBold,
    color: COLOR.white,
  },
});
