import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { memo, useMemo, useCallback } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { printReceipt } from '../../utils/ReceiptGenerator';
import { diffInHours } from '../../utils/dataUtils';
import { Label, Photo } from '../reuseables';
import { SVG } from '../../assets/svgs';
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide';
import EditTransactionModal from './EditTransactionalModal';
import { editTransactionApi } from '../../apis/Apis';

interface TransactionItemProps {
    item: any
}

const TransactionItem = ({ item }: TransactionItemProps) => {
    const userProfile = useAppSelector((state: any) => state.appReducer.user);

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editLoading, setEditLoading] = React.useState({ confirm: false, cancel: false });
    const [editError, setEditError] = React.useState('');

    // Memoize expensive calculations
    const hoursDiff = useMemo(() => item.date ? diffInHours(item.date) : 999, [item.date]);
    const isEditable = useMemo(() => !item.is_online && hoursDiff <= 48, [item.is_online, hoursDiff]);
    const avatarBackgroundColor = useMemo(() => item.avatarColor || '#E6F6FF', [item.avatarColor]);
    const defaultAmountValue = useMemo(() => item.amount ? String(item.amount) : '', [item.amount]);

    // Memoize callbacks to prevent unnecessary re-renders
    const handlePrint = useCallback(() => {
        if (item.originalItem) {
            printReceipt(item.originalItem, userProfile);
        }
    }, [item.originalItem, userProfile]);

    const handleOpenEditModal = useCallback(() => {
        setIsEditModalOpen(true);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setIsEditModalOpen(false);
    }, []);

    const handleEditTransaction = useCallback(async (amount: string | number, isCancel: boolean) => {
        setEditLoading(prev => ({ ...prev, confirm: !isCancel, cancel: isCancel }));
        setEditError('');

        const token = await AsyncStorage.getItem('access_token');

        if (!token) {
            setEditLoading({ confirm: false, cancel: false });
            setEditError('Authentication missing. Please login again.');
            Alert.alert("Error", 'Authentication missing. Please login again.');
            return;
        }

        const response = await editTransactionApi(item.id || item.transactionId, amount, token);

        if (response.success) {
            setEditLoading({ confirm: false, cancel: false });
            setIsEditModalOpen(false);
            // Trigger refresh if needed. Ideally, we should callback to parent to refresh list.
            // For now just closing. User might need to pull to refresh.
            Alert.alert("Success", `Transaction ${isCancel ? "cancelled" : "edited"} successfully!`);
        } else {
            let errorMessage = 'Failed to update transaction';
            const rawError = response.error?.message;
            console.log(rawError);

            setEditLoading({ confirm: false, cancel: false });
            setEditError(errorMessage);
            Alert.alert("Error", errorMessage);
        }
    }, [item.id, item.transactionId]);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={[styles.defaultAvatar, { backgroundColor: avatarBackgroundColor }]}>
                        <Photo
                            url="https://dev.wasooli.online/profile_image.jpg"
                            style={styles.avatar}
                        />

                    </View>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.topRow}>
                        <Label style={styles.name}>{item.name}</Label>
                        <View style={styles.actions}>
                            {isEditable && (
                                <>
                                    <TouchableOpacity style={styles.actionBtn} onPress={handleOpenEditModal}>
                                        <SVG.EDIT width={hp(2)} height={hp(2)} />
                                    </TouchableOpacity>
                                    <View style={{ width: wp(2) }} />
                                </>
                            )}

                            <TouchableOpacity style={styles.actionBtn} onPress={handlePrint}>
                                <SVG.PRINT width={hp(2)} height={hp(2)} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.idContainer}>
                        <SVG.TRANSACTION_ACTIVE width={hp(1.5)} height={hp(1.5)} />
                        <Label style={styles.idText}>{item.transactionId}</Label>
                    </View>
                </View>
            </View>
            <View style={styles.bottomRow}>
                <View style={styles.amountContainer}>
                    <View style={styles.coinIcon}>
                        <Label style={{ color: COLOR.white, fontSize: 10, fontFamily: 'Poppins-Bold' }}>RS</Label>
                    </View>
                    <Label style={styles.amount}>{item.amount}</Label>
                </View>
                <Label style={styles.date}>{item.date}</Label>
            </View>

            <EditTransactionModal
                visible={isEditModalOpen}
                onClose={handleCloseEditModal}
                onConfirm={(amount) => handleEditTransaction(amount, false)}
                onCancelTransaction={() => handleEditTransaction(0, true)}
                loading={editLoading}
                error={editError}
                defaultValue={defaultAmountValue}
            />
        </View>
    )
}

export default memo(TransactionItem)

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.white,
        marginHorizontal: wp(4),
        marginBottom: hp(1.5),
        padding: wp(3),
        borderRadius: hp(1.5),
        ...commonStyles.shadow_3,
    },
    infoContainer: {
        marginHorizontal: wp(2),
        flexDirection: 'row',
    },
    avatar: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
        marginRight: wp(2.5),
    },
    avatarContainer: {
        marginRight: wp(3),
        justifyContent: 'flex-start',
        marginTop: hp(0.5),
    },
    defaultAvatar: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
        ...commonStyles.center
    },
    contentContainer: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        ...TEXT_STYLE.smallTitleBold, // 22
        fontSize: 16, // Override to match design likely around 16
    },
    actions: {
        flexDirection: 'row',
    },
    actionBtn: {
        padding: 8,
        backgroundColor: '#F7F7F9',
        borderRadius: 8,
    },
    idContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(0.5),
        backgroundColor: '#F3F0FF',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    idText: {
        ...TEXT_STYLE.smallText,
        color: COLOR.purple,
        marginLeft: 4,
        fontSize: 12
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(1.5),
        marginHorizontal: wp(1.5),
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLOR.purple,
        ...commonStyles.center,
        marginRight: 8,
    },
    amount: {
        ...TEXT_STYLE.smallTitleMedium,
        fontSize: 16,
    },
    date: {
        ...TEXT_STYLE.smallTextMedium,
        color: COLOR.lightGrey,
        fontSize: 12
    }
})
