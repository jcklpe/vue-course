import { ref } from "vue";

export default function () {
    const numbers = ref([1, 2, 3]);

    const addNumber = (number) => {
        numbers.value.push(number);
    }
    const filterNumber = (minNumber) => {
        return numbers.value.filter(number => number >= minNumber);
    }
    return {
        numbers,
        addNumber,
        filterNumber
    }
}