import "./style.css";
import axios from "axios";

const booksContainer = document.getElementById("books-container");

const lsqyConfig = {
    API_KEY: "YOUR-API-KEY",
    URL: "https://api.lemonsqueezy.com/v1",
};

const headers = {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

const getProducts = async () => {
    try {
        const response = await axios.get(`${lsqyConfig.URL}/products`, {
            headers,
        });

        console.log(response);
        renderBooksToDom(response.data.data);
    } catch (error) {
        console.error(error);
    }
};

async function renderBooksToDom(products) {
    products.forEach((prod) => {
        const item = prod.attributes;

        const productCard = `<div class="book-preview">
                              <img src="${item.large_thumb_url}"/>

                              <div class="book-details">
                                  <p class="book-title">${item.name}</p>
                                  <small>${item.description}</small>
                                  <strong class="book-price">${item.price_formatted}</strong>
                                  <a href="${item.buy_now_url}">Buy Now</a>
                              </div>
                            </div>`;

        booksContainer.insertAdjacentHTML("afterbegin", productCard);
    });
}

getProducts();
