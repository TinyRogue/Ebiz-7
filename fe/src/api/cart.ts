import axios from "axios";
import {PUBLIC_URL} from "./const";
import {Basket} from "../model/basket";

export const addProductToCart = async (basketId: number, productId: number): Promise<void> => {
    await axios.put(`${PUBLIC_URL}/basket/${basketId}/${productId}`);
}

export const removeProductFromCart = async (basketId: number, productId: number): Promise<void> => {
    await axios.delete(`${PUBLIC_URL}/basket/${basketId}/${productId}`);
}

export const getCart = async (basketId: number): Promise<Basket> => {
    const {data} = await axios.get(`${PUBLIC_URL}/basket/${basketId}`);
    return data;
}

export const pay = async (basketId: number): Promise<void> => {
    await axios.post(`${PUBLIC_URL}/basket/${basketId}/pay`);
}