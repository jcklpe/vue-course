import { defineStore } from "pinia";

export const useNumbersStore = defineStore("numbers", {
    state: () => {
        return {
            numbers: [1, 2, 3, 4, 5, 25, 26, 27, 28]
        }
    },
    actions: {
    addNumber(number){
        this.numbers.push(number)
    }
    },
    getters: {
        doubleNumber: (state) =>  {
            return state.numbers.map(number => number * 2)
        },
        filterNumber: (state) => {
            return (minNumber) => state.numbers.filter(number => number >= minNumber)

        }
    }
})
