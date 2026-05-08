import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input, Button, Label, Pressable, useToast } from '../reuseables'
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'
import { SVG } from '../../assets/svgs'
import {
  createExpenseService,
  updateExpenseService,
  CreateExpenseData,
  Expense,
} from '../../apis/Apis'
import { useAppSelector } from '../../redux/hooks'

interface FileAttachment {
  name: string
  url: string
  status: 'uploading' | 'completed' | 'failed'
  file?: any
}

interface KeyValuePair {
  key: string
  value: string
  fromBackend: boolean
}

interface FormProps {
  onSuccess?: () => void
}

const Form = ({ onSuccess }: FormProps = {}) => {
  const route = useRoute()
  const navigation = useNavigation<any>()
  const { showToast } = useToast()
  const userProfile = useAppSelector((state: any) => state.appReducer.user)

  const expenseId = (route.params as any)?.expenseId
  const expenseData = (route.params as any)?.expenseData
  const isEdit = Boolean(expenseId || expenseData)

  const [form, setForm] = useState({
    type: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    description: '',
    files: [] as FileAttachment[],
    keyValuePairs: [{ key: '', value: '', fromBackend: false }] as KeyValuePair[],
  })

  const [saving, setSaving] = useState(false)
  const [expenseTypes, setExpenseTypes] = useState<string[]>([])
  const [loadingTypes, setLoadingTypes] = useState(false)
  const [typesOpen, setTypesOpen] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Format date to readable format: "15 Jan 2024"
  const formatReadableDate = (dateString: string): string => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      const day = date.getDate()
      const month = date.toLocaleString('en-US', { month: 'short' })
      const year = date.getFullYear()
      return `${day} ${month} ${year}`
    } catch (error) {
      return dateString
    }
  }

  // Format file name
  const formatFileName = (name: string): string => {
    if (!name) return ''
    const lastDot = name.lastIndexOf('.')
    const base = lastDot > -1 ? name.slice(0, lastDot) : name
    const ext = lastDot > -1 ? name.slice(lastDot + 1) : ''
    const shortBase = base.length > 14 ? base.slice(0, 14) + '...' : base
    return ext ? `${shortBase}.${ext}` : shortBase
  }

  // Load expense types (placeholder - you may need to add an API endpoint)
  useEffect(() => {
    const loadTypes = async () => {
      try {
        setLoadingTypes(true)
        // TODO: Replace with actual API call if available
        // const types = await getExpenseTypes()
        // For now, using common expense types
        const defaultTypes = [
          'Office Supplies',
          'Travel',
          'Utilities',
          'Rent',
          'Marketing',
          'Equipment',
          'Other',
        ]
        setExpenseTypes(defaultTypes)
        if (!isEdit && defaultTypes.length > 0 && !form.type) {
          const def = defaultTypes.find((n) => n.toLowerCase() === 'other') || defaultTypes[0]
          setForm((p) => ({ ...p, type: def }))
        }
      } catch (error) {
        console.error('Error loading expense types:', error)
      } finally {
        setLoadingTypes(false)
      }
    }
    loadTypes()
  }, [isEdit])

  // Prefill form for edit mode
  useEffect(() => {
    if (isEdit && expenseData) {
      const prefill = expenseData as Expense

      // Build key/value pairs from metadata
      let keyValuePairs: KeyValuePair[] = []
      if (prefill.metadata) {
        const metadata = prefill.metadata
        keyValuePairs = Object.entries(metadata)
          .filter(([key]) => key !== 'attachments')
          .map(([key, value]) => ({
            key,
            value: String(value || ''),
            fromBackend: true,
          }))
      }
      if (keyValuePairs.length === 0) {
        keyValuePairs = [{ key: '', value: '', fromBackend: false }]
      }

      // Existing attachments
      const existingAttachments: FileAttachment[] = []
      if (prefill.metadata?.attachments && Array.isArray(prefill.metadata.attachments)) {
        existingAttachments.push(
          ...prefill.metadata.attachments.map((att: any) => ({
            name: att?.name || 'attachment',
            url: att?.url || '',
            status: 'completed' as const,
          }))
        )
      }

      setForm({
        type: prefill.type || '',
        amount: prefill.amount || '',
        date: prefill.date_of_expense || new Date().toISOString().split('T')[0],
        description: prefill.description || '',
        files: existingAttachments,
        keyValuePairs,
      })

      // Set selected date
      if (prefill.date_of_expense) {
        setSelectedDate(new Date(prefill.date_of_expense))
      }
    }
  }, [isEdit, expenseData])

  const handleChange = (key: string) => (value: string) => {
    if (key === 'date') {
      const today = new Date().toISOString().split('T')[0]
      if (value > today) value = today
    }
    setForm((p) => ({ ...p, [key]: value }))
  }

  const handleDateSelect = (date: Date) => {
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    if (date > today) {
      showToast('Date cannot be in the future', 'error')
      return
    }
    setSelectedDate(date)
    const dateString = date.toISOString().split('T')[0]
    handleChange('date')(dateString)
    setShowDatePicker(false)
  }

  const handleFiles = async () => {
    // TODO: Implement file picker using react-native-document-picker
    // For now, showing a placeholder
    Alert.alert('File Picker', 'File picker will be implemented with react-native-document-picker')
    
    // Example implementation structure:
    // const result = await DocumentPicker.pick({
    //   type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    //   allowMultiSelection: true,
    // })
    // 
    // const validFiles = result.filter((file) => file.size <= 2 * 1024 * 1024)
    // if (validFiles.length !== result.length) {
    //   showToast('Some files are larger than 2MB and have been skipped', 'error')
    // }
    //
    // const currentCount = form.files.length
    // const remainingSlots = Math.max(0, 6 - currentCount)
    // const toUpload = validFiles.slice(0, remainingSlots)
    //
    // // Upload files via presigned URL (if API available)
    // for (const file of toUpload) {
    //   // Upload logic here
    // }
  }

  const removeFile = (index: number) => {
    setForm((p) => ({
      ...p,
      files: p.files.filter((_, i) => i !== index),
    }))
  }

  const handlePairChange = (idx: number, field: 'key' | 'value', value: string) => {
    setForm((p) => ({
      ...p,
      keyValuePairs: p.keyValuePairs.map((pair, i) =>
        i === idx ? { ...pair, [field]: value } : pair
      ),
    }))
  }

  const addPair = () => {
    const hasEmptyPair = form.keyValuePairs.some(
      (pair) => !pair.key.trim() || !pair.value.trim()
    )
    if (hasEmptyPair) {
      return
    }
    setForm((p) => ({
      ...p,
      keyValuePairs: [{ key: '', value: '', fromBackend: false }, ...p.keyValuePairs],
    }))
  }

  const removePair = (idx: number) => {
    setForm((p) => ({
      ...p,
      keyValuePairs: p.keyValuePairs.filter((_, i) => i !== idx),
    }))
  }

  const handleSubmit = async () => {
    if (!form.type || !form.amount) {
      setShowErrors(true)
      showToast('Please fill in required fields: Type and Amount', 'error')
      return
    }

    if (!userProfile?.merchant_id) {
      showToast('Merchant ID not found', 'error')
      return
    }

    setSaving(true)
    try {
      const token = await AsyncStorage.getItem('access_token')

      // Build metadata from key/value pairs and attachments
      const metadata: any = {}
      form.keyValuePairs
        .filter((p) => p.key.trim() && p.value.trim())
        .forEach((p) => {
          metadata[p.key.trim()] = p.value.trim()
        })

      // Include completed uploads
      const uploaded = form.files.filter((f) => f.status === 'completed')
      if (uploaded.length > 0) {
        metadata.attachments = uploaded.map((f) => ({
          name: f.name,
          url: f.url,
        }))
      }

      const expensePayload: CreateExpenseData = {
        type: form.type,
        amount: form.amount,
        date_of_expense: form.date,
        description: form.description || undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      }

      let response
      if (isEdit) {
        response = await updateExpenseService(expenseId || expenseData?.id, expensePayload, token || undefined)
      } else {
        response = await createExpenseService(userProfile.merchant_id, expensePayload, token || undefined)
      }

      if (response.success) {
        showToast(isEdit ? 'Expense updated successfully' : 'Expense created successfully', 'success')
        if (onSuccess) {
          onSuccess()
        } else {
          navigation.goBack()
        }
      } else {
        showToast(response.error?.message || 'Failed to save expense', 'error')
      }
    } catch (error: any) {
      console.error('Error saving expense:', error)
      showToast(error?.message || 'An error occurred while saving', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Type Dropdown */}
        <View style={styles.fieldContainer}>
          <Label style={styles.label}>Type</Label>
          <Pressable
            onPress={() => setTypesOpen(true)}
            style={[
              styles.dropdown,
              showErrors && !form.type && styles.errorBorder,
            ].filter(Boolean) as ViewStyle[]}
          >
            <Label style={styles.dropdownText} numberOfLines={1}>
              {form.type || (loadingTypes ? 'Loading...' : 'Select type')}
            </Label>
            {loadingTypes && !form.type && (
              <ActivityIndicator size="small" color={COLOR.purple} />
            )}
            <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
          </Pressable>
        </View>

        {/* Amount Input */}
        <Input
          inputLabel="Amount"
          placeholder="40,000"
          value={form.amount}
          onChange={handleChange('amount')}
          keyboard="numeric"
          style={[
            styles.inputContainer,
            showErrors && !form.amount && styles.errorBorder,
          ].filter(Boolean)[0] as ViewStyle}
        />

        {/* Date Picker */}
        <View style={styles.fieldContainer}>
          <Label style={styles.label}>Date</Label>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <SVG.CALENDER width={hp(2)} height={hp(2)} />
            <Label style={styles.dateText}>
              {form.date ? formatReadableDate(form.date) : 'Select date'}
            </Label>
            <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
          </Pressable>
        </View>

        {/* Description Textarea */}
        <Input
          inputLabel="Description"
          placeholder="Write Description here"
          value={form.description}
          onChange={handleChange('description')}
          multiline
          lines={4}
          style={styles.textAreaContainer}
        />

        {/* Attachments */}
        <View style={styles.fieldContainer}>
          <Label style={styles.label}>Attachments</Label>
          <Pressable
            onPress={handleFiles}
            disabled={form.files.length >= 6}
            style={[
              styles.attachButton,
              form.files.length >= 6 && styles.attachButtonDisabled,
            ].filter(Boolean) as ViewStyle[]}
          >
            <SVG.PLUS width={hp(2)} height={hp(2)} />
            <Label style={styles.attachButtonText}>
              {form.files.length >= 6
                ? 'Maximum 6 files reached'
                : 'Choose Files to Attach (max 2MB each)'}
            </Label>
          </Pressable>

          {form.files.length > 0 && (
            <View style={styles.filesContainer}>
              {form.files.map((f, i) => (
                <View key={`${f.name}-${i}`} style={styles.fileItem}>
                  <Label style={styles.fileName} numberOfLines={1}>
                    {formatFileName(f.name)}
                  </Label>
                  <View style={styles.fileActions}>
                    {f.status === 'uploading' ? (
                      <ActivityIndicator size="small" color={COLOR.purple} />
                    ) : (
                      <>
                        {f.status === 'failed' && (
                          <Label style={styles.failedText}>Failed</Label>
                        )}
                        <Pressable
                          onPress={() => removeFile(i)}
                          style={styles.removeButton}
                        >
                          <SVG.CROSS width={hp(2)} height={hp(2)} />
                        </Pressable>
                      </>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Key/Value Pairs */}
        <View style={styles.fieldContainer}>
          <View style={styles.keyValueHeader}>
            <Pressable
              onPress={addPair}
              disabled={form.keyValuePairs.some(
                (pair) => !pair.key.trim() || !pair.value.trim()
              )}
              style={[
                styles.addPairButton,
                form.keyValuePairs.some(
                  (pair) => !pair.key.trim() || !pair.value.trim()
                ) && styles.addPairButtonDisabled,
              ].filter(Boolean) as ViewStyle[]}
            >
              <SVG.KEY width={hp(2)} height={hp(2)} />
            </Pressable>
          </View>

          <View style={styles.keyValueContainer}>
            {form.keyValuePairs.map((pair, idx) => (
              <View key={idx} style={styles.keyValueRow}>
                <Input
                  placeholder="Key"
                  value={pair.key}
                  onChange={(text) => handlePairChange(idx, 'key', text)}
                  style={styles.keyInput}
                />
                <View style={styles.valueRow}>
                  <Input
                    placeholder="Value"
                    value={pair.value}
                    onChange={(text) => handlePairChange(idx, 'value', text)}
                    style={styles.valueInput}
                  />
                  {((form.keyValuePairs.length > 1 ||
                    (isEdit && (pair.key?.trim() || pair.value?.trim()))) &&
                    (pair.key?.trim() || pair.value?.trim())) && (
                    <Pressable
                      onPress={() => removePair(idx)}
                      style={styles.removePairButton}
                      disabled={!isEdit && form.keyValuePairs.length <= 1}
                    >
                      <SVG.CROSS width={hp(2)} height={hp(2)} />
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <Button
          text={isEdit ? 'Update Expense' : 'Save Expense'}
          onPress={handleSubmit}
          isLoading={saving}
          disabled={saving}
          style={styles.submitButton}
        />
      </ScrollView>

      {/* Type Dropdown Modal */}
      <Modal
        visible={typesOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setTypesOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setTypesOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdownModal}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {expenseTypes.length === 0 ? (
                    <View style={styles.emptyOption}>
                      <Label style={styles.emptyText}>No options</Label>
                    </View>
                  ) : (
                    expenseTypes.map((name, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => {
                          setForm((p) => ({ ...p, type: name }))
                          setTypesOpen(false)
                        }}
                        style={[
                          styles.dropdownOption,
                          form.type === name && styles.dropdownOptionSelected,
                        ].filter(Boolean) as ViewStyle[]}
                      >
                        <Label
                          style={[
                            styles.dropdownOptionText,
                            form.type === name && styles.dropdownOptionTextSelected,
                          ].filter(Boolean) as TextStyle[]}
                        >
                          {name}
                        </Label>
                      </Pressable>
                    ))
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.datePickerModal}>
                <Label style={styles.datePickerTitle}>Select Date</Label>
                <View style={styles.datePickerContainer}>
                  <ScrollView
                    style={styles.datePickerScroll}
                    showsVerticalScrollIndicator={false}
                  >
                    {/* Year Selection */}
                    <View style={styles.datePickerSection}>
                      <Label style={styles.datePickerSectionTitle}>Year</Label>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.datePickerHorizontal}
                      >
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() - i
                          return (
                            <Pressable
                              key={year}
                              onPress={() => {
                                const newDate = new Date(selectedDate)
                                newDate.setFullYear(year)
                                setSelectedDate(newDate)
                              }}
                              style={[
                                styles.datePickerItem,
                                selectedDate.getFullYear() === year &&
                                  styles.datePickerItemSelected,
                              ].filter(Boolean) as ViewStyle[]}
                            >
                              <Label
                                style={[
                                  styles.datePickerItemText,
                                  selectedDate.getFullYear() === year &&
                                    styles.datePickerItemTextSelected,
                                ].filter(Boolean) as TextStyle[]}
                              >
                                {year}
                              </Label>
                            </Pressable>
                          )
                        })}
                      </ScrollView>
                    </View>

                    {/* Month Selection */}
                    <View style={styles.datePickerSection}>
                      <Label style={styles.datePickerSectionTitle}>Month</Label>
                      <View style={styles.datePickerGrid}>
                        {[
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
                        ].map((month, index) => (
                          <Pressable
                            key={month}
                            onPress={() => {
                              const newDate = new Date(selectedDate)
                              newDate.setMonth(index)
                              setSelectedDate(newDate)
                            }}
                            style={[
                              styles.datePickerGridItem,
                              selectedDate.getMonth() === index &&
                                styles.datePickerItemSelected,
                            ].filter(Boolean) as ViewStyle[]}
                          >
                            <Label
                              style={[
                                styles.datePickerGridItemText,
                                selectedDate.getMonth() === index &&
                                  styles.datePickerItemTextSelected,
                              ].filter(Boolean) as TextStyle[]}
                            >
                              {month}
                            </Label>
                          </Pressable>
                        ))}
                      </View>
                    </View>

                    {/* Day Selection */}
                    <View style={styles.datePickerSection}>
                      <Label style={styles.datePickerSectionTitle}>Day</Label>
                      <View style={styles.datePickerGrid}>
                        {Array.from(
                          {
                            length: new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth() + 1,
                              0
                            ).getDate(),
                          },
                          (_, i) => i + 1
                        ).map((day) => (
                          <Pressable
                            key={day}
                            onPress={() => {
                              const newDate = new Date(selectedDate)
                              newDate.setDate(day)
                              setSelectedDate(newDate)
                            }}
                            style={[
                              styles.datePickerGridItem,
                              selectedDate.getDate() === day &&
                                styles.datePickerItemSelected,
                            ].filter(Boolean) as ViewStyle[]}
                          >
                            <Label
                              style={[
                                styles.datePickerGridItemText,
                                selectedDate.getDate() === day &&
                                  styles.datePickerItemTextSelected,
                              ].filter(Boolean) as TextStyle[]}
                            >
                              {day}
                            </Label>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </ScrollView>
                </View>
                <View style={styles.datePickerActions}>
                  <Button
                    text="Cancel"
                    onPress={() => setShowDatePicker(false)}
                    style={styles.datePickerCancelButton}
                  />
                  <Button
                    text="Select"
                    onPress={() => handleDateSelect(selectedDate)}
                    style={styles.datePickerSelectButton}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default memo(Form)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(10),
  },
  fieldContainer: {
    marginVertical: hp(1),
  },
  label: {
    ...TEXT_STYLE.text,
    color: '#616161',
    marginBottom: hp(0.5),
    fontSize: hp(1.6),
  },
  dropdown: {
    height: hp(6),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: '#E4E7EC',
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  dropdownText: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
    flex: 1,
  },
  errorBorder: {
    borderColor: COLOR.red,
  },
  inputContainer: {
    marginVertical: hp(0.5),
  },
  datePickerButton: {
    height: hp(6),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: '#E4E7EC',
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    gap: wp(2),
  },
  dateText: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
    flex: 1,
  },
  textAreaContainer: {
    marginVertical: hp(0.5),
  },
  attachButton: {
    height: hp(6.5),
    borderRadius: wp(3),
    backgroundColor: '#5A64EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(2),
  },
  attachButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  attachButtonText: {
    ...TEXT_STYLE.textSemiBold,
    color: COLOR.white,
    fontSize: hp(1.6),
  },
  filesContainer: {
    marginTop: hp(1),
    maxHeight: hp(20),
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: wp(2.5),
    padding: wp(3),
    backgroundColor: COLOR.white,
    marginBottom: hp(0.5),
  },
  fileName: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
    flex: 1,
    fontSize: hp(1.5),
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  failedText: {
    ...TEXT_STYLE.smallText,
    color: COLOR.red,
    backgroundColor: '#FFE5E5',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: wp(1),
  },
  removeButton: {
    width: hp(3.5),
    height: hp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyValueHeader: {
    marginBottom: hp(1),
  },
  addPairButton: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    backgroundColor: COLOR.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPairButtonDisabled: {
    opacity: 0.5,
  },
  keyValueContainer: {
    maxHeight: hp(20),
  },
  keyValueRow: {
    marginBottom: hp(1),
  },
  keyInput: {
    marginBottom: hp(0.5),
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  valueInput: {
    flex: 1,
  },
  removePairButton: {
    width: hp(4.5),
    height: hp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: COLOR.white,
    borderRadius: wp(2.5),
    width: wp(90),
    maxHeight: hp(40),
    borderWidth: 1,
    borderColor: '#E4E7EC',
    ...commonStyles.shadow_5,
  },
  dropdownScroll: {
    maxHeight: hp(40),
  },
  emptyOption: {
    padding: wp(4),
  },
  emptyText: {
    ...TEXT_STYLE.text,
    color: COLOR.lightGrey,
  },
  dropdownOption: {
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownOptionSelected: {
    backgroundColor: '#F5F5F5',
  },
  dropdownOptionText: {
    ...TEXT_STYLE.text,
    color: COLOR.lightGrey,
  },
  dropdownOptionTextSelected: {
    color: COLOR.black,
  },
  datePickerModal: {
    backgroundColor: COLOR.white,
    borderRadius: wp(3),
    width: wp(90),
    padding: wp(4),
    ...commonStyles.shadow_10,
  },
  datePickerTitle: {
    ...TEXT_STYLE.bigTextSemiBold,
    color: COLOR.black,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  datePickerIOS: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerAndroid: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerHint: {
    ...TEXT_STYLE.text,
    color: COLOR.lightGrey,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  datePickerActions: {
    flexDirection: 'row',
    gap: wp(2),
    marginTop: hp(2),
  },
  datePickerCancelButton: {
    flex: 1,
    backgroundColor: COLOR.lightGrey2,
  },
  datePickerSelectButton: {
    flex: 1,
  },
  datePickerContainer: {
    maxHeight: hp(40),
    marginVertical: hp(2),
  },
  datePickerScroll: {
    maxHeight: hp(40),
  },
  datePickerSection: {
    marginBottom: hp(2),
  },
  datePickerSectionTitle: {
    ...TEXT_STYLE.textSemiBold,
    color: COLOR.black,
    marginBottom: hp(1),
    fontSize: hp(1.8),
  },
  datePickerHorizontal: {
    flexDirection: 'row',
  },
  datePickerItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginRight: wp(2),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#E4E7EC',
    backgroundColor: COLOR.white,
  },
  datePickerItemSelected: {
    backgroundColor: COLOR.purple,
    borderColor: COLOR.purple,
  },
  datePickerItemText: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
  },
  datePickerItemTextSelected: {
    color: COLOR.white,
  },
  datePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  datePickerGridItem: {
    width: wp(20),
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#E4E7EC',
    backgroundColor: COLOR.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerGridItemText: {
    ...TEXT_STYLE.text,
    color: COLOR.black,
  },
})
