import { defineStore } from 'pinia';
import { ref, onMounted, computed, toRaw } from 'vue';
import axiosInstance from '@/axios.js';
import router from '../router';

export const useDataStore = defineStore('data', () => {
    // State
    const isLoading = ref(false);
    const data = ref(null);
    const filteredData = ref(null)
    const error = ref(null);
    let currentPage = ref(1);
    let searchQuery = ref(null);
    let limit = ref(10);
    let totalItems = ref(null);
    let totalPages = ref(null);

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
            limit: limit.value ? limit.value : null,
            page: currentPage.value ? currentPage.value : null,
            search: searchQuery.value ? searchQuery.value : null,
        };
        try {
            const response = await axiosInstance.get('/products', { headers, params });
            if (response.status === 200) {
                data.value = response.data.items;
                totalItems.value = response.data.total_items;
                totalPages.value = response.data.total_pages;
                filteredData.value = data.value;
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
            error.value = err.response.data.detail[0].msg || 'Ошибка при отправке данных';
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
            let newPage = Math.ceil((currentPage.value * limit.value) / count);
            limit.value = count;
            currentPage.value = newPage;
        };
        if (page) currentPage.value = (page);
        getProducts();
    }

    const setFilteredData = (query) => {
        if (query) {
            filteredData.value = data.value.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            filteredData.value = data.value;
        }
    };

    const sortDirections = {
        name: 1,
        price: 1,
        date: 1
    };
    const activeSort = ref(null);

    const setSortedData = (type) => {
        if (activeSort.value === type) {
            sortDirections[type] = sortDirections[type] === 1 ? -1 : 1;
        } else {
            activeSort.value = type;
        }

        switch (type) {
            case "name":
                filteredData.value = [...data.value].sort((a, b) => {
                    return sortDirections[type] * a.name.localeCompare(b.name);
                });
                break;
            case "price":
                filteredData.value = [...data.value].sort((a, b) => {
                    return sortDirections[type] * (a.price - b.price);
                });
                break;
            case "date":
                filteredData.value = [...data.value].sort((a, b) => {
                    return sortDirections[type] * a.created_at.localeCompare(b.created_at);
                });
                break;
            default:
                filteredData.value = [...data.value];
        }
    };

    return {
        data,
        filteredData,
        error,
        isLoading,
        currentPage,
        limit,
        searchQuery,
        totalPages,
        logOut,
        logIn,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        updatePagination,
        // updateSearchQuery,
        setFilteredData,
        setSortedData,
        activeSort,
        sortDirections
    };
});