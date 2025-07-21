document.addEventListener("DOMContentLoaded", function () {
  const BUY_BUTTON_SELECTOR = "#shopify-buy-button"; // Your Buy Button element ID
  const VARIANT_ID = "your-variant-id-here"; // Replace this with your actual variant ID

  const button = document.querySelector(BUY_BUTTON_SELECTOR);

  if (!button) {
    console.error("Buy Button not found.");
    return;
  }

  // --- Style the Button ---
  button.style.width = "497px";
  button.style.backgroundColor = "black";
  button.style.color = "white";
  button.style.padding = "12px 24px";
  button.style.border = "none";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.transition = "background-color 0.3s ease";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#8e8e8e"; // Hover color
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "black";
  });

  // --- Handle Click / Add to Cart ---
  button.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: VARIANT_ID,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Change button style to "Added"
        button.textContent = "Added";
        button.style.backgroundColor = "#8e8e8e";

        // Open Shopify Cart Drawer (if available)
        if (window.Shopify?.cart?.open) {
          window.Shopify.cart.open();
        }
      })
      .catch((err) => {
        console.error("Failed to add to cart", err);
      });
  });
});
