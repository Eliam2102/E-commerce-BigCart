// paymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
}

const initialState: PaymentState = {
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  cardholderName: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof PaymentState; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    resetPayment: () => initialState, // Acción para reiniciar el estado
  },
});

export const { updateField, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
