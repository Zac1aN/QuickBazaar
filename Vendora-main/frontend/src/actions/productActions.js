import axios from "axios";

import { ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAILED,PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAILED,CLEAR_ERRORS } from "../constants/productConstants";

export const getProduct = (keyword="",currentPage=1,price=[0,125000],category,ratings=0)=> async (dispatch) => {
    try{
        dispatch({type : ALL_PRODUCT_REQUEST});

        const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`//makes the price bar filter accordingly

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data} = await axios.get(link);
        

        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })
    } catch(error){
        dispatch({
            type : ALL_PRODUCT_FAILED,
            payload : error.response.data.message,
        })
    }
}


export const getProductDetails = (id)=> async (dispatch) => {
    try{
        dispatch({type : PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data.product,
        })
    } catch(error){
        dispatch({
            type : PRODUCT_DETAILS_FAILED,
            payload : error.response.data.message,
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch ({type : CLEAR_ERRORS});
}