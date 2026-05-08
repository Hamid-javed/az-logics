import React, { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { COLOR, wp, hp, TEXT_STYLE, commonStyles } from "../../enums/StyleGuide";

interface EditTransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (amount: string) => void;
    onCancelTransaction: () => void;
    loading: { confirm: boolean; cancel: boolean };
    error?: string;
    defaultValue: string;
}

const EditTransactionModal = ({
    visible,
    onClose,
    onConfirm,
    onCancelTransaction,
    loading,
    error,
    defaultValue,
}: EditTransactionModalProps) => {
    const [newAmount, setNewAmount] = useState(defaultValue);

    useEffect(() => {
        if (visible) {
            setNewAmount(defaultValue);
        }
    }, [visible, defaultValue]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContainer}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.title}>Edit Transaction</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    {/* Using a simple X if SVG not available easily, user provided RxCross1 previously */}
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Body */}
                            <View style={styles.body}>
                                <Text style={styles.message}>
                                    Are you sure you want to Edit : <Text style={styles.boldAmount}>{defaultValue}</Text>
                                </Text>

                                <TextInput
                                    value={newAmount}
                                    onChangeText={setNewAmount}
                                    placeholder="Enter new amount here"
                                    placeholderTextColor={COLOR.lightGrey}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />

                                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    onPress={() => onConfirm(newAmount)}
                                    disabled={loading.confirm || !newAmount}
                                    style={[styles.confirmButton, (loading.confirm || !newAmount) && styles.disabledButton]}
                                >
                                    {loading.confirm ? (
                                        <View style={styles.loadingRow}>
                                            <Text style={styles.buttonText}>Updating </Text>
                                            <ActivityIndicator size="small" color={COLOR.white} />
                                        </View>
                                    ) : (
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={onCancelTransaction}
                                    disabled={loading.cancel}
                                    style={[styles.cancelTransButton, loading.cancel && styles.disabledButton]}
                                >
                                    <Text style={styles.buttonText}>Cancel Transaction</Text>
                                    {loading.cancel && <ActivityIndicator size="small" color={COLOR.white} style={{ marginLeft: 5 }} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default EditTransactionModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(5),
    },
    modalContainer: {
        width: '100%',
        backgroundColor: COLOR.white,
        borderRadius: 12,
        padding: wp(4),
        ...commonStyles.shadow_5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
        position: 'relative',
    },
    title: {
        ...TEXT_STYLE.bigTextBold,
        fontSize: 18,
        color: COLOR.black,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
    closeText: {
        fontSize: 20,
        color: '#9CA3AF',
    },
    body: {
        marginBottom: hp(2),
    },
    message: {
        ...TEXT_STYLE.smallText,
        color: '#9CA3AF',
        textAlign: 'center',
        marginBottom: hp(1.5),
    },
    boldAmount: {
        ...TEXT_STYLE.smallTextBold,
        color: '#4B5563',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB', // Gray-300
        borderRadius: 8,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.2),
        fontSize: 14,
        color: COLOR.black,
        width: '100%',
    },
    errorText: {
        ...TEXT_STYLE.smallText,
        color: COLOR.red, // Assuming COLOR.red exists, logic from web had red text
        marginTop: 4,
        fontSize: 12,
    },
    footer: {
        gap: hp(1),
    },
    confirmButton: {
        backgroundColor: '#5932EA', // From User Request
        paddingVertical: hp(1.5),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelTransButton: {
        backgroundColor: '#ed6161', // From User Request
        paddingVertical: hp(1.5),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        ...TEXT_STYLE.smallTitleBold,
        fontSize: 14,
        color: COLOR.white,
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});