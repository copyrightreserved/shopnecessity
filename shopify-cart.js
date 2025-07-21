function initShopifyBuyButton() {
  const button = document.querySelector("#shopify-buy-button");
  const variantId = "51365214552353"; // Replace with your actual variant ID

  if (!button) {
    // Retry in 250ms if button not yet loaded
    return setTimeout(initShopifyBuyButton, 250);
  }

  // Style
  button.style.width = "497px";
  button.style.background = "black";
  button.style.color = "white";
  button.style.transition = "background 0.3s";

  // Hover
  button.onmouseenter = () => button.style.background = "#8e8e8e";
  button.onmouseleave = () => {
    button.style.background = button.classList.contains("added") ? "#8e8e8e" : "black";
  };

  // Click
  button.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    })
    .then(res => res.json())
    .then(() => {
      button.innerText = "Added";
      button.classList.add("added");
      button.style.background = "#8e8e8e";

      if (window.Shopify?.cart?.open) {
        window.Shopify.cart.open();
      } else {
        console.warn("Shopify cart drawer not found.");
      }
    })
    .catch(err => console.error("Add to cart failed", err));
  });
}

document.addEventListener("DOMContentLoaded", initShopifyBuyButton);
