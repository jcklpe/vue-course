import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import CarView from "@/views/CarView.vue";
import ContactView from "@/views/ContactView.vue";
import NotFoundView from "@/views/NotFoundView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "home",
            path: "/",
            component: HomeView
        },
        {
            path: "/home",
            redirect: "/"
        },
        {
            name: "about",
            path: "/about",
            component: AboutView
        },
        {
            name: "cars",
            path: "/cars/:id",
            component: CarView,
            children: [
                {
                    path: "contact",
                    component: ContactView
                }
            ]
        },
        {
            name: "Not Found",
            path: "/:catchall(.*)*",
            component: NotFoundView
        }
    ]
})

export default router;