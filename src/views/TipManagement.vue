<template>
  <div class="tip-management">
    <header>
      <button @click="goBack" class="back-button">
        <i class="fas fa-arrow-left"></i> Atrás
      </button>
      <h1>Pago de Propinas</h1>
      <div class="total-cash">
        <span>Efectivo en Caja</span>
        <span class="amount">$5,500.00</span>
      </div>
    </header>
    <section class="main-section">
      <div class="left-panel">
        <div class="total-tips">
          <label>Total de Propinas:</label>
          <div class="total-tips-input">
            <span class="total-amount">${{ tip.amount.toFixed(2) }}</span>
            <button @click="editAmount" class="edit-button">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <div class="divide-tips">
          <label>¿Entre cuántos quieres dividir las Propinas?</label>
          <input type="number" v-model="numberOfEmployees.value" class="input-number-employees" @input="updatePerPersonAmount" />
          <div v-if="numberOfEmployees.value > 0" class="per-person">
            <span>${{ dividedTipAmount.toFixed(2) }} por Persona</span>
          </div>
        </div>
        <div class="payment-method">
          <label>Elige el Método de Pago</label>
          <div class="methods">
            <div class="method" @click="selectPaymentMethod('efectivo')" :class="{ selected: tip.method === 'efectivo' }">
              <i class="fas fa-money-bill-wave"></i> Efectivo
            </div>
            <div class="method" @click="selectPaymentMethod('bbva')" :class="{ selected: tip.method === 'bbva' }">
              <i class="fas fa-credit-card"></i> BBVA 1234
            </div>
            <div class="method" @click="selectPaymentMethod('santander')" :class="{ selected: tip.method === 'santander' }">
              <i class="fas fa-university"></i> Santander 1234
            </div>
          </div>
        </div>
      </div>
      <div class="middle-panel">
        <numeric-keypad @input="handleKeypadInput" @confirm="confirmInput" />
      </div>
      <div class="right-panel">
        <div class="payments">
          <h2>Pagos</h2>
          <div v-if="payments.length === 0" class="no-payments">
            <span>Sin Pagos</span>
          </div>
          <ul v-else>
            <li v-for="(payment, index) in payments" :key="index" class="payment-item">
              <i :class="getPaymentIcon(payment.method)"></i>
              <span>{{ payment.method }}</span>: <span>${{ payment.amount.toFixed(2) }}</span>
              <button @click="removePayment(index)">❌</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer>
      <div class="summary">
        <div class="total-paid">
          <span>Total Pagado</span>
          <span class="amount">${{ totalPaid.toFixed(2) }}</span>
        </div>
        <div class="remaining">
          <span>Restante por Pagar</span>
          <span class="amount">${{ (tip.amount - totalPaid).toFixed(2) }}</span>
        </div>
        <button :disabled="!canAddPayment" @click="addPayment">Pagar ${{ dividedTipAmount.toFixed(2) }} en Propinas</button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { addTip } from '../services/tipService';
import NumericKeypad from '../components/NumericKeypad.vue';

export default defineComponent({
  name: 'TipManagement',
  components: {
    NumericKeypad
  },
  setup() {
    const tip = reactive({
      amount: 1500, 
      method: '',
      employees: [] as Array<{ name: string; amount: number }>
    });
    const numberOfEmployees = reactive({ value: 0 });
    const payments = reactive([] as Array<{ method: string; amount: number }>);

    const dividedTipAmount = computed(() => {
      return numberOfEmployees.value > 0 ? tip.amount / numberOfEmployees.value : 0;
    });

    const selectPaymentMethod = (method: string) => {
      tip.method = method;
    };

    const totalPaid = computed(() => {
      return payments.reduce((acc, payment) => acc + payment.amount, 0);
    });

    const canAddPayment = computed(() => {
      return tip.method !== '' && numberOfEmployees.value > 0 && dividedTipAmount.value > 0;
    });

    const addPayment = () => {
      payments.push({ method: tip.method, amount: dividedTipAmount.value });
      tip.method = '';
    };

    const removePayment = (index: number) => {
      payments.splice(index, 1);
    };

    const handleKeypadInput = (value: string) => {
      numberOfEmployees.value = parseInt(value) || 0;
    };

    const confirmInput = (value: string) => {
      numberOfEmployees.value = parseInt(value) || 0;
    };

    const updatePerPersonAmount = () => {
    };

    const editAmount = () => {
    };

    const getPaymentIcon = (method: string) => {
      switch (method) {
        case 'efectivo':
          return 'fas fa-money-bill-wave';
        case 'bbva':
          return 'fas fa-credit-card';
        case 'santander':
          return 'fas fa-university';
        default:
          return '';
      }
    };

    const goBack = () => {
    };

    return {
      tip,
      numberOfEmployees,
      payments,
      dividedTipAmount,
      selectPaymentMethod,
      totalPaid,
      canAddPayment,
      addPayment,
      removePayment,
      handleKeypadInput,
      confirmInput,
      updatePerPersonAmount,
      editAmount,
      getPaymentIcon,
      goBack
    };
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

.tip-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #ff6868;
}

h1 {
  font-weight: bold;
  color: #333;
}

.total-cash {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 8px;
}

.main-section {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.left-panel, .middle-panel, .right-panel {
  flex: 1;
  padding: 20px;
  min-width: 300px; /* Ajuste para responsive */
}

.middle-panel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-panel {
  border-left: 3px solid #ff6868;
}

.total-tips {
  display: flex;
  flex-direction: column;
}

.total-tips-input {
  display: flex;
  align-items: center;
}

.total-amount {
  font-size: 30px;
  font-weight: bold;
  color: #ff6868;
  margin-right: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.edit-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
}

.divide-tips {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-number-employees {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 18px;
}

.per-person {
  color: #ff6868;
  font-weight: bold;
  margin-top: 10px;
}

.payment-method {
  display: flex;
  flex-direction: column;
}

.methods {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.methods .method {
  flex: 1;
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
}

.methods .method.selected {
  background-color: #ff6868;
  color: #fff;
}

.methods .method:hover {
  background-color: #f0f0f0;
}

footer {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 10px 0;
}

.total-paid, .remaining {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
}

.total-paid .amount, .remaining .amount {
  font-size: 24px;
}

button:disabled {
  background-color: #ccc;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ff6868;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff4b4b;
}

.payments {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.no-payments {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #666;
}

.payment-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.payment-item button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

@media (max-width: 768px) {
  .main-section {
    flex-direction: column;
  }

  .left-panel, .middle-panel, .right-panel {
    width: 100%;
    padding: 10px;
  }

  footer {
    flex-direction: column;
    align-items: center;
  }

  .summary {
    flex-direction: column;
    align-items: center;
  }

  .summary > div {
    margin-bottom: 10px;
  }
}
</style>
