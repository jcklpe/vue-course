import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Quiz from "@/views/Quiz.vue";



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "home",
            path: "/",
            component: Home
        },
        {
            name: "quiz",
            path: "/quiz/:id",
            component: Quiz
        }
    ]
})

export default router;