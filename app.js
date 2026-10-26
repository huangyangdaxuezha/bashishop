(() => {
  "use strict";
  const store = window.BASHI_STORE;
  document.querySelectorAll("[data-store-address]").forEach(node => { node.textContent = store.address; });
  const query = new URLSearchParams({ keyword: store.mapKeyword || store.address, city: store.city, view: "map", src: "bashi-snack-shop" });
  document.getElementById("map-link").href = `https://uri.amap.com/search?${query}`;
  const optional = document.getElementById("store-optional");
  [["营业时间", store.hours], ["联系电话", store.phone], ["门店微信", store.wechat]].forEach(([label, value]) => {
    if (!value) return;
    const row = document.createElement("p");
    const title = document.createElement("span");
    title.textContent = `${label}：`;
    row.append(title, document.createTextNode(value));
    optional.append(row);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
  const feedback = document.getElementById("copy-feedback");
  let feedbackTimer;
  document.getElementById("copy-address").addEventListener("click", async () => {
    clearTimeout(feedbackTimer);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(store.address);
      feedback.textContent = "地址已复制，巴适零食等你来！";
      feedbackTimer = setTimeout(() => { feedback.textContent = ""; }, 6000);
    } catch {
      feedback.textContent = `暂时无法自动复制，请长按或选中地址手动复制：${store.address}`;
    }
  });
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll(".reveal").forEach(element => { element.classList.add("will-reveal"); observer.observe(element); });
  }
})();
