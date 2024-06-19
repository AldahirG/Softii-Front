<template>
  <div class="numeric-keypad">
    <div class="display">
      <span>#</span>
      <span class="input">{{ currentInput }}</span>
      <button @click="clearInput" class="clear-button">✖️</button>
    </div>
    <div class="keys">
      <button v-for="key in keys" :key="key" @click="handleKeyPress(key)">
        {{ key }}
      </button>
      <button @click="confirmInput" class="confirm-button">✔️</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NumericKeypad',
  emits: ['input', 'confirm'],
  setup(_, { emit }) {
    const currentInput = ref('');

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'];

    const handleKeyPress = (key: string) => {
      currentInput.value += key;
      emit('input', currentInput.value);
    };

    const clearInput = () => {
      currentInput.value = '';
      emit('input', currentInput.value);
    };

    const confirmInput = () => {
      emit('confirm', currentInput.value);
    };

    return {
      currentInput,
      keys,
      handleKeyPress,
      clearInput,
      confirmInput
    };
  }
});
</script>

<style scoped>
.numeric-keypad {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ff6868;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff7f7;
}

.display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #555;
}

.display .input {
  flex-grow: 1;
  text-align: right;
  padding-right: 10px;
}

.clear-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
}

.keys {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}

.confirm-button {
  grid-column: span 3;
  background-color: #ff6868;
  color: #fff;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
