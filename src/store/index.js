import { defineStore } from 'pinia';
import { ref, onMounted, computed, toRaw, reactive } from 'vue';
import axiosInstance from '@/axios.js';
import router from '../router';

export const useDataStore = defineStore('data', () => {

    const isLoading = ref(false);
    const data = ref(null);
    const filteredData = ref(null)
    const error = ref(null);
    let currentPage = ref(1);
    let searchQuery = ref(null);
    let limit = ref(10);
    let totalItems = ref(null);
    let totalPages = ref(null);

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
                await router.push('/products');
            } else {
                handleError(response.data);
            }
        } catch (err) {
            handleError(err.message);
        } finally {
            isLoading.value = false;
        }
    };

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    });

    const getParams = () => ({
        'limit': limit.value ? limit.value : null,
        'page': currentPage.value ? currentPage.value : null,
        'search': searchQuery.value ? searchQuery.value : null,
    })

    const getProducts = async () => {
        isLoading.value = true;
        error.value = null;
        const params = getParams();
        const headers = getHeaders();
        try {
            const response = await axiosInstance.get('/products', { headers, params });
            if (response.status === 200) {
                data.value = response.data.items;
                totalItems.value = response.data.total_items;
                totalPages.value = response.data.total_pages;
                filteredData.value = data.value;
            } else {
                handleError(response.data);
            }
        } catch (err) {
            handleError(err.message);
        } finally {
            isLoading.value = false;
        }
    };

    const createProduct = async (payload) => {
        isLoading.value = true;
        error.value = null;
        const headers = getHeaders();
        try {
            const response = await axiosInstance.post('/products', payload, { headers });
            if (response.status === 200) {
                getProducts();
            } else {
                handleError(response.data);
            }
        } catch (err) {
            handleError(err.response.data.detail[0].msg);
        } finally {
            isLoading.value = false;
        }
    };

    const updateProduct = async (payload, id) => {
        isLoading.value = true;
        error.value = null;
        const headers = getHeaders();
        try {
            const response = await axiosInstance.put(`/products/${id}`, payload, { headers });
            if (response.status === 200) {
                getProducts();
            } else {
                handleError(response.data);
            }
        } catch (err) {
            handleError(err.response.data.detail[0].msg);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteProduct = async (id) => {
        isLoading.value = true;
        error.value = null;
        const headers = getHeaders();
        try {
            const response = await axiosInstance.delete(`/products/${id}`, { headers });
            if (response.status === 200) {
                getProducts();
            } else {
                handleError(response.data);
            }
        } catch (err) {
            handleError(err.response.data.detail[0].msg);
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

    const sortDirections = reactive({
        name: 1,
        price: 1,
        date: 1
    });
    const activeSort = ref(null);

    const setSortedData = (type) => {
        if (activeSort.value === type) {
            sortDirections[type] = -sortDirections[type];
        } else {
            activeSort.value = type;
            sortDirections[type] = 1;
        }

        filteredData.value = [...data.value].sort((a, b) => {
            switch (type) {
                case "name":
                    return sortDirections[type] * a.name.localeCompare(b.name);
                case "price":
                    return sortDirections[type] * (a.price - b.price);
                case "date":
                    return sortDirections[type] * a.created_at.localeCompare(b.created_at);
                default:
                    return 0;
            }
        });
    };

    let timeoutId = null;

    const handleError = (errorMessage) => {
        error.value = errorMessage || 'Unknown error occurred';

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            error.value = null;
        }, 3000);
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
        totalItems,
        activeSort,
        sortDirections,
        logOut,
        logIn,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        updatePagination,
        setFilteredData,
        setSortedData,
        handleError,
    };
});