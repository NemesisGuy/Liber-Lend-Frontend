//import Vue from 'vue';
// noinspection JSValidateTypes

import { createApp } from 'vue';
//import VueRouter from '../router';
import { createRouter, createWebHistory } from 'vue-router';

//import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import App from "@/App.vue";

// noinspection JSCheckFunctionSignatures


const router = createRouter( {history: createWebHistory(),
    routes: [
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
    ]
    });



export default router;
