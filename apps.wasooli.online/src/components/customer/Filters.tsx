import { StyleSheet, View, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native'
import React, { memo, useState, useEffect } from 'react'
import { Label, Pressable, Button } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'

const Filters = () => {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Modal states
  const [modalType, setModalType] = useState('other')
  const [totalAmount, setTotalAmount] = useState('')
  const [invoiceName, setInvoiceName] = useState('')
  const [showModalTypeDropdown, setShowModalTypeDropdown] = useState(false)
  const [showInvoiceNameDropdown, setShowInvoiceNameDropdown] = useState(false)

  // Generate years dynamically (current year and previous years)
  const getYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear; i >= 2022; i--) {
      years.push(i.toString())
    }
    return years
  }

  const years = getYears()

  const typeOptions = ['All', 'Monthly', 'Other']
  const statusOptions = ['All', 'Paid', 'Unpaid']
  const modalTypeOptions = ['other', 'monthly']
  const invoiceNameOptions = ['Invoice 1', 'Invoice 2', 'Invoice 3'] // This can be dynamic based on API

  const handleSave = () => {
    // Handle save logic here
    console.log('Save:', { modalType, totalAmount, invoiceName })
    setShowAddModal(false)
    // Reset form
    setModalType('other')
    setTotalAmount('')
    setInvoiceName('')
  }

  const handleCancel = () => {
    setShowAddModal(false)
    // Reset form
    setModalType('other')
    setTotalAmount('')
    setInvoiceName('')
  }

  return (
    <>
      <View style={styles.filtersContainer}>
        {/* Type Dropdown */}
        <Pressable 
          style={styles.filterDropdown}
          onPress={() => {
            setShowTypeDropdown(!showTypeDropdown)
            setShowStatusDropdown(false)
            setShowYearDropdown(false)
          }}
        >
          <Label color={COLOR.black} style={styles.filterLabel}>
            Type: <Label color={COLOR.lightGrey} style={styles.filterValue}>{selectedType}</Label>
          </Label>
          <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
          {showTypeDropdown && (
            <View style={styles.dropdownMenu}>
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedType(option)
                    setShowTypeDropdown(false)
                  }}
                >
                  <Label color={COLOR.black} style={styles.dropdownItemText}>{option}</Label>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Pressable>

        {/* Status Dropdown */}
        <Pressable 
          style={styles.filterDropdown}
          onPress={() => {
            setShowStatusDropdown(!showStatusDropdown)
            setShowTypeDropdown(false)
            setShowYearDropdown(false)
          }}
        >
          <Label color={COLOR.black} style={styles.filterLabel}>
            Status: <Label color={COLOR.lightGrey} style={styles.filterValue}>{selectedStatus}</Label>
          </Label>
          <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
          {showStatusDropdown && (
            <View style={styles.dropdownMenu}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedStatus(option)
                    setShowStatusDropdown(false)
                  }}
                >
                  <Label color={COLOR.black} style={styles.dropdownItemText}>{option}</Label>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Pressable>

        {/* Year Dropdown */}
        <Pressable 
          style={styles.filterDropdown}
          onPress={() => {
            setShowYearDropdown(!showYearDropdown)
            setShowTypeDropdown(false)
            setShowStatusDropdown(false)
          }}
        >
          <Label color={COLOR.black} style={styles.filterLabel}>
            Year: <Label color={COLOR.lightGrey} style={styles.filterValue}>{selectedYear}</Label>
          </Label>
          <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
          {showYearDropdown && (
            <View style={styles.dropdownMenu}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedYear(year)
                    setShowYearDropdown(false)
                  }}
                >
                  <Label color={COLOR.black} style={styles.dropdownItemText}>{year}</Label>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Pressable>

        {/* Add Button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            console.log('Opening modal, showAddModal:', showAddModal)
            setShowAddModal(true)
          }}
          activeOpacity={0.7}
        >
          <SVG.PLUS  />
        </TouchableOpacity>
      </View>

      {/* Add Invoice Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                {/* Close Button */}
                <Pressable 
                  style={styles.closeButton}
                  onPress={handleCancel}
                >
                  <SVG.CROSS width={hp(2)} height={hp(2)} />
                </Pressable>

                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  style={styles.modalScrollView}
                  contentContainerStyle={styles.modalScrollContent}
                >
                  {/* Type Dropdown */}
                  <View style={styles.modalFieldContainer}>
                    <Label color={COLOR.black} style={styles.modalLabel}>Type</Label>
                    <View style={styles.modalDropdownWrapper}>
                      <Pressable 
                        style={styles.modalInput}
                        onPress={() => {
                          setShowModalTypeDropdown(!showModalTypeDropdown)
                          setShowInvoiceNameDropdown(false)
                        }}
                      >
                        <Label color={COLOR.black} style={styles.modalInputText}>
                          {modalType}
                        </Label>
                        <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
                      </Pressable>
                      {showModalTypeDropdown && (
                        <View style={styles.modalDropdownMenu}>
                          {modalTypeOptions.map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={styles.modalDropdownItem}
                              onPress={() => {
                                setModalType(option)
                                setShowModalTypeDropdown(false)
                              }}
                            >
                              <Label color={COLOR.black} style={styles.dropdownItemText}>{option}</Label>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Total Amount Input */}
                  <View style={styles.modalField}>
                    <Label color={COLOR.black} style={styles.modalLabel}>Total Amount</Label>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter Amount"
                      placeholderTextColor={COLOR.lightGrey}
                      value={totalAmount}
                      onChangeText={setTotalAmount}
                      keyboardType="numeric"
                    />
                  </View>

                  {/* Name of Invoice */}
                  <View style={styles.modalFieldContainer}>
                    <Label color={COLOR.black} style={styles.modalLabel}>Name of Invoice</Label>
                    <View style={styles.modalDropdownWrapper}>
                      <View style={styles.invoiceNameContainer}>
                        <TextInput
                          style={styles.invoiceNameInput}
                          placeholder="Enter Name of Invoice"
                          placeholderTextColor={COLOR.lightGrey}
                          value={invoiceName}
                          onChangeText={setInvoiceName}
                        />
                        <Pressable 
                          style={styles.invoiceDropdownIcon}
                          onPress={() => {
                            setShowInvoiceNameDropdown(!showInvoiceNameDropdown)
                            setShowModalTypeDropdown(false)
                          }}
                        >
                          <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} />
                        </Pressable>
                      </View>
                      {showInvoiceNameDropdown && (
                        <View style={styles.modalDropdownMenu}>
                          {invoiceNameOptions.map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={styles.modalDropdownItem}
                              onPress={() => {
                                setInvoiceName(option)
                                setShowInvoiceNameDropdown(false)
                              }}
                            >
                              <Label color={COLOR.black} style={styles.dropdownItemText}>{option}</Label>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.modalButtons}>
                    <Button 
                      onPress={handleCancel} 
                      style={[styles.cancelButton, { backgroundColor: COLOR.lightGrey2 }]} 
                      text="Cancel"
                      textStyle={{ color: COLOR.black }}
                    />
                    <Button 
                      onPress={handleSave} 
                      style={[styles.saveButton, { backgroundColor: COLOR.green }]} 
                      text="Save" 
                    />
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

export default memo(Filters)

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(1),
    gap: wp(2),
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.lightGrey2,
    borderRadius: hp(0.8),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.8),
    position: 'relative',
  },
  filterLabel: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: hp(1.3),
  },
  filterValue: {
    ...TEXT_STYLE.text,
    fontSize: hp(1.3),
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: hp(0.3),
    backgroundColor: COLOR.white,
    borderRadius: hp(0.8),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
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
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.8),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  dropdownItemText: {
    ...TEXT_STYLE.text,
    fontSize: hp(1.3),
  },
  addButton: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(2.25),
    backgroundColor: COLOR.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLOR.white,
    borderRadius: hp(2),
    width: '90%',
    maxHeight: '80%',
    padding: hp(2),
    paddingTop: hp(3),
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: hp(1.5),
    right: hp(1.5),
    zIndex: 1001,
    padding: hp(0.5),
  },
  modalScrollView: {
    maxHeight: hp(50),
  },
  modalScrollContent: {
    paddingBottom: hp(2),
  },
  modalField: {
    marginBottom: hp(1.5),
  },
  modalFieldContainer: {
    marginBottom: hp(1.5),
    zIndex: 1,
  },
  modalDropdownWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  modalLabel: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: hp(1.5),
    marginBottom: hp(0.8),
  },
  modalInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.white,
    borderRadius: hp(0.8),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    position: 'relative',
  },
  modalInputText: {
    ...TEXT_STYLE.text,
    fontSize: hp(1.4),
    flex: 1,
  },
  invoiceNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(0.8),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    position: 'relative',
  },
  invoiceNameInput: {
    flex: 1,
    ...TEXT_STYLE.text,
    fontSize: hp(1.4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  invoiceDropdownIcon: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  modalDropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: hp(0.3),
    backgroundColor: COLOR.white,
    borderRadius: hp(0.8),
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    zIndex: 10000,
    elevation: 10,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: hp(15),
  },
  modalDropdownItem: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    gap: wp(2),
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
})
