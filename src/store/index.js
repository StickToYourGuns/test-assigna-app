import { defineStore } from 'pinia';
import { ref, onMounted, computed, toRaw } from 'vue';
import axiosInstance from '@/axios.js';
import router from '../router';

export const useDataStore = defineStore('data', () => {
    // State
    const isLoading = ref(false);
    const data = ref(null);
    const error = ref(null);
    let currentPage = ref(1);
    let limit = ref(10);
    let searchQuery = ref(null);
    let skip = ref(null);
    let itemsCount = ref(1);
    let totalPages = computed(() => Math.ceil(itemsCount.value / limit.value));

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }

    // Actions
    const logOut = () => {
        localStorage.clear();
        router.push('/login');
    }

    const logIn = async (payload) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axiosInstance.post('/login', { 'username': payload });
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('userName', payload);
                router.push('/products');
            } else {
                error.value = response.data;
            }
        } catch (err) {
            error.value = err.message || 'Ошибка при отправке данных';
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    };

    const getProducts = async () => {
        isLoading.value = true;
        error.value = null;
        const params = {
            skip: skip.value ? skip.value : null,
            limit: limit.value ? limit.value : null,
            search: searchQuery.value ? searchQuery.value : null,
        };
        try {
            const response = await axiosInstance.get('/products', { headers, params });
            if (response.status === 200) {
                data.value = response.data;
                getItemsCount();
                console.log(response.data);

            } else {
                error.value = response.data;
            }
        } catch (err) {
            error.value = err.message || 'Ошибка при отправке данных';
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    };

    const getItemsCount = async () => {
        isLoading.value = true;
        try {
            const response = await axiosInstance.get('/products', { headers });
            if (response.status === 200) {
                itemsCount.value = response.data.length;
            }
        } catch {
            error.value = err.message || 'Ошибка при отправке данных';
        } finally {
            isLoading.value = false;
        }
    };

    const createProduct = async (payload) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axiosInstance.post('/products', payload, { headers });
            if (response.status === 200) {
                getProducts();
            } else {
                error.value = response.data;
            }
        } catch (err) {
            error.value = err.message || 'Ошибка при отправке данных';
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    };

    const updateProduct = async (payload, id) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axiosInstance.put(`/products/${id}`, payload, { headers });
            if (response.status === 200) {
                getProducts();
            } else {
                error.value = response.data;
            }
        } catch (err) {
            error.value = err.message || 'Ошибка при отправке данных';
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteProduct = async (id) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axiosInstance.delete(`/products/${id}`, { headers });
            if (response.status === 200) {
                getProducts();
            } else {
                error.value = response.data;
            }
        } catch (err) {
            error.value = err.message || 'Ошибка при отправке данных';
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    }

    const updatePagination = ({ count, page }) => {
        if (count) {
            limit.value = count;
            currentPage.value = 1;
            skip.value = 0;
        };
        if (page) skip.value = ((page - 1) * limit.value);
        if (page) currentPage.value = (page);
        getProducts();
    }

    const updatesearchQuery = (newQuery) => {
        searchQuery.value = newQuery;
        getProducts();
    }

    return {
        data,
        error,
        isLoading,
        logOut,
        logIn,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        currentPage,
        limit,
        searchQuery,
        totalPages,
        updatePagination,
        updatesearchQuery
    };
});